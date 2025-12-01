import { _Translator } from "next-intl";
import z from "zod";


export const loginFormSchema = (
  t: _Translator<Record<string, any>, "AuthPage">
) => {
  return z.object({
    email: z.string().email(t("errors.invalidEmail")),
    password: z.string().min(8, t("errors.passwordTooShort")),
    rememberMe: z.boolean().optional(),
  });
};

export const registerFormSchema = (
  t: _Translator<Record<string, any>, "AuthPage">
) => {
  return z
    .object({
      name: z
        .string()
        .min(2, t("errors.nameTooShort"))
        .max(100, t("errors.nameTooLong")),
      email: z.string().email(t("errors.invalidEmail")),
      password: z.string().min(8, t("errors.passwordTooShort")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });
};

export type LoginFormData = z.infer<ReturnType<typeof loginFormSchema>>;
export type RegisterFormData = z.infer<ReturnType<typeof registerFormSchema>>;
