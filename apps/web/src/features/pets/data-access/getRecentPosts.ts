import { db } from "@/db/db";
import { adoptionPost } from "@/db/schema/posts-schema";
import { desc, eq } from "drizzle-orm";
import { AdoptionPostExtended } from "./getPosts";

/**
 * Get recently posted pets (limited to specified count)
 * @param limit - Number of pets to fetch (default: 8)
 * @returns Array of recently posted pets with their details
 */
export async function getRecentPosts(
  limit: number = 8,
): Promise<AdoptionPostExtended[]> {
  const posts = await db.query.adoptionPost.findMany({
    where: eq(adoptionPost.status, "available"),
    orderBy: [desc(adoptionPost.datePosted)],
    limit,
    with: {
      animalDetails: true,
      media: true,
      temperament: true,
    },
  });

  return posts as AdoptionPostExtended[];
}
