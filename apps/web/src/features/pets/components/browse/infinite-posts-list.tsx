"use client"

import { useRef } from "react";
import { Loader2 } from "lucide-react";
import { useInfinitePostsQuery } from "@/features/pets/hooks/useInfinitePosts";
import { useIntersectionObserver } from "@/features/pets/hooks/useIntersectionObserver";
import {
  AdoptionPostExtended,
  PostsCursor,
} from "@/features/pets/data-access/getPosts";
import { ParsedSearchParams } from "@/features/pets/schema/searchParams.schema";
import PostItem from "./post-item";

type Props = {
  initialPosts: AdoptionPostExtended[];
  initialNextCursor: PostsCursor | null;
  initialCount: number;
  filters: ParsedSearchParams;
  associationId?: string;
  associationSlug?: string;
  associationName?: string;
};

export default function InfinitePostsList({
  initialPosts,
  initialNextCursor,
  initialCount,
  filters,
  associationId,
  associationSlug,
  associationName,
}: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePostsQuery({
      filters,
      associationId,
      initialPosts,
      initialNextCursor,
      initialCount,
    });

  const posts = data?.pages.flatMap((page) => page.data) ?? initialPosts;

  const sentinelRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(sentinelRef, () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No pets found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            name={post.name}
            media={post.media}
            ageGroup={post.animalDetails.ageGroup}
            sex={post.animalDetails.sex}
            city={post.city}
            state={post.state}
            temperament={post.temperament}
            associationSlug={associationSlug}
            associationName={associationName}
          />
        ))}
      </div>

      <div ref={sentinelRef} className="h-px" aria-hidden />

      {isFetchingNextPage && (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          <span>Loading more pets...</span>
        </div>
      )}

      {!hasNextPage && !isFetchingNextPage && (
        <div className="py-10 text-center text-sm text-muted-foreground">
          You&apos;ve reached the end — no more pets to show.
        </div>
      )}
    </div>
  );
}
