import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db";
import { env } from "@/env/server";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/db/schema";
import { resend } from "./resend";
import VerifyEmail from "@/shared/components/VerifyEmail";
import { admin, emailOTP, organization } from "better-auth/plugins";
import ResetPasswordEmail from "@/shared/components/ResetPasswordEmail";
import { Role } from "@/types/user";
import { organizationOptions } from "@/features/associations/permissions";
import { adminOptions } from "@/features/auth/permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: env.EMAIL_SENDER_ADDRESS,
        to: user.email,
        subject: "Hello world",
        react: VerifyEmail({ email: user.email, url }),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: Object.values(Role),
        input: false,
      },
    },
  },
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "forget-password") {
          await resend.emails.send({
            from: env.EMAIL_SENDER_ADDRESS,
            to: email,
            subject: "Password Reset",
            react: ResetPasswordEmail({ email, otp }),
          });
        }
      },
    }),
    admin(adminOptions),
    organization({
      ...organizationOptions,
      schema: { organization: { modelName: "association" } },
    }),
  ],
});
