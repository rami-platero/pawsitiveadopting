import { render, } from "@testing-library/react";
import messages from "../../messages/en.json"
import { NextIntlClientProvider } from "next-intl";
import { describe, it } from 'vitest';
import HomePage from "@/app/[locale]/(main)/page";

describe("Home", () => {
  it("renders a page", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HomePage params={{ locale: "en" }} />
      </NextIntlClientProvider>
    );
  });
});
