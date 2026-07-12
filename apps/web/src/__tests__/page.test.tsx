import { render, } from "@testing-library/react";
import messages from "../../messages/en.json"
import { NextIntlClientProvider } from "next-intl";
import { describe, it, vi } from 'vitest';
import HomePage from "@/app/[locale]/(main)/page";

// getRecentPosts transitively imports src/db/db.ts, which validates env vars
// at module load time via @t3-oss/env-nextjs. Vitest's jsdom environment
// defines `window`, which trips that library's client/server detection and
// throws "Attempted to access a server-side environment variable on the
// client" even though this is a server-rendered test. Mock it out so the
// import chain never reaches db.ts.
vi.mock("@/features/pets/data-access/getRecentPosts", () => ({
  getRecentPosts: vi.fn().mockResolvedValue([]),
}));

describe("Home", () => {
  it("renders a page", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HomePage params={{ locale: "en" }} />
      </NextIntlClientProvider>
    );
  });
});
