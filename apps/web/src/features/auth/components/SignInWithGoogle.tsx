"use client";

import { signInWithGoogle } from "@/shared/lib/auth-client";
import { Button } from "@pawsitiveadopting/ui/components/button";
import { useTranslations } from "next-intl";
import { FcGoogle } from "react-icons/fc";

const SignInWithGoogle = () => {

  const t = useTranslations("AuthPage.LoginPage");

  return <Button className="rounded-3xl w-full" onClick={signInWithGoogle}>
    <FcGoogle />
    {t("signInWithGoogle")}
  </Button>;
};

export default SignInWithGoogle;
