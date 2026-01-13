import Pagination from "@/features/pets/components/filters/pagination";
import PostsList from "@/features/pets/components/posts-list";
import { getFilteredPosts } from "@/features/pets/data-access/getPosts";
import { ParsedSearchParams } from "@/features/pets/schema/searchParams.schema";

type Props = {
  filters: ParsedSearchParams
}

export default async function FilteredPostsResults({ filters }: Props) {
  const { data, count } = await getFilteredPosts(filters);

  return (
    <div>
      <div className="mb-4 font-semibold">
        Found {count} results
      </div>
      <PostsList posts={data} />
      <Pagination amountPages={Math.ceil(count / 10)} />
    </div>
  );
}