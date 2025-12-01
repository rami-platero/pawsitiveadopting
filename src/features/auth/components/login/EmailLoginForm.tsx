"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Checkbox } from "@/shared/components/ui/checkbox";
import Link from "next/link";
import { type LoginFormData, loginFormSchema } from "../../schema";

export default function EmailLoginForm() {
  const t = useTranslations("AuthPage");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: LoginFormData) {
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

        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-secondary/80">
                    {t("inputs.rememberMe.label")}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          {/* Forgot Password */}
          <Link href="#" className="text-sm text-secondary hover:underline">
            {t("LoginPage.forgotPassword")}
          </Link>
        </div>

        <Button className="w-full" type="submit">
          {t("submit.logIn")}
        </Button>
      </form>
    </Form>
  );
}
