import { db } from "@/db/db";
import { association } from "@/db/schema/auth-schema";
import { adoptionPost } from "@/db/schema/posts-schema";
import { and, asc, eq } from "drizzle-orm";

export const LIMIT = 12;

export type AssociationFilterParams = {
  country?: string;
  page: number;
};

function buildAssociationConditions(
  params: Pick<AssociationFilterParams, "country">,
  excludeCountry?: boolean,
) {
  const conditions = [eq(adoptionPost.status, "available")];

  if (params.country && !excludeCountry) {
    conditions.push(eq(association.country, params.country));
  }

  return and(...conditions);
}

export async function getFilteredAssociations(
  filters: AssociationFilterParams,
) {
  const conditions = buildAssociationConditions(filters);

  const [ids, distinctIds] = await Promise.all([
    db
      .selectDistinct({ id: association.id, name: association.name })
      .from(association)
      .innerJoin(adoptionPost, eq(adoptionPost.associationId, association.id))
      .where(conditions)
      .orderBy(asc(association.name))
      .limit(LIMIT)
      .offset((filters.page - 1) * LIMIT),

    db
      .selectDistinct({ id: association.id })
      .from(association)
      .innerJoin(adoptionPost, eq(adoptionPost.associationId, association.id))
      .where(conditions),
  ]);

  const associationIds = ids.map((row) => row.id);

  if (associationIds.length === 0) {
    return { data: [], count: 0 };
  }

  const data = await db.query.association.findMany({
    where: (assoc, { inArray }) => inArray(assoc.id, associationIds),
    orderBy: (assoc, { asc }) => asc(assoc.name),
  });

  return {
    data,
    count: distinctIds.length,
  };
}

export type AssociationFacetOption = {
  value: string;
  count: number;
};

export async function getAvailableAssociationCountries() {
  const rows = await db
    .selectDistinct({
      country: association.country,
      associationId: association.id,
    })
    .from(association)
    .innerJoin(adoptionPost, eq(adoptionPost.associationId, association.id))
    .where(buildAssociationConditions({}, true));

  const counts = new Map<string, number>();
  for (const row of rows) {
    if (!row.country) continue;
    counts.set(row.country, (counts.get(row.country) ?? 0) + 1);
  }

  const countries: AssociationFacetOption[] = Array.from(
    counts.entries(),
  ).map(([value, count]) => ({ value, count }));

  countries.sort((a, b) => a.value.localeCompare(b.value));

  return countries;
}

export async function getAssociationBySlug(slug: string) {
  const result = await db.query.association.findFirst({
    where: (assoc, { eq }) => eq(assoc.slug, slug),
  });

  return result ?? null;
}
