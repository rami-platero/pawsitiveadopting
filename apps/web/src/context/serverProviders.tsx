import { TooltipProvider } from "@pawsitiveadopting/ui/components/tooltip";
import { NextIntlClientProvider } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next";
import React from "react";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
};

const ServerProviders = ({ children }: Props) => {
  return <NextIntlClientProvider><Toaster position="top-center" richColors /><NuqsAdapter><TooltipProvider>{children}</TooltipProvider></NuqsAdapter></NextIntlClientProvider>;
};

export default ServerProviders;
