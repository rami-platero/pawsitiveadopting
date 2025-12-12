import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
