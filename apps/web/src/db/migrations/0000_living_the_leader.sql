CREATE TYPE "public"."memberRole" AS ENUM('owner', 'member', 'admin', 'pet_manager');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'regular');--> statement-breakpoint
CREATE TYPE "public"."age_group" AS ENUM('puppy/kitten', 'young', 'adult', 'senior');--> statement-breakpoint
CREATE TYPE "public"."animal_type" AS ENUM('cat', 'dog');--> statement-breakpoint
CREATE TYPE "public"."barking_level" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."coat_length" AS ENUM('hairless', 'short', 'medium', 'long');--> statement-breakpoint
CREATE TYPE "public"."energy_level" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('photo', 'video');--> statement-breakpoint
CREATE TYPE "public"."sex" AS ENUM('male', 'female', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."size" AS ENUM('small', 'medium', 'large', 'giant');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('available', 'pending', 'adopted', 'removed');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('ADOPTION');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "association" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"logo" text,
	"created_at" timestamp NOT NULL,
	"metadata" text,
	CONSTRAINT "association_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"association_id" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"inviter_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member" (
	"id" text PRIMARY KEY NOT NULL,
	"association_id" text NOT NULL,
	"user_id" text NOT NULL,
	"roles" "memberRole" DEFAULT 'member' NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	"active_association_id" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"verification_email_sent_at" timestamp,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"roles" "role" DEFAULT 'regular' NOT NULL,
	"banned" boolean,
	"ban_reason" text,
	"ban_expires" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "adoption_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"animal_type" "animal_type" NOT NULL,
	"name" text,
	"status" "status" DEFAULT 'available',
	"association_id" text,
	"user_id" text,
	"source_platform" text,
	"external_post_link" text,
	"description" text,
	"extra_metadata" jsonb,
	"date_posted" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "adoption_requirements" (
	"id" serial PRIMARY KEY NOT NULL,
	"adoption_post_id" integer,
	"adoption_fee" numeric,
	"currency" text,
	"fee_includes" text,
	"home_check_required" boolean,
	"fenced_yard_required" boolean,
	"indoor_only" boolean,
	"experience_required" boolean,
	"documents_required" text,
	"adoption_contract" boolean
);
--> statement-breakpoint
CREATE TABLE "animal_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"adoption_post_id" integer,
	"breed" text,
	"mixed_breed" boolean,
	"sex" "sex",
	"birth_date" timestamp,
	"estimated_age_yrs" integer,
	"age_group" "age_group",
	"size" "size",
	"coat_length" "coat_length",
	"coat_color_primary" text,
	"coat_color_secondary" text
);
--> statement-breakpoint
CREATE TABLE "health_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"adoption_post_id" integer,
	"spayed_neutered" boolean,
	"vaccinated" boolean,
	"identification" boolean,
	"health_issues" text,
	"special_needs" boolean,
	"special_needs_desc" text,
	"disability" text
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"adoption_post_id" integer,
	"media_type" "media_type",
	"url" text,
	"is_main" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "temperament" (
	"id" serial PRIMARY KEY NOT NULL,
	"adoption_post_id" integer,
	"temperament_tags" text[],
	"good_with_kids" boolean,
	"good_with_dogs" boolean,
	"good_with_cats" boolean,
	"good_with_other_animals" boolean,
	"energy_level" "energy_level",
	"playfulness" text,
	"training_level" text,
	"reaction_to_strangers" text,
	"fears" text[]
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"association_id" text,
	"rating" integer NOT NULL,
	"description" text,
	"date_posted" timestamp DEFAULT now(),
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" text NOT NULL,
	"adoption_post_id" integer,
	"type" "notification_type" NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_association_id_association_id_fk" FOREIGN KEY ("association_id") REFERENCES "public"."association"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviter_id_user_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_association_id_association_id_fk" FOREIGN KEY ("association_id") REFERENCES "public"."association"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adoption_post" ADD CONSTRAINT "adoption_post_association_id_association_id_fk" FOREIGN KEY ("association_id") REFERENCES "public"."association"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adoption_post" ADD CONSTRAINT "adoption_post_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_adoption_post_id_adoption_post_id_fk" FOREIGN KEY ("adoption_post_id") REFERENCES "public"."adoption_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "animal_details" ADD CONSTRAINT "animal_details_adoption_post_id_adoption_post_id_fk" FOREIGN KEY ("adoption_post_id") REFERENCES "public"."adoption_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_info" ADD CONSTRAINT "health_info_adoption_post_id_adoption_post_id_fk" FOREIGN KEY ("adoption_post_id") REFERENCES "public"."adoption_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_adoption_post_id_adoption_post_id_fk" FOREIGN KEY ("adoption_post_id") REFERENCES "public"."adoption_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "temperament" ADD CONSTRAINT "temperament_adoption_post_id_adoption_post_id_fk" FOREIGN KEY ("adoption_post_id") REFERENCES "public"."adoption_post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_association_id_association_id_fk" FOREIGN KEY ("association_id") REFERENCES "public"."association"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_adoption_post_id_adoption_post_id_fk" FOREIGN KEY ("adoption_post_id") REFERENCES "public"."adoption_post"("id") ON DELETE no action ON UPDATE no action;