import { Skeleton } from "@pawsitiveadopting/ui/components/skeleton";

export default function PostsGridSkeleton() {
    return (
        <div className="w-full">
            <div className="mb-4">
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="block overflow-hidden rounded-lg border"
                    >
                        <Skeleton className="aspect-square w-full" />

                        <div className="p-4 space-y-2">
                            <Skeleton className="h-7 w-3/4" />

                            <Skeleton className="h-4 w-full" />

                            <div className="space-y-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>

                            <div className="pt-2">
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}