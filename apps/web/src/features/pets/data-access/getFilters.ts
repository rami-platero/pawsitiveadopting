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
  breed?: string[];
  size?: string[];
  color?: string[];
  sex?: Sex[];
  age?: AgeGroup[];
};

export type FacetOption = {
  value: string;
  count: number;
};

export function buildConditions(
  params: FilterParams,
  excludeKey?: keyof FilterParams
) {
  const conditions = [];

  conditions.push(eq(adoptionPost.status, "available"));
  pushInArrayCondition(params.breed,excludeKey,"breed",animalDetails.breed,conditions);
  pushInArrayCondition(params.type,excludeKey,"type",adoptionPost.animalType,conditions);
  pushInArrayCondition(params.age,excludeKey,"age",animalDetails.ageGroup,conditions);
  pushInArrayCondition(params.sex,excludeKey,"sex",animalDetails.sex,conditions);

  return and(...conditions);
}

export async function getAvailableFilters(params: FilterParams) {
  const [breeds, colors, temperaments, ageGroups] = await Promise.all([
    // BREEDS (with Counts)
    db
      .select({
        value: animalDetails.breed,
        count: count()
      })
      .from(animalDetails)
      .innerJoin(
        adoptionPost,
        eq(animalDetails.adoptionPostId, adoptionPost.id)
      )
      .where(
        and(
          buildConditions(params, "breed"),
          not(eq(animalDetails.breed, ""))
        )
      )
      .groupBy(animalDetails.breed) 
      .orderBy(desc(count()))
      .then(
        (rows) =>
          rows.filter((r) => r.value !== null) as FacetOption[]
      ),

    // COLORS (with Counts)
    db
      .select({
        value: animalDetails.coatColorPrimary,
        count: count(),
      })
      .from(animalDetails)
      .innerJoin(
        adoptionPost,
        eq(animalDetails.adoptionPostId, adoptionPost.id)
      )
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
        eq(animalDetails.adoptionPostId, adoptionPost.id)
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
        eq(animalDetails.adoptionPostId, adoptionPost.id)
      )
      .where(buildConditions(params, "age"))
      .groupBy(animalDetails.ageGroup)
      .orderBy(asc(animalDetails.ageGroup))
      .then((rows) => rows.filter((r) => r.value !== null) as FacetOption[]),
  ]);

  return {
    breeds,
    colors,
    temperaments,
    ageGroups, 
  };
}
