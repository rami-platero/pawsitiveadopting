import { Skeleton } from "@pawsitiveadopting/ui/components/skeleton";
import PostItemSkeleton from "./post-item-skeleton";

export default function PostsGridSkeleton() {
    return (
        <div className="w-full">
            <div className="mb-4">
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <PostItemSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}