import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <NextIntlClientProvider><Toaster position="top-center" richColors />{children}</NextIntlClientProvider>;
};

export default Providers;
