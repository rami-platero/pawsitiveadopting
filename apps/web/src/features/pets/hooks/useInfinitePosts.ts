"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsPageAction } from "@/features/pets/actions/get-posts-page.action";
import {
  AdoptionPostExtended,
  PostsCursor,
} from "@/features/pets/data-access/getPosts";
import { ParsedSearchParams } from "@/features/pets/schema/searchParams.schema";

type PostsPage = {
  data: AdoptionPostExtended[];
  nextCursor: PostsCursor | null;
  count: number;
};

type Params = {
  filters: ParsedSearchParams;
  associationId?: string;
  initialPosts: AdoptionPostExtended[];
  initialNextCursor: PostsCursor | null;
  initialCount: number;
};

export function useInfinitePostsQuery({
  filters,
  associationId,
  initialPosts,
  initialNextCursor,
  initialCount,
}: Params) {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite", filters, associationId] as const,
    queryFn: async ({ pageParam }): Promise<PostsPage> => {
      return getPostsPageAction(filters, associationId, pageParam);
    },
    initialPageParam: undefined as PostsCursor | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialData: () => ({
      pages: [
        {
          data: initialPosts,
          nextCursor: initialNextCursor,
          count: initialCount,
        },
      ],
      pageParams: [undefined],
    }),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
