import { authClient } from "@/shared/lib/auth-client";

type RegisterParams = {
  email: string;
  password: string;
  name: string;
};

type SignInParams = {
  email: string;
  password: string;
};

export const signIn = async (data: SignInParams) => {
  return await authClient.signIn.email({ ...data, callbackURL: "/"});
};

export const signUp = async (data: RegisterParams) => {
  return await authClient.signUp.email({ ...data });
};
