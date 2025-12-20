import EmailLoginForm from "@/features/auth/components/login/EmailLoginForm";
import AuthFlow from "@/features/auth/components/AuthFlow";
import VerificationSent from "@/features/auth/components/VerificationSent";
import SignInWithGoogle from "@/features/auth/components/SignInWithGoogle";
import Container from "@/shared/components/Container";
import Logo from "@/shared/components/Logo";
import { TabsContent } from "@pawsitiveadopting/ui/components/tabs";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type PageProps = {
  params: {
    locale: string
  }
}

export async function generateMetadata() {
  const t = await getTranslations('Metadata.Login');

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function LoginPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AuthPage.LoginPage" });

  return (
    <Container className="full-screen-center gap-6 items-center justify-center my-4">
      <AuthFlow>

        <TabsContent value="entry" className="max-w-sm w-full mx-auto">
          <Logo size="lg" className="mx-auto justify-center" />
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
          </div>
          <EmailLoginForm />

          <div className="flex items-center w-full my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-xs text-gray-500">{t("or")}</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <SignInWithGoogle />
        </TabsContent>

        <TabsContent value="email-verification" className="max-w-xl mx-auto">
          <VerificationSent />
        </TabsContent>

      </AuthFlow>
    </Container>
  );
}
