import { Skeleton } from '@pawsitiveadopting/ui/components/skeleton'
import Container from '@/shared/components/Container'

const LoadingAssociations = () => {
  return (
    <Container>
      <div className="py-8">
        {/* Title and Description Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-9 w-48 mb-3" />
          <Skeleton className="h-5 w-full max-w-lg" />
        </div>

        {/* Country Filter Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-10 w-40" />
        </div>

        {/* Association Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border bg-card p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-full shrink-0" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default LoadingAssociations
