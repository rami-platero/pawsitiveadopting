import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export type TFn<T extends string> =
  | ReturnType<typeof useTranslations<T>>
  | Awaited<ReturnType<typeof getTranslations<T>>>;
