import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  jsonb,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import { association, user } from "./auth-schema";

export const animalTypeEnum = pgEnum("animal_type", ["cat", "dog"]);
export const statusEnum = pgEnum("status", [
  "available",
  "pending",
  "adopted",
  "removed",
]);
export const sexEnum = pgEnum("sex", ["male", "female", "unknown"]);
export const ageGroupEnum = pgEnum("age_group", [
  "puppy/kitten",
  "young",
  "adult",
  "senior",
]);
export const sizeEnum = pgEnum("size", ["small", "medium", "large", "giant"]);
export const coatLengthEnum = pgEnum("coat_length", [
  "hairless",
  "short",
  "medium",
  "long",
]);
export const energyLevelEnum = pgEnum("energy_level", [
  "low",
  "medium",
  "high",
]);
export const barkingLevelEnum = pgEnum("barking_level", [
  "low",
  "medium",
  "high",
]);
export const mediaTypeEnum = pgEnum("media_type", ["photo", "video"]);

// ADOPTION POSTS 
export const adoptionPost = pgTable("adoption_post", {
  id: serial("id").primaryKey(),
  animalType: animalTypeEnum("animal_type").notNull(),
  name: text("name"),
  status: statusEnum("status").default("available"),
  associationId: text("association_id").references(() => association.id),
  userId: text("user_id").references(() => user.id),
  sourcePlatform: text("source_platform"),
  externalPostLink: text("external_post_link"),
  description: text("description"),
  extraMetadata: jsonb("extra_metadata"),
  datePosted: timestamp("date_posted").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// ANIMAL DETAILS 
export const animalDetails = pgTable("animal_details", {
  id: serial("id").primaryKey(),
  adoptionPostId: integer("adoption_post_id").references(
    () => adoptionPost.id,
    { onDelete: "cascade" }
  ),
  breed: text("breed"),
  mixedBreed: boolean("mixed_breed"),
  sex: sexEnum("sex"),
  birthDate: timestamp("birth_date"),
  estimatedAgeYrs: integer("estimated_age_yrs"),
  ageGroup: ageGroupEnum("age_group"),
  size: sizeEnum("size"),
  coatLength: coatLengthEnum("coat_length"),
  coatColorPrimary: text("coat_color_primary"),
  coatColorSecondary: text("coat_color_secondary"),
});

// HEALTH INFO 
export const healthInfo = pgTable("health_info", {
  id: serial("id").primaryKey(),
  adoptionPostId: integer("adoption_post_id").references(
    () => adoptionPost.id,
    { onDelete: "cascade" }
  ),
  spayedNeutered: boolean("spayed_neutered"),
  vaccinated: boolean("vaccinated"),
  identification: boolean("identification"),
  healthIssues: text("health_issues"),
  specialNeeds: boolean("special_needs"),
  specialNeedsDesc: text("special_needs_desc"),
  disability: text("disability"),
});

// TEMPERAMENT 
export const temperament = pgTable("temperament", {
  id: serial("id").primaryKey(),
  adoptionPostId: integer("adoption_post_id").references(
    () => adoptionPost.id,
    { onDelete: "cascade" }
  ),
  temperamentTags: text("temperament_tags").array(),
  goodWithKids: boolean("good_with_kids"),
  goodWithDogs: boolean("good_with_dogs"),
  goodWithCats: boolean("good_with_cats"),
  goodWithOtherAnimals: boolean("good_with_other_animals"),
  energyLevel: energyLevelEnum("energy_level"),
  playfulness: text("playfulness"),
  trainingLevel: text("training_level"),
  reactionToStrangers: text("reaction_to_strangers"),
  fears: text("fears").array(),
});

// ADOPTION REQUIREMENTS 
export const adoptionRequirements = pgTable("adoption_requirements", {
  id: serial("id").primaryKey(),
  adoptionPostId: integer("adoption_post_id").references(
    () => adoptionPost.id,
    { onDelete: "cascade" }
  ),
  adoptionFee: decimal("adoption_fee"),
  currency: text("currency"),
  feeIncludes: text("fee_includes"),
  homeCheckRequired: boolean("home_check_required"),
  fencedYardRequired: boolean("fenced_yard_required"),
  indoorOnly: boolean("indoor_only"),
  experienceRequired: boolean("experience_required"),
  documentsRequired: text("documents_required"),
  adoptionContract: boolean("adoption_contract"),
});

// MEDIA
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  adoptionPostId: integer("adoption_post_id").references(
    () => adoptionPost.id,
    { onDelete: "cascade" }
  ),
  type: mediaTypeEnum("media_type"),
  url: text("url"),
  isMain: boolean("is_main").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
