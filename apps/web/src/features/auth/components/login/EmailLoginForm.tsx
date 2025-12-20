"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@pawsitiveadopting/ui/components/form";
import { Input } from "@pawsitiveadopting/ui/components/input";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type LoginFormData, loginFormSchema } from "../../schema";
import { Checkbox } from "@pawsitiveadopting/ui/components/checkbox";
import { Button } from "@pawsitiveadopting/ui/components/button";
import { signIn } from "@/features/auth/actions/authClient.actions";
import { toast } from "sonner";
import { useAuthFlow } from "@/features/auth/components/context/AuthFlowContext";

export default function EmailLoginForm() {
  const t = useTranslations("AuthPage");
  const { goToVerification } = useAuthFlow()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormData) {
    const { error } = await signIn({ email: values.email, password: values.password });
    if (error) {
      if (error.code === "EMAIL_NOT_VERIFIED") {
        goToVerification(values.email)
      } else {
        toast.error(t(`errors.api.${error.code}`) || error.message);
      }
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

        <Button className="w-full" type="submit" isLoading={form.formState.isSubmitting}>
          {t("submit.logIn")}
        </Button>
      </form>
    </Form>
  );
}
