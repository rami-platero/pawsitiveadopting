import HeroSection from "@/features/landing/components/HeroSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations('Metadata.Home');

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function HomePage() {
  return <HeroSection />;
}
