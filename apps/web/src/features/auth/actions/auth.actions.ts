"use server";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type CreateUserParams = {
  email: string;
  password: string;
  name: string;
};

type SignInParams = {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: SignInParams) => {
  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  redirect("/");
};

export const signUp = async ({ email, password, name }: CreateUserParams) => {
  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  redirect("/");
};

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
};
