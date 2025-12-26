import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Jost } from "next/font/google";
import "@pawsitiveadopting/tailwind-config/globals.css";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/shared/components/navbar/navbar";
import ClientProviders from "@/context/clientProviders";
import ServerProviders from "@/context/serverProviders";

const jost = Jost({
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={jost.className}>
      <body className="bg-background selection:bg-primary/50 selection:text-secondary">
        <ServerProviders>
          <ClientProviders>
            <Navbar />
            {children}
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
