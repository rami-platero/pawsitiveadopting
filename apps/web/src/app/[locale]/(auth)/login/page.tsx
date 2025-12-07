import EmailLoginForm from "@/features/auth/components/login/EmailLoginForm";
import SignInWithGoogle from "@/features/auth/components/SignInWithGoogle";
import Container from "@/shared/components/Container";
import Logo from "@/shared/components/Logo";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata() {
  const t = await getTranslations('Metadata.Login');

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function LoginPage() {
  const t = useTranslations("AuthPage.LoginPage");

  return (
    <Container className="full-screen-center gap-6 max-w-sm items-center">
      <Logo size="lg" className="mx-auto" />
      <div className="mb-2 mt-8 text-center">
        <h1 className="font-medium text-xl">{t("title")}</h1>
        <div className="text-sm text-secondary/80 mx-auto">
          <span>{t("noAccount")}</span>
          <Link
            href="/signup"
            className="text-secondary hover:underline font-medium"
          >
            {t("signUp")}
          </Link>
        </div>
        {/* <h2 className="text-sm text-secondary/70">{t("subtitle")}</h2> */}
      </div>
      <EmailLoginForm />

      {/* Divider */}
      <div className="flex items-center w-full">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-4 text-xs text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <SignInWithGoogle />
    </Container>
  );
}
