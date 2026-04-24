import { Skeleton } from "@pawsitiveadopting/ui/components/skeleton";

export default function FiltersSkeleton() {
    return (
        <>
            {/* Mobile Filters Button */}
            <div className="lg:hidden mb-4">
                <Skeleton className="h-9 w-24" />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:block max-w-xs w-full shrink-0 space-y-4">
                {/* Title and Clear All */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-16" />
                </div>

                <div className="h-px bg-gray-200" />

                {/* Location Search */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <div className="h-px bg-gray-200" />

                {/* Sort By */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-14" />
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                </div>

                {/* Filter Groups */}
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-5 w-24" />
                        <div className="space-y-2">
                            {Array.from({ length: 3 }).map((_, j) => (
                                <div key={j} className="flex items-center space-x-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
