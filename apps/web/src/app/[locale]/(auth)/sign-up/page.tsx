import EmailRegisterForm from "@/features/auth/components/register/EmailRegisterForm";
import SignInWithGoogle from "@/features/auth/components/SignInWithGoogle";
import Container from "@/shared/components/Container";
import Logo from "@/shared/components/Logo";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type PageProps = {
  params: {
    locale: string
  }
}

export async function generateMetadata() {
  const t = await getTranslations('Metadata.SignUp');

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function SignUpPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AuthPage.SignUpPage" });

  return (
    <Container className="full-screen-center gap-6 max-w-sm items-center">
      <Logo size="lg" className="mx-auto" />
      <div className="mb-2 mt-8 text-center">
        <h1 className="font-medium text-xl">{t("title")}</h1>
        <div className="text-sm text-secondary/80 mx-auto">
          <span>{t("alreadyAccount")}</span>
          <Link
            href="/login"
            className="text-secondary hover:underline font-medium"
          >
            {t("logIn")}
          </Link>
        </div>
      </div>
      <EmailRegisterForm />

      {/* Divider */}
      <div className="flex items-center w-full">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-4 text-xs text-gray-500">{t("or")}</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <SignInWithGoogle />
    </Container>
  );
}
