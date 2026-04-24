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

  // Location filters
  location: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radius: z.coerce.number().min(1).max(500).optional().default(50),

  type: stringToEnumArray(animalTypeEnum.enumValues),

  size: stringToEnumArray(sizeEnum.enumValues),

  sex: z.enum(sexEnum.enumValues).optional(),

  age: stringToEnumArray(ageGroupEnum.enumValues),

  color: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : []))
    .pipe(z.array(z.string())),

  energy: stringToEnumArray(energyLevelEnum.enumValues),

  coat: stringToEnumArray(coatLengthEnum.enumValues),

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
