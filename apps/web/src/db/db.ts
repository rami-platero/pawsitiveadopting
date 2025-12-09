import { env } from "@/env/server";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";

let db: PostgresJsDatabase<typeof schema> | NeonHttpDatabase<typeof schema>;

if (process.env.NODE_ENV == "development") {
  const client = postgres(env.DATABASE_URL);

  db = drizzlePg({ client, schema });
} else {
  const client = neon(env.DATABASE_URL);

  db = drizzle({ client, schema });
}

export { db };
