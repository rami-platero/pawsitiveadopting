# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run everything from the repo root with pnpm + Turborepo unless noted. Package manager is pinned to `pnpm@10.0.0`.

```bash
pnpm dev            # turbo run dev (all apps, persistent, uncached)
pnpm build          # turbo run build
pnpm lint           # turbo run lint
pnpm check-types    # turbo run check-types (tsc --noEmit per package)
pnpm test           # turbo run test (vitest)
pnpm format         # prettier --write "**/*.{ts,tsx,md}"
```

Scoped to `apps/web` (or `cd apps/web` first):

```bash
pnpm --filter web dev              # next dev --turbopack, port 3000
pnpm --filter web test             # vitest
pnpm --filter web test <pattern>   # vitest run against a single file/pattern
pnpm --filter web db:generate      # drizzle-kit generate (new migration from schema changes)
pnpm --filter web db:migrate       # drizzle-kit migrate
pnpm --filter web db:push          # drizzle-kit push (schema -> db, no migration file)
pnpm --filter web db:studio        # drizzle-kit studio
pnpm --filter web db:seed          # tsx scripts/seed/seed.ts
pnpm --filter web db:seed:reset    # tsx scripts/seed/reset.ts
```

**Seeding is idempotent, but not by upsert**: `seedAdoptionPosts()` checks whether posts already exist for the seed associations and skips the whole batch if so (adoption posts have no natural unique key to upsert on); users/associations use `onConflictDoNothing`/`onConflictDoUpdate` instead. Always run `db:seed:reset` before `db:seed` if you want a clean re-seed.

CI (`.github/workflows/`) only runs `test.yml` → `build.yml` → `migrate-production.yml` on pushes to `main`. **`lint` and `check-types` are not gated in CI** — run them locally before committing.

## Architecture

Pnpm workspace + Turborepo monorepo. One app (`apps/web`, Next.js 16 App Router), four shared packages:

- `@pawsitiveadopting/ui` (`packages/ui`) — Radix-based component library, imported via subpath exports like `@pawsitiveadopting/ui/components/button`. Listed in `next.config.ts`'s `transpilePackages`.
- `@pawsitiveadopting/tailwind-config` — shared Tailwind v4 config (`./globals.css`, `./postcss.config`).
- `@pawsitiveadopting/eslint-config` — shared flat ESLint configs (`./base`, `./next-js`, `./react-internal`).
- `@pawsitiveadopting/typescript-config` — shared `tsconfig` bases.

### `apps/web/src` layout

- **`app/`** — Next.js App Router. Every route lives under a `[locale]` segment (next-intl). Route groups: `(auth)` (login/sign-up/confirm), `(main)` (home/browse/pet/[id]/associations/chat). API routes are minimal: `api/auth/[...all]` (better-auth catch-all), `api/chat`, `api/locations/search`.
- **`features/`** — feature-folder pattern, one folder per domain (`pets`, `associations`, `auth`, `ai`, `landing`, `faq`). A typical feature folder has: `components/`, `data-access/` (read-only Drizzle queries called directly from server components), `actions/` (`"use server"` functions, called from client components), `schema/` (zod schemas, often for search-param validation via `nuqs`), `hooks/`, `utils/`.
- **`db/`** — Drizzle ORM. `db/schema.ts` is the barrel export consumed by `drizzle.config.ts` and app code — it currently re-exports `auth-schema`, `posts-schema`, `reviews-schema`, `notifications-schema` only. **`db/schema/applications-schema.ts` and `db/schema/chat-schema.ts` exist but are not re-exported from the barrel** — import them directly by path if needed, don't assume `@/db/schema` has everything under `db/schema/`. `db/db.ts` picks a driver based on environment: `postgres-js` (globally-cached client) in dev, Neon serverless HTTP driver in production. Migrations in `db/migrations/`; seed scripts live outside this folder at `scripts/seed/`.
- **`shared/`** — cross-cutting code: the better-auth instance (`shared/lib/auth.ts`), Resend client, email templates, auth utils.
- **`context/`** — app-wide provider composition, split into `serverProviders.tsx` (NextIntlClientProvider, Toaster, NuqsAdapter, TooltipProvider) and `clientProviders.tsx` (`"use client"`, currently just TanStack Query's `QueryClientProvider`).
- **`i18n/`** — next-intl setup: `routing.ts` (locales `en`/`fr`/`es`, default `en`), `request.ts`, `navigation.ts` (localized `Link`/`useRouter`). Messages live in `apps/web/messages/{locale}.json`, flat namespaced JSON.
- **`env/`** — `@t3-oss/env-nextjs` validation (`server.ts`/`client.ts`), loads `.env.${NODE_ENV}`.
- **`proxy.ts`** — Next 16's renamed `middleware.ts` equivalent; wraps `next-intl/middleware`.

### Auth

better-auth (`shared/lib/auth.ts`) with `drizzleAdapter(db, { provider: "pg" })`. Key non-obvious mapping: the `organization` plugin is aliased to the `association` model (an association *is* a better-auth organization) — `member` roles are `owner`/`member`/`admin`/`pet_manager`. Plugins: `nextCookies()`, `emailOTP` (password reset), `admin` (options in `features/auth/permissions.ts`), `organization` (options in `features/associations/permissions.ts`). Email/password requires verification; verification emails are throttled to 1/hour and sent via Resend using localized react-email templates. Only Google is wired up as a social provider — Facebook env vars exist in `turbo.json`'s env passthrough and are stubbed (commented out) in `env/server.ts`, not currently functional.

### Data fetching pattern (pets browse as the reference implementation)

- Server components do the **first page** fetch directly via a `data-access/` function (e.g. `getFilteredPosts` in `features/pets/data-access/getPosts.ts`), passing the result down as props for hydration.
- Client components needing more data (e.g. infinite scroll) call a matching `"use server"` action in `actions/` (e.g. `getPostsPageAction`) — not a REST route — via TanStack Query's `queryFn`, seeded with `initialData` from the server-fetched first page so there's no duplicate fetch on mount.
- Search/filter state uses `nuqs` (`useQueryStates`/`useQueryState`) synced to the URL, validated server-side with a zod schema in `features/<domain>/schema/searchParams.schema.ts`.
- Pagination on `adoptionPost` is **cursor/keyset-based** (compound `(datePosted, id)` key, `id` as tiebreaker since `datePosted` isn't unique), not offset-based — see `buildSeekCondition` in `getPosts.ts` for the pattern if adding similar paginated queries elsewhere. The `associations` listing still uses offset-based pagination (`features/associations/data-access/getAssociations.ts` + the shared `features/pets/components/filters/pagination.tsx` component) — the two lists are not on the same pagination strategy.

### Testing

Vitest (`apps/web/vitest.config.mts`, jsdom environment) + Testing Library. Coverage is minimal — effectively one smoke test (`src/__tests__/page.test.tsx`) rendering a page under `NextIntlClientProvider` with `messages/en.json`. That's the pattern to follow for any new page-level test: wrap in `NextIntlClientProvider`, don't assume a global i18n test setup exists.
