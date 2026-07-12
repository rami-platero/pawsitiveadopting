import z from "zod";

export const associationsSearchParamsSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  country: z.string().optional(),
});

export type ParsedAssociationsSearchParams = z.infer<
  typeof associationsSearchParamsSchema
>;
