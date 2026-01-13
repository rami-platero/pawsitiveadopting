import { ZodType } from "zod";

function toQueryString(params: Record<string, unknown>) {
  const sp = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        sp.set(key, value.join(","));
      }
      continue;
    }

    if (typeof value === "boolean") {
      if (value) sp.set(key, "true");
      continue;
    }

    if (value !== undefined && value !== null) {
      sp.set(key, String(value));
    }
  }

  return sp.toString();
}

type Props<T> = {
  schema: ZodType<T>;
  onInvalidParams: (safeUrl: string) => void;
  searchParams: Record<string, string | string[] | undefined>;
};

export const parseParams = <T>({
  schema,
  searchParams,
  onInvalidParams,
}: Props<T>) => {
  const result = schema.safeParse(searchParams);
  if (!result.success) {
    const fallback = schema.safeParse({});

    const queryString = toQueryString(fallback.data!);
    const safeUrl = queryString ? `?${queryString}` : "";
    onInvalidParams(safeUrl);

    if (!fallback.success) {
      throw new Error("Critical: Schema cannot generate a default state.");
    }

    throw new Error("Critical: Schema cannot generate a default state.");
  }

  return result.data;
};
