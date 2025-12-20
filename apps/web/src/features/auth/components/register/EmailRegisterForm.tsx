"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { registerFormSchema, type RegisterFormData } from "../../schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@pawsitiveadopting/ui/components/form";
import { Input } from "@pawsitiveadopting/ui/components/input";
import { Button } from "@pawsitiveadopting/ui/components/button";
import { signUp } from "@/features/auth/actions/authClient.actions";
import { toast } from "sonner";
import { useAuthFlow } from "@/features/auth/components/context/AuthFlowContext";

export default function EmailRegisterForm() {
  const { goToVerification } = useAuthFlow()
  const t = useTranslations("AuthPage");

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormData) {
    const { error } = await signUp({
      email: values.email,
      password: values.password,
      name: values.name,
    });
    if (error) {
      toast.error(t(`errors.api.${error.code}`) || error.message);
    } else {
      goToVerification(values.email)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full selection:bg-secondary/50 selection:text-primary"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inputs.name.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inputs.name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inputs.email.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("inputs.email.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inputs.password.label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("inputs.password.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("inputs.password.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inputs.confirmPassword.label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("inputs.confirmPassword.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-xs text-secondary/70 text-center">
          <span>{t("SignUpPage.agreeTerms")} </span>
          <Link
            href="/terms"
            className="text-secondary hover:underline font-medium"
          >
            {t("SignUpPage.termsOfService")}
          </Link>
          <span> {t("SignUpPage.and")} </span>
          <Link
            href="/privacy"
            className="text-secondary hover:underline font-medium"
          >
            {t("SignUpPage.privacyPolicy")}
          </Link>
        </div>

        <Button className="w-full" type="submit" isLoading={form.formState.isSubmitting}>
          {t("submit.signUp")}
        </Button>
      </form>
    </Form>
  );
}
