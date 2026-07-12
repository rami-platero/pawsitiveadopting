import { inArray } from "drizzle-orm";
import { db, client } from "./client";
import { user, association } from "../../src/db/schema/auth-schema";
import { adoptionPost } from "../../src/db/schema/posts-schema";
import { seedUsers, seedAssociations } from "./data";

async function main() {
  const associationIds = seedAssociations.map((a) => a.id);
  const userIds = seedUsers.map((u) => u.id);

  console.log("Deleting seeded adoption posts...");
  const deletedPosts = await db
    .delete(adoptionPost)
    .where(inArray(adoptionPost.associationId, associationIds))
    .returning({ id: adoptionPost.id });
  console.log(`Deleted ${deletedPosts.length} posts (related rows cascade)`);

  console.log("Deleting seeded associations...");
  const deletedAssociations = await db
    .delete(association)
    .where(inArray(association.id, associationIds))
    .returning({ id: association.id });
  console.log(`Deleted ${deletedAssociations.length} associations (members cascade)`);

  console.log("Deleting seeded users...");
  const deletedUsers = await db
    .delete(user)
    .where(inArray(user.id, userIds))
    .returning({ id: user.id });
  console.log(`Deleted ${deletedUsers.length} users (accounts cascade)`);

  console.log("Reset complete.");
}

main()
  .catch((error) => {
    console.error("Reset failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });
