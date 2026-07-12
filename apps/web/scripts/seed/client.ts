import { config } from "dotenv";
import path from "path";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../../src/db/schema";

const envFile =
  process.env.NODE_ENV === "development" ? ".env.development" : ".env";
config({ path: path.join(process.cwd(), envFile) });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not found in environment variables");
}

export const client = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle({ client, schema });
