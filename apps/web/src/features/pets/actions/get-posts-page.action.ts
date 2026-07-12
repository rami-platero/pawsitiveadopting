"use server";

import {
  getFilteredPosts,
  PostsCursor,
} from "@/features/pets/data-access/getPosts";
import { ParsedSearchParams } from "@/features/pets/schema/searchParams.schema";

export async function getPostsPageAction(
  filters: ParsedSearchParams,
  associationId?: string,
  cursor?: PostsCursor,
) {
  return getFilteredPosts(filters, associationId, cursor);
}
