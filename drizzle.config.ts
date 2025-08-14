import { env } from "@/env/server";
import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
}) satisfies Config;