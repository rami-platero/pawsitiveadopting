import { Skeleton } from '@pawsitiveadopting/ui/components/skeleton';
import { ArrowLeft } from 'lucide-react';

export default function PetDetailLoading() {
    return (
        <div className="py-8 max-w-7xl mx-auto">
            {/* Back Button */}
            <div className="inline-flex items-center gap-2 text-sm mb-6">
                <ArrowLeft className="h-4 w-4" />
                <Skeleton className="h-4 w-28" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                {/* Left Column - Image Gallery */}
                <div className="w-full space-y-4">
                    {/* Main Image Skeleton */}
                    <Skeleton className="aspect-square w-full rounded-lg" />

                    {/* Thumbnail Gallery Skeleton */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="aspect-square rounded-md" />
                        ))}
                    </div>
                </div>

                {/* Right Column - Pet Information */}
                <div className="space-y-6">
                    {/* Status Badge & Favorite */}
                    <div className="flex items-start justify-between gap-4">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>

                    {/* Pet Name */}
                    <div>
                        <Skeleton className="h-10 w-48" />
                    </div>

                    {/* Location & Age */}
                    <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-32" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-24 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 p-4 bg-muted/30 rounded-lg">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i}>
                                <Skeleton className="h-3 w-16 mb-2" />
                                <Skeleton className="h-5 w-24" />
                            </div>
                        ))}
                    </div>

                    {/* Temperament */}
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-32" />
                        <div className="grid grid-cols-2 gap-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-5 w-24" />
                            ))}
                        </div>
                    </div>

                    {/* Contact Button */}
                    <Skeleton className="h-12 w-full rounded-md" />
                </div>
            </div>

            {/* Detailed Sections Below - Right Side */}
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 lg:gap-12">
                {/* Empty left column for spacing */}
                <div className="hidden lg:block" />

                {/* Right column with detailed sections */}
                <div className="space-y-4">
                    {/* Temperament Section */}
                    <div className="border rounded-lg p-4">
                        <Skeleton className="h-6 w-40 mb-3" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-5 w-32" />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Skeleton className="h-4 w-32 mb-2" />
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Health Section */}
                    <div className="border rounded-lg p-4">
                        <Skeleton className="h-6 w-40 mb-3" />
                        <div className="space-y-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex justify-between">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="border rounded-lg p-4">
                        <Skeleton className="h-6 w-48 mb-3" />
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex justify-between">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
