import { Skeleton } from "@pawsitiveadopting/ui/components/skeleton";
import PostItemSkeleton from "@/features/pets/components/browse/post-item-skeleton";

export default function RecentlyPostedPetsSkeleton() {
    return (
        <section className="w-full py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header Skeleton */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Skeleton className="h-10 w-64 mb-3" />
                        <Skeleton className="h-6 w-96" />
                    </div>
                    <Skeleton className="hidden md:block h-6 w-32" />
                </div>

                {/* Pets Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <PostItemSkeleton key={i} />
                    ))}
                </div>

                {/* Mobile View All Link Skeleton */}
                <div className="md:hidden mt-8 flex justify-center">
                    <Skeleton className="h-12 w-40 rounded-full" />
                </div>
            </div>
        </section>
    );
}
