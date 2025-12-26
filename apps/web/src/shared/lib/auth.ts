import { APIError, betterAuth } from "better-auth";
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
import { eq, sql } from "drizzle-orm";
import { createURL, extractAuthAction, extractLocale } from "@/shared/utils/auth.utils";
import { getTranslations } from "next-intl/server";

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
    sendVerificationEmail: async ({ user, token }, ctx) => {
      const type = extractAuthAction(ctx?.url);

      if (!type)
        throw new APIError("BAD_REQUEST", {
          code: "INVALID_VERIFICATION_URL",
          message: "The verification URL is invalid.",
        });

      if (type === "send-verification-email") {
        const dbUser = await db.query.user.findFirst({
          where: (u, { eq }) => eq(u.id, user.id),
          columns: {
            verificationEmailSentAt: true,
            verificationEmailCount: true,
          },
        });

        if (!dbUser) {
          throw new APIError("NOT_FOUND", {
            code: "USER_NOT_FOUND",
            message: "User not found.",
          });
        }

        if (
          dbUser.verificationEmailSentAt &&
          dbUser.verificationEmailCount != 1
        ) {
          const ONE_HOUR_MS = 60 * 60 * 1000;
          const now = Date.now();
          const lastSent = dbUser.verificationEmailSentAt.getTime();

          if (now - lastSent < ONE_HOUR_MS) {
            throw new APIError("FORBIDDEN", {
              code: "VERIFICATION_EMAIL_RECENTLY_SENT",
              message:
                "A verification email was already sent recently. Please wait before requesting another one.",
            });
          }
        }
      }

      await db
        .update(schema.user)
        .set({
          verificationEmailSentAt: new Date(),
          verificationEmailCount: sql`${schema.user.verificationEmailCount} + 1`,
        })
        .where(eq(schema.user.id, user.id));

      const url = createURL({ token, email: user.email });

      const locale = extractLocale(ctx?.headers);
      const t = await getTranslations({locale, namespace: 'emails.VerifyEmail'});

      await resend.emails.send({
        from: env.EMAIL_SENDER_ADDRESS,
        to: user.email,
        subject: t('subject'),
        react: VerifyEmail({ url, name: user.name, locale }),
      });
    },
    autoSignInAfterVerification: true,
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
      verificationEmailSentAt: {
        type: "date",
        input: false,
      },
      verificationEmailCount: {
        type: "number",
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
