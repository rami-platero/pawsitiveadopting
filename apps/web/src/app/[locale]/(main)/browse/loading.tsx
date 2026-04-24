import { Skeleton } from '@pawsitiveadopting/ui/components/skeleton'
import FiltersSkeleton from '@/features/pets/components/filters/filters-skeleton'
import React from 'react'

const BrowseLoading = () => {
  return (
    <div className="py-8">
      {/* Title and Description Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-9 w-64 mb-3" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>

      {/* Main Grid Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4'>
        {/* Filters Skeleton */}
        <div className="lg:contents">
          <FiltersSkeleton />
        </div>

        {/* Posts Grid Skeleton */}
        <div className="w-full">
          <div className="mb-4">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="block overflow-hidden rounded-lg border bg-card"
              >
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
                      <Skeleton className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowseLoading