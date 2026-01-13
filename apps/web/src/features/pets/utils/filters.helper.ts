import { inArray, SQL } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export function pushInArrayCondition<T>(
  value: T[] | undefined,
  excludeKey: string | undefined,
  currentKey: string,
  column: PgColumn,
  conditions: SQL[]
) {
  if (value && value.length > 0 && excludeKey !== currentKey) {
    conditions.push(inArray(column, value));
  }
}