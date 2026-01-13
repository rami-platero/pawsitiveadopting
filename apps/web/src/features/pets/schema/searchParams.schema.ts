import z from "zod";
import {
  animalTypeEnum,
  sizeEnum,
  sexEnum,
  ageGroupEnum,
  energyLevelEnum,
  coatLengthEnum,
} from "@/db/schema/posts-schema";

function stringToEnumArray<T extends [string, ...string[]]>(values: T) {
  return z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : []))
    .pipe(z.array(z.enum(values)));
}

export const searchParamsSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  sortBy: z.enum(["newest", "oldest"]).optional().default("newest"),

  search: z.string().optional(),

  type: stringToEnumArray(animalTypeEnum.enumValues),

  size: stringToEnumArray(sizeEnum.enumValues),

  sex: stringToEnumArray(sexEnum.enumValues),

  age: stringToEnumArray(ageGroupEnum.enumValues),

  energy: stringToEnumArray(energyLevelEnum.enumValues),

  coat: stringToEnumArray(coatLengthEnum.enumValues),

  breed: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : []))
    .pipe(z.array(z.string())),

  goodWithKids: z
    .string()
    .optional()
    .transform((val) => val === "true"),

  goodWithDogs: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});

export type ParsedSearchParams = z.infer<typeof searchParamsSchema>;
