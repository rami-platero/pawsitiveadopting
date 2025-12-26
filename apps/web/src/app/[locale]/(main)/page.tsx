import HeroSection from "@/features/landing/components/HeroSection";
import { getTranslations } from "next-intl/server";

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

export default async function HomePage({params}: PageProps) {
  const { locale } = await params;
  return <HeroSection locale={locale}/>;
}
