import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
