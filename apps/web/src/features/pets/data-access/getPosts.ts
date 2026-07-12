import { db } from "@/db/db";
import {
  type AdoptionPost,
  adoptionPost,
  AnimalDetails,
  animalDetails,
  Media,
  Temperament,
  temperament,
} from "@/db/schema/posts-schema";
import { buildConditions } from "@/features/pets/data-access/getFilters";
import { ParsedSearchParams } from "@/features/pets/schema/searchParams.schema";
import { and, asc, count, desc, eq, gt, inArray, lt, or, sql } from "drizzle-orm";

export type AdoptionPostExtended = AdoptionPost & {
  media: Media[];
  animalDetails: AnimalDetails;
  temperament: Temperament | null;
};

export type PostsCursor = {
  datePosted: Date;
  id: number;
};

export const LIMIT = 12;

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

/**
 * Keyset ("seek") condition for pagination on the compound (datePosted, id)
 * sort key. id is used as a tiebreaker since datePosted is not unique.
 */
function buildSeekCondition(
  sortBy: ParsedSearchParams["sortBy"],
  cursor?: PostsCursor,
) {
  if (!cursor) return undefined;

  if (sortBy === "oldest") {
    return or(
      gt(adoptionPost.datePosted, cursor.datePosted),
      and(
        eq(adoptionPost.datePosted, cursor.datePosted),
        gt(adoptionPost.id, cursor.id),
      ),
    );
  }

  return or(
    lt(adoptionPost.datePosted, cursor.datePosted),
    and(
      eq(adoptionPost.datePosted, cursor.datePosted),
      lt(adoptionPost.id, cursor.id),
    ),
  );
}

export async function getFilteredPosts(
  filters: ParsedSearchParams,
  associationId?: string,
  cursor?: PostsCursor,
) {
  const conditions = buildConditions({ ...filters, associationId });

  // Build location filter if coordinates are provided
  const radiusCondition =
    filters.lat !== undefined && filters.lng !== undefined
      ? buildLocationCondition(filters.lat, filters.lng, filters.radius)
      : undefined;

  const countryCondition =
    filters.sameCountryOnly && filters.country
      ? eq(adoptionPost.country, filters.country)
      : undefined;

  const locationCondition =
    radiusCondition && countryCondition
      ? and(radiusCondition, countryCondition)
      : radiusCondition ?? countryCondition;

  const isOldest = filters.sortBy === "oldest";
  const orderByCondition = isOldest
    ? [asc(adoptionPost.datePosted), asc(adoptionPost.id)]
    : [desc(adoptionPost.datePosted), desc(adoptionPost.id)];

  const seekCondition = buildSeekCondition(filters.sortBy, cursor);

  // Combine all conditions (filters + location); count ignores the seek
  // condition since it's a running total for the whole filtered set.
  const countCondition = and(conditions, locationCondition);
  const baseConditions = and(countCondition, seekCondition);

  const [matches, totalCountResult] = await Promise.all([
    db
      .select({ id: adoptionPost.id, datePosted: adoptionPost.datePosted })
      .from(adoptionPost)
      .innerJoin(
        animalDetails,
        eq(adoptionPost.id, animalDetails.adoptionPostId),
      )
      .leftJoin(temperament, eq(adoptionPost.id, temperament.adoptionPostId))
      .where(baseConditions)
      .orderBy(...orderByCondition)
      // fetch one extra row to detect "has next page" without a second query
      .limit(LIMIT + 1),

    db
      .select({ value: count() })
      .from(adoptionPost)
      .innerJoin(
        animalDetails,
        eq(adoptionPost.id, animalDetails.adoptionPostId),
      )
      .leftJoin(temperament, eq(adoptionPost.id, temperament.adoptionPostId))
      .where(countCondition),
  ]);

  const hasNextPage = matches.length > LIMIT;
  const pageMatches = hasNextPage ? matches.slice(0, LIMIT) : matches;
  const ids = pageMatches.map((row) => row.id);

  // HANDLE EMPTY RESULTS
  if (ids.length === 0) {
    return { data: [], count: totalCountResult[0]?.value || 0, nextCursor: null };
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

  const last = pageMatches[pageMatches.length - 1]!;
  const nextCursor: PostsCursor | null = hasNextPage
    ? { datePosted: last.datePosted!, id: last.id }
    : null;

  return {
    data,
    count: totalCountResult[0]?.value || 0,
    nextCursor,
  };
}
