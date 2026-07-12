import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { associationsSearchParamsSchema } from '@/features/associations/schema/searchParams.schema';
import { parseParams } from '@/features/pets/utils/parser.helper';
import { getFilteredAssociations, getAvailableAssociationCountries, LIMIT } from '@/features/associations/data-access/getAssociations';
import AssociationCard from '@/features/associations/components/association-card';
import AssociationCountryFilter from '@/features/associations/components/association-country-filter';
import Pagination from '@/features/pets/components/filters/pagination';

export async function generateMetadata() {
  const t = await getTranslations('Metadata.Associations');

  return {
    title: t('title'),
    description: t('description'),
  };
}

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  params: Promise<{ locale: string }>;
};

export default async function AssociationsPage({ searchParams, params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Associations' });
  const resolvedParams = await searchParams;
  const parsedParams = parseParams({
    schema: associationsSearchParamsSchema,
    searchParams: resolvedParams,
    onInvalidParams: (safeURL: string) => {
      redirect(safeURL);
    },
  });

  const [{ data: associations, count }, countries] = await Promise.all([
    getFilteredAssociations(parsedParams),
    getAvailableAssociationCountries(),
  ]);

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="mb-6">
        <AssociationCountryFilter
          countries={countries}
          label={t('countryFilter.title')}
          allLabel={t('countryFilter.allLabel')}
        />
      </div>

      {associations.length === 0 ? (
        <p className="text-muted-foreground">{t('noResults')}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {associations.map((association) => (
              <AssociationCard key={association.id} association={association} />
            ))}
          </div>
          <Pagination amountPages={Math.ceil(count / LIMIT)} />
        </>
      )}
    </div>
  );
}
