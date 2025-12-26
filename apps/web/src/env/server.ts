import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV}` });

export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.url(),
    // Google Provider Keys
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
/*         // Facebook Provider Keys
    FACEBOOK_CLIENT_ID: z.string().min(1),
    FACEBOOK_CLIENT_SECRET: z.string().min(1), */

    RESEND_API_KEY: z.string().min(1),
    EMAIL_SENDER_NAME: z.string().min(1),
    EMAIL_SENDER_ADDRESS: z.email(),
    BASE_URL: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
