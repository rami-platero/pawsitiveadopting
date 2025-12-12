import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations('Metadata.NotFound');

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function CatchAllPage() {
  notFound();
}
