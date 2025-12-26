import { env } from "@/env/server";

export function extractAuthAction(
  url?: string
): "send-verification-email" | "sign-up" | null {
  if (!url) return null;

  const pathname = new URL(url).pathname;
  const parts = pathname.split("/");

  const action = parts[3];

  return action === "send-verification-email" || action === "sign-up"
    ? action
    : null;
}

export function createURL({
  token,
  email,
}: {
  token: string;
  email: string;
}): string {
  return `${env.BASE_URL}/confirm?token=${token}&email=${encodeURIComponent(email)}`;
}

export function extractLocale(headers: Headers | undefined) {
  const cookieHeader = headers?.get("cookie") || "";
  const localeCookie = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("NEXT_LOCALE="));

  return localeCookie?.split("=")[1] || "en";
}