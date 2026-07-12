import HeroSection from "@/features/landing/components/HeroSection";
import RecentlyPostedPets from "@/features/landing/components/RecentlyPostedPets";
import RecentlyPostedPetsSkeleton from "@/features/landing/components/RecentlyPostedPetsSkeleton";
import HowItWorks from "@/features/landing/components/HowItWorks";
import AssociationCTA from "@/features/landing/components/AssociationCTA";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

type PageProps = {
  params: {
    locale: string
  }
}

export async function generateMetadata() {
  const t = await getTranslations('Metadata.Home');

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />

      <Suspense fallback={<RecentlyPostedPetsSkeleton />}>

        <RecentlyPostedPets locale={locale} />
      </Suspense>
      <HowItWorks locale={locale} />
      <AssociationCTA locale={locale} />
    </>
  );
}
