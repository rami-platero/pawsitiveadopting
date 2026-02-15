import { getTranslations } from 'next-intl/server';
import Filters from '@/features/pets/components/filters/filters';
import { Suspense } from 'react';
import PostsGridSkeleton from '@/features/pets/components/posts-grid-skeleton';
import { searchParamsSchema } from '@/features/pets/schema/searchParams.schema';
import { parseParams } from '@/features/pets/utils/parser.helper';
import { redirect } from 'next/navigation';
import { getAvailableFilters } from '@/features/pets/data-access/getFilters';
import FilteredPostsResults from '@/features/pets/components/filtered-posts-results';

export async function generateMetadata() {
  const t = await getTranslations('Metadata.Browse');

  return {
    title: t('title'),
    description: t('description')
  };
}

type Props = {
  searchParams: Promise<{ search?: string, type?: string }>;
}

export default async function BrowsePage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const parsedParams = parseParams({
    schema: searchParamsSchema,
    searchParams: resolvedParams, onInvalidParams: (safeURL: string) => {
      redirect(safeURL)
    }
  });
  const availableFilters = await getAvailableFilters({ type: parsedParams.type, breed: parsedParams.breed, age: parsedParams.age });

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Pets</h1>
        <p className="text-muted-foreground">Find your perfect companion</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4'>
        <Filters availableFilters={availableFilters} />
        <Suspense key={JSON.stringify(parsedParams)} fallback={<PostsGridSkeleton />}>
          <FilteredPostsResults filters={parsedParams} />
        </Suspense>
      </div>

    </div>
  )
}
