import { db } from "@/db/db";
import {
  type AdoptionPost,
  adoptionPost,
  animalDetails,
  Media,
} from "@/db/schema/posts-schema";
import { buildConditions } from "@/features/pets/data-access/getFilters";
import { ParsedSearchParams } from "@/features/pets/schema/searchParams.schema";
import { asc, count, desc, eq, inArray } from "drizzle-orm";

export type AdoptionPostWithMedia = AdoptionPost & { media: Media[] };

const LIMIT = 10;

export async function getFilteredPosts(filters: ParsedSearchParams) {
  const conditions = buildConditions(filters);

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

  const [matches, totalCountResult] = await Promise.all([
    db
      .select({ id: adoptionPost.id })
      .from(adoptionPost)
      .innerJoin(
        animalDetails,
        eq(adoptionPost.id, animalDetails.adoptionPostId)
      )
      .where(conditions)
      .orderBy(orderByCondition)
      .limit(LIMIT)
      .offset((filters.page - 1) * LIMIT),

    db
      .select({ value: count() })
      .from(adoptionPost)
      .innerJoin(
        animalDetails,
        eq(adoptionPost.id, animalDetails.adoptionPostId)
      )
      .where(conditions),
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
      adoptionRequirements: true,
    },
    orderBy: orderByCondition
  });

  return {
    data,
    count: totalCountResult[0]?.value || 0,
  };
}
