import { Skeleton } from '@pawsitiveadopting/ui/components/skeleton'
import Container from '@/shared/components/Container'
import FiltersSkeleton from '@/features/pets/components/filters/filters-skeleton'
import PostsGridSkeleton from '@/features/pets/components/browse/posts-grid-skeleton'

const LoadingSingleAssociation = () => {
  return (
    <Container>
      <div className="py-8">
        {/* Header Skeleton */}
        <div className="mb-8 flex items-center gap-4">
          <Skeleton className="h-[72px] w-[72px] rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-8 max-w-3xl space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Pets Title Skeleton */}
        <Skeleton className="h-6 w-32 mb-4" />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4">
          <div className="lg:contents">
            <FiltersSkeleton />
          </div>
          <PostsGridSkeleton />
        </div>
      </div>
    </Container>
  )
}

export default LoadingSingleAssociation
