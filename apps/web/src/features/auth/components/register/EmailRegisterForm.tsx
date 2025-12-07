"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { registerFormSchema, type RegisterFormData } from "../../schema";

export default function EmailRegisterForm() {
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

  function onSubmit(values: RegisterFormData) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-sm"
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

        <Button className="w-full" type="submit">
          {t("submit.signUp")}
        </Button>
      </form>
    </Form>
  );
}
