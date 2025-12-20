"use server";
import { db } from "@/db/db";
import { auth } from "@/shared/lib/auth";
import { User } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
};

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export const getUserByEmail = async (email: User["email"]) => {
  return await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
};
