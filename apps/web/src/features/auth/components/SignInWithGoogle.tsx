"use client"
import { signInWithGoogle } from "@/shared/lib/auth-client";
import { Button } from "@pawsitiveadopting/ui/components/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignInWithGoogle = () => {
  const [loading, setLoading] = useState(false)

  const t = useTranslations("AuthPage.LoginPage");

  const handleSignIn = async () => {
    setLoading(true)
    await signInWithGoogle()
    setLoading(false)
  }

  return <Button isLoading={loading} className="rounded-3xl w-full" onClick={handleSignIn}>
    <FcGoogle />
    {t("signInWithGoogle")}
  </Button>;
};

export default SignInWithGoogle;
