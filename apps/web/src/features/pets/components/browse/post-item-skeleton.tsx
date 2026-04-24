import { Skeleton } from "@pawsitiveadopting/ui/components/skeleton";

export default function PostItemSkeleton() {
    return (
        <div className="block overflow-hidden rounded-lg border">
            {/* Image Skeleton */}
            <Skeleton className="aspect-square w-full" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                {/* Name */}
                <Skeleton className="h-7 w-3/4" />

                {/* Age and Sex */}
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>

                {/* Location and Icons */}
                <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
