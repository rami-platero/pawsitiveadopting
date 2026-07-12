import InfinitePostsList from "./infinite-posts-list";
import { getFilteredPosts } from "@/features/pets/data-access/getPosts";
import { ParsedSearchParams } from "@/features/pets/schema/searchParams.schema";

type Props = {
  filters: ParsedSearchParams
  associationId?: string
}

export default async function FilteredPostsResults({ filters, associationId }: Props) {
  const { data, count, nextCursor } = await getFilteredPosts(filters, associationId);

  return (
    <div>
      <div className="mb-4 font-semibold">
        Found {count} results
      </div>
      <InfinitePostsList
        initialPosts={data}
        initialNextCursor={nextCursor}
        initialCount={count}
        filters={filters}
        associationId={associationId}
      />
    </div>
  );
}
