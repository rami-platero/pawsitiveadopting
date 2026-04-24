import { db } from "@/db/db";
import {
  adoptionPost,
  type HealthInfo,
  type AdoptionRequirements,
} from "@/db/schema/posts-schema";
import { eq } from "drizzle-orm";
import { AdoptionPostExtended } from "./getPosts";

export type AdoptionPostDetail = AdoptionPostExtended & {
  healthInfo: HealthInfo | null;
  adoptionRequirements: AdoptionRequirements | null;
};

export async function getPostById(
  id: string,
): Promise<AdoptionPostDetail | null> {
  if (isNaN(Number(id))) return null;
  const post = await db.query.adoptionPost.findFirst({
    where: eq(adoptionPost.id, Number(id)),
    with: {
      animalDetails: true,
      media: {
        orderBy: (media, { desc }) => [desc(media.isMain)],
      },
      temperament: true,
      healthInfo: true,
      adoptionRequirements: true,
      association: true,
      user: true,
    },
  });

  if (!post || !post.animalDetails) {
    return null;
  }

  return {
    ...post,
    animalDetails: post.animalDetails,
    temperament: post.temperament ?? null,
    healthInfo: post.healthInfo ?? null,
    adoptionRequirements: post.adoptionRequirements ?? null,
  };
}
