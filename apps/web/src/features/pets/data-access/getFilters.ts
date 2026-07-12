import { and, eq, sql, asc, count, desc, not } from "drizzle-orm"; // Added count, desc, not
import {
  adoptionPost,
  AgeGroup,
  animalDetails,
  Sex,
  temperament,
} from "@/db/schema/posts-schema";
import { db } from "@/db/db";
import { pushInArrayCondition } from "@/features/pets/utils/filters.helper";

export type FilterParams = {
  type?: string[];
  size?: string[];
  color?: string[];
  sex?: string;
  age?: AgeGroup[];
  goodWithKids?: boolean;
  goodWithDogs?: boolean;
  goodWithCats?: boolean;
  goodInApartment?: boolean;
  goodInHouse?: boolean;
  goodInGarden?: boolean;
  associationId?: string;
};

export type FacetOption = {
  value: string;
  count: number;
};

export function buildConditions(
  params: FilterParams,
  excludeKey?: keyof FilterParams,
) {
  const conditions = [];

  conditions.push(eq(adoptionPost.status, "available"));

  if (params.associationId) {
    conditions.push(eq(adoptionPost.associationId, params.associationId));
  }

  pushInArrayCondition(
    params.type,
    excludeKey,
    "type",
    adoptionPost.animalType,
    conditions,
  );
  pushInArrayCondition(
    params.age,
    excludeKey,
    "age",
    animalDetails.ageGroup,
    conditions,
  );
  pushInArrayCondition(
    params.color,
    excludeKey,
    "color",
    animalDetails.coatColorPrimary,
    conditions,
  );

  if (params.sex && excludeKey !== "sex") {
    conditions.push(eq(animalDetails.sex, params.sex as Sex));
  }

  if (params.goodWithKids) {
    conditions.push(eq(temperament.goodWithKids, true));
  }

  if (params.goodWithDogs) {
    conditions.push(eq(temperament.goodWithDogs, true));
  }

  if (params.goodWithCats) {
    conditions.push(eq(temperament.goodWithCats, true));
  }

  if (params.goodInApartment) {
    conditions.push(eq(temperament.goodInApartment, true));
  }

  if (params.goodInHouse) {
    conditions.push(eq(temperament.goodInHouse, true));
  }

  if (params.goodInGarden) {
    conditions.push(eq(temperament.goodInGarden, true));
  }

  return and(...conditions);
}

export async function getAvailableFilters(params: FilterParams) {
  const [sexOptions, colors, temperaments, ageGroups] = await Promise.all([
    // SEX (with Counts)
    db
      .select({
        value: animalDetails.sex,
        count: count(),
      })
      .from(animalDetails)
      .innerJoin(
        adoptionPost,
        eq(animalDetails.adoptionPostId, adoptionPost.id),
      )
      .leftJoin(temperament, eq(temperament.adoptionPostId, adoptionPost.id))
      .where(buildConditions(params, "sex"))
      .groupBy(animalDetails.sex)
      .orderBy(asc(animalDetails.sex))
      .then((rows) => rows.filter((r) => r.value !== null) as FacetOption[]),

    // COLORS (with Counts)
    db
      .select({
        value: animalDetails.coatColorPrimary,
        count: count(),
      })
      .from(animalDetails)
      .innerJoin(
        adoptionPost,
        eq(animalDetails.adoptionPostId, adoptionPost.id),
      )
      .leftJoin(temperament, eq(temperament.adoptionPostId, adoptionPost.id))
      .where(buildConditions(params, "color"))
      .groupBy(animalDetails.coatColorPrimary)
      .orderBy(asc(animalDetails.coatColorPrimary)) // Sort alphabetically
      .then((rows) => rows.filter((r) => r.value !== null) as FacetOption[]),

    // TEMPERAMENT TAGS (with Counts)
    db
      .select({
        value: sql<string>`unnest(${temperament.temperamentTags})`,
        count: count(),
      })
      .from(temperament)
      .innerJoin(adoptionPost, eq(temperament.adoptionPostId, adoptionPost.id))
      .innerJoin(
        animalDetails,
        eq(animalDetails.adoptionPostId, adoptionPost.id),
      )
      .where(buildConditions(params))
      .groupBy(sql`unnest(${temperament.temperamentTags})`)
      .orderBy(desc(count()))
      .then((rows) => rows as FacetOption[]),

    // AGE GROUPS (with Counts)
    db
      .select({
        value: animalDetails.ageGroup,
        count: count(),
      })
      .from(animalDetails)
      .innerJoin(
        adoptionPost,
        eq(animalDetails.adoptionPostId, adoptionPost.id),
      )
      .leftJoin(temperament, eq(temperament.adoptionPostId, adoptionPost.id))
      .where(buildConditions(params, "age"))
      .groupBy(animalDetails.ageGroup)
      .orderBy(asc(animalDetails.ageGroup))
      .then((rows) => rows.filter((r) => r.value !== null) as FacetOption[]),
  ]);

  return {
    sexOptions,
    colors,
    temperaments,
    ageGroups,
  };
}
