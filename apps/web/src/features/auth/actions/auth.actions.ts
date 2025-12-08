"use server";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "ramiplatero11@gmail.com",
      password: "password",
    },
  });
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "ramiplatero11@gmail.com",
      password: "password",
      name: "Ramiro Platero",
    },
  });
};

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}