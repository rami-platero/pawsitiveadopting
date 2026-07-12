import { hashPassword } from "better-auth/crypto";
import { db, client } from "./client";
import {
  user,
  account,
  association,
  member,
} from "../../src/db/schema/auth-schema";
import {
  adoptionPost,
  animalDetails,
  healthInfo,
  temperament,
  adoptionRequirements,
  media,
} from "../../src/db/schema/posts-schema";
import { seedUsers, seedAssociations, seedPosts, SEED_PASSWORD } from "./data";
import { inArray } from "drizzle-orm";

async function seedUsersAndAccounts() {
  console.log("Seeding users...");
  const passwordHash = await hashPassword(SEED_PASSWORD);
  const now = new Date();

  for (const seedUser of seedUsers) {
    await db
      .insert(user)
      .values({
        id: seedUser.id,
        name: seedUser.name,
        email: seedUser.email,
        emailVerified: true,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: user.id });

    await db
      .insert(account)
      .values({
        id: `${seedUser.id}_account`,
        accountId: seedUser.id,
        providerId: "credential",
        userId: seedUser.id,
        password: passwordHash,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: account.id });
  }

  console.log(
    `Seeded ${seedUsers.length} users (password set via SEED_USER_PASSWORD env var)`,
  );
}

async function seedAssociationsAndOwners() {
  console.log("Seeding associations...");
  const now = new Date();

  for (const seedAssociation of seedAssociations) {
    await db
      .insert(association)
      .values({
        id: seedAssociation.id,
        name: seedAssociation.name,
        slug: seedAssociation.slug,
        createdAt: now,
        logo: seedAssociation.logo,
        description: seedAssociation.description,
        city: seedAssociation.city,
        state: seedAssociation.state,
        country: seedAssociation.country,
      })
      .onConflictDoUpdate({
        target: association.id,
        set: {
          logo: seedAssociation.logo,
          description: seedAssociation.description,
          city: seedAssociation.city,
          state: seedAssociation.state,
          country: seedAssociation.country,
        },
      });

    await db
      .insert(member)
      .values({
        id: `${seedAssociation.id}_owner_member`,
        associationId: seedAssociation.id,
        userId: seedAssociation.ownerId,
        role: "owner",
        createdAt: now,
      })
      .onConflictDoNothing({ target: member.id });
  }

  console.log(`Seeded ${seedAssociations.length} associations`);
}

async function seedAdoptionPosts() {
  console.log("Seeding adoption posts...");

  const seedAssociationIds = seedAssociations.map((a) => a.id);
  const [existingPost] = await db
    .select({ id: adoptionPost.id })
    .from(adoptionPost)
    .where(inArray(adoptionPost.associationId, seedAssociationIds))
    .limit(1);

  if (existingPost) {
    console.log(
      "Adoption posts already seeded for these associations, skipping (run db:seed:reset first to re-seed).",
    );
    return;
  }

  for (const post of seedPosts) {
    const seedAssociation = seedAssociations.find(
      (a) => a.id === post.associationId,
    );
    if (!seedAssociation) {
      throw new Error(`Unknown association id: ${post.associationId}`);
    }

    const [insertedPost] = await db
      .insert(adoptionPost)
      .values({
        animalType: post.animalType,
        name: post.name,
        status: "available",
        associationId: post.associationId,
        userId: seedAssociation.ownerId,
        description: post.description,
        city: post.city,
        state: post.state,
        country: post.country,
        latitude: post.latitude,
        longitude: post.longitude,
      })
      .returning({ id: adoptionPost.id });

    if (!insertedPost) {
      throw new Error(`Failed to insert post: ${post.name}`);
    }

    const postId = insertedPost.id;

    await db.insert(animalDetails).values({
      adoptionPostId: postId,
      breed: post.breed,
      mixedBreed: post.breed.toLowerCase().includes("mix"),
      sex: post.sex,
      ageGroup: post.ageGroup,
      size: post.size,
      coatLength: post.coatLength,
      coatColorPrimary: post.coatColorPrimary,
    });

    await db.insert(healthInfo).values({
      adoptionPostId: postId,
      spayedNeutered: true,
      vaccinated: true,
      identification: true,
      specialNeeds: false,
    });

    await db.insert(temperament).values({
      adoptionPostId: postId,
      temperamentTags: post.temperamentTags,
      goodWithKids: post.goodWithKids,
      goodWithDogs: post.goodWithDogs,
      goodWithCats: post.goodWithCats,
      goodInApartment: post.goodInApartment,
      goodInHouse: post.goodInHouse,
      goodInGarden: post.goodInGarden,
      energyLevel: post.energyLevel,
    });

    await db.insert(adoptionRequirements).values({
      adoptionPostId: postId,
      adoptionFee: post.adoptionFee,
      currency: post.country === "US" ? "USD" : post.country === "AR" ? "ARS" : "CLP",
      indoorOnly: post.animalType === "cat",
    });

    await db.insert(media).values({
      adoptionPostId: postId,
      type: "photo",
      url: post.imageUrl,
      isMain: true,
    });
  }

  console.log(`Seeded ${seedPosts.length} adoption posts`);
}

async function main() {
  await seedUsersAndAccounts();
  await seedAssociationsAndOwners();
  await seedAdoptionPosts();
  console.log("Seeding complete.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });
