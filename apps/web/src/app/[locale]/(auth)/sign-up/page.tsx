import { getTranslations } from "next-intl/server"
import { TabsContent } from "@pawsitiveadopting/ui/components/tabs"
import EmailRegisterForm from "@/features/auth/components/register/EmailRegisterForm"
import Logo from "@/shared/components/Logo"
import Link from "next/link"
import SignInWithGoogle from "@/features/auth/components/SignInWithGoogle"
import Container from "@/shared/components/Container"
import VerificationSent from "@/features/auth/components/VerificationSent"
import AuthFlow from "@/features/auth/components/AuthFlow"

export async function generateMetadata() {
  const t = await getTranslations('Metadata.SignUp');
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function SignUpPage({ params }: { params: { locale: string } }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "AuthPage.SignUpPage" })

  return (
    <Container className="full-screen-center gap-6 items-center justify-center my-4">
      <AuthFlow>

        <TabsContent value="entry" className="max-w-sm mx-auto">
          <Logo size="lg" className="mx-auto justify-center" />
          <div className="mb-2 mt-8 text-center">
            <h1 className="font-medium text-xl">{t("title")}</h1>

            <div className="text-sm text-secondary/80 mx-auto mb-4">
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
  )
}