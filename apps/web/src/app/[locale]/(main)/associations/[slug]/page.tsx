import { getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';
import { MapPin } from 'lucide-react';
import Avatar from '@pawsitiveadopting/ui/components/avatar';
import { getAssociationBySlug } from '@/features/associations/data-access/getAssociations';
import Filters from '@/features/pets/components/filters/filters';
import PostsGridSkeleton from '@/features/pets/components/browse/posts-grid-skeleton';
import { searchParamsSchema } from '@/features/pets/schema/searchParams.schema';
import { parseParams } from '@/features/pets/utils/parser.helper';
import { getAvailableFilters } from '@/features/pets/data-access/getFilters';
import FilteredPostsResults from '@/features/pets/components/browse/filtered-posts-results';
import Container from '@/shared/components/Container';
import SetBreadcrumbLabel from '@/shared/components/set-breadcrumb-label';

type Props = {
    params: Promise<{ slug: string; locale: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const association = await getAssociationBySlug(slug);
    const t = await getTranslations('Metadata.AssociationDetail');

    if (!association) {
        return { title: t('notFound') };
    }

    return {
        title: t('title', { name: association.name }),
        description: association.description || t('description', { name: association.name }),
    };
}

export default async function AssociationDetailPage({ params, searchParams }: Props) {
    const { slug, locale } = await params;
    const association = await getAssociationBySlug(slug);
    const t = await getTranslations({ locale, namespace: 'Associations.Detail' });

    if (!association) {
        notFound();
    }

    const resolvedParams = await searchParams;
    const parsedParams = parseParams({
        schema: searchParamsSchema,
        searchParams: resolvedParams,
        onInvalidParams: (safeURL: string) => {
            redirect(safeURL);
        },
    });

    const availableFilters = await getAvailableFilters({
        type: parsedParams.type,
        sex: parsedParams.sex,
        age: parsedParams.age,
        color: parsedParams.color,
        goodWithKids: parsedParams.goodWithKids,
        goodWithDogs: parsedParams.goodWithDogs,
        goodWithCats: parsedParams.goodWithCats,
        goodInApartment: parsedParams.goodInApartment,
        goodInHouse: parsedParams.goodInHouse,
        goodInGarden: parsedParams.goodInGarden,
        associationId: association.id,
    });

    return (
        <Container>
            <div className="py-8">
                <SetBreadcrumbLabel label={association.name} />

                <div className="mb-8 flex items-center gap-4">
                    <Avatar image={association.logo} alt={association.name} size={72} />
                    <div>
                        <h1 className="text-3xl font-bold">{association.name}</h1>
                        {(association.city || association.country) && (
                            <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                                <MapPin className="h-4 w-4 shrink-0" />
                                <span>{[association.city, association.state, association.country].filter(Boolean).join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>

                {association.description && (
                    <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                        {association.description}
                    </p>
                )}

                <h2 className="text-xl font-semibold mb-4">{t('petsTitle')}</h2>

                <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4'>
                    <Filters availableFilters={availableFilters} />
                    <Suspense key={JSON.stringify(parsedParams)} fallback={<PostsGridSkeleton />}>
                        <FilteredPostsResults
                            filters={parsedParams}
                            associationId={association.id}
                            associationSlug={slug}
                            associationName={association.name}
                        />
                    </Suspense>
                </div>
            </div>
        </Container>
    );
}
