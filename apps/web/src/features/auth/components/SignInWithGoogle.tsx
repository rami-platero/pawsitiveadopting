"use client";

import { Button } from "@/shared/components/ui/button";
import { signInWithGoogle } from "@/shared/lib/auth-client";
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
