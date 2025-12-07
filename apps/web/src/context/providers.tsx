import { NextIntlClientProvider } from "next-intl";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};

export default Providers;
