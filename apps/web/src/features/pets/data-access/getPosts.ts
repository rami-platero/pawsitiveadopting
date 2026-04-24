import { db } from "@/db/db";
import {
  type AdoptionPost,
  adoptionPost,
  AnimalDetails,
  animalDetails,
  Media,
  Temperament,
} from "@/db/schema/posts-schema";
import { buildConditions } from "@/features/pets/data-access/getFilters";
import { ParsedSearchParams } from "@/features/pets/schema/searchParams.schema";
import { asc, count, desc, eq, inArray, sql } from "drizzle-orm";

export type AdoptionPostExtended = AdoptionPost & {
  media: Media[];
  animalDetails: AnimalDetails;
  temperament: Temperament | null;
};

export const LIMIT = 10;

/**
 * Build a SQL condition for filtering posts within a radius (km) of a point.
 * Uses the Haversine formula approximation in PostgreSQL.
 */
function buildLocationCondition(lat: number, lng: number, radiusKm: number) {
  return sql`(
    6371 * acos(
      cos(radians(${lat}))
      * cos(radians(${adoptionPost.latitude}))
      * cos(radians(${adoptionPost.longitude}) - radians(${lng}))
      + sin(radians(${lat}))
      * sin(radians(${adoptionPost.latitude}))
    )
  ) <= ${radiusKm}`;
}

export async function getFilteredPosts(filters: ParsedSearchParams) {
  const conditions = buildConditions(filters);

  // Build location filter if coordinates are provided
  const locationCondition =
    filters.lat !== undefined && filters.lng !== undefined
      ? buildLocationCondition(filters.lat, filters.lng, filters.radius)
      : undefined;

  let orderByCondition = desc(adoptionPost.datePosted);

  switch (filters.sortBy) {
    case "oldest":
      orderByCondition = asc(adoptionPost.datePosted);
      break;
    case "newest":
    default:
      orderByCondition = desc(adoptionPost.datePosted);
      break;
  }

  // Combine all conditions (filters + location)
  const allConditions = locationCondition
    ? sql`${conditions} AND ${locationCondition}`
    : conditions;

  const [matches, totalCountResult] = await Promise.all([
    db
      .select({ id: adoptionPost.id })
      .from(adoptionPost)
      .innerJoin(
        animalDetails,
        eq(adoptionPost.id, animalDetails.adoptionPostId),
      )
      .where(allConditions)
      .orderBy(orderByCondition)
      .limit(LIMIT)
      .offset((filters.page - 1) * LIMIT),

    db
      .select({ value: count() })
      .from(adoptionPost)
      .innerJoin(
        animalDetails,
        eq(adoptionPost.id, animalDetails.adoptionPostId),
      )
      .where(allConditions),
  ]);

  const ids = matches.map((row) => row.id);

  // HANDLE EMPTY RESULTS
  if (ids.length === 0) {
    return { data: [], count: 0 };
  }

  const data = await db.query.adoptionPost.findMany({
    where: inArray(adoptionPost.id, ids),
    with: {
      animalDetails: true,
      media: true,
      temperament: true,
    },
    orderBy: orderByCondition,
  });

  return {
    data,
    count: totalCountResult[0]?.value || 0,
  };
}
