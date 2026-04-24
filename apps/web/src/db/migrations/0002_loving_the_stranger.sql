ALTER TABLE "animal_details" ALTER COLUMN "sex" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."sex";--> statement-breakpoint
CREATE TYPE "public"."sex" AS ENUM('male', 'female');--> statement-breakpoint
ALTER TABLE "animal_details" ALTER COLUMN "sex" SET DATA TYPE "public"."sex" USING "sex"::"public"."sex";--> statement-breakpoint
ALTER TABLE "adoption_post" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "adoption_post" ADD COLUMN "state" text;--> statement-breakpoint
ALTER TABLE "adoption_post" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "adoption_post" ADD COLUMN "latitude" real;--> statement-breakpoint
ALTER TABLE "adoption_post" ADD COLUMN "longitude" real;