# Next Starter — CLAUDE.md

Next.js 16 frontend starter. The backend is an **external REST API** (`API_BASE_URL`) following the contract in `docs/API.md`; this repo has no database. Surfaces: public site, auth, user dashboard (`/dashboard`), admin dashboard (`/admin`), account settings (`/account`).

## Read before working

- `docs/ARCHITECTURE.md`: surfaces, data flow, folder rules, and the "adding a domain" recipe.
- `docs/API.md`: read before writing any data fetching, types or server action. Don't invent endpoints; add missing ones to its Gaps list.

## Commands

- Dev server: `npm run dev` (http://localhost:3000)
- Build: `npm run build` (must be green before any commit)
- Types: `npm run typecheck` (zero errors, no `any`, no `@ts-ignore`)
- Lint: `npm run lint`
- Format: `npm run format`

## Stack

- Next.js 16 (App Router, `cacheComponents: true` / PPR). **Read `node_modules/next/dist/docs/` before writing Next.js code; v16 has breaking changes** (e.g. `proxy.ts` replaces `middleware.ts`).
- React 19, TypeScript strict
- Tailwind v4 (CSS-first config in `app/globals.css`, no `tailwind.config.*`) + shadcn/ui. Never edit `components/ui/` except `Typography.tsx`.
- Zod v4 (`z.email()`, `z.iso.date()`, never `z.string().email()`), react-hook-form + @hookform/resolvers
- Tables: TanStack Table v8 following the shadcn data-table structure (see `components/users/UsersTable.tsx`)
- Rich text: Plate (`components/shared/editor/`), sanitized server-side with `sanitize-html` (`lib/sanitize-rich-text.ts`)
- Icons ONLY via `@/lib/icons` with the `I*` prefix (`ISearch`). Never import `lucide-react` directly.
- shadcn MCP is configured (`.mcp.json`); use it to fetch canonical component source instead of guessing.

## Architecture rules (non-negotiable)

1. **API access is server-side only.** All calls go through `lib/api-client.ts` (forwards auth cookies, unwraps the envelope, 401 → refresh → retry once), called from each domain's `lib/<domain>/api.ts`. Client components never call the API or `fetch`.
2. **Reads** return types from `lib/<domain>/types.ts`; cross-domain shapes (`Page<T>`, `PagedResult<T>`, `ApiEnvelope<T>`, `ActionState`, `Audit`) live in `lib/types.ts`. **Any read that forwards user cookies must never be inside a plain `"use cache"`.** Use `"use cache: private"` or no cache.
3. **Writes** are server actions in `app/actions/<entity>.ts`: validate with Zod, check auth with `requireRole()`, call the API, `updateTag(CACHE_TAGS.*)`, return `ActionState`. Never throw to the client.
4. **Identity**: `getSessionUser()` (React-cache-wrapped) / `requireRole()` in `lib/auth/`. Pass ids/roles down as props. `proxy.ts` is an optimistic cookie check only.
5. **Roles**: `USER | ADMIN` (`lib/auth/types.ts`). API role strings map to them in `lib/auth/roles.ts`. Never trust a role from the client.
6. **Routes**: every path from `ROUTES` in `lib/routes.ts`. Navigation items from `lib/nav.ts`.
7. **Streaming**: sync page shell → `<Suspense fallback={<XSkeleton/>}>` → async section that fetches. Shape-matched skeletons live in the domain's `skeletons/` folder.
8. **Pagination**: mirror the API's `page`/`size` in the URL (`?page=`) and pass it through; never fetch everything and slice.
9. **Design system**: shadcn semantic tokens only (no raw colors except `lib/status-tint.ts`), `Typography` outside shadcn compounds, native sub-components (`CardTitle`, `DialogDescription`, …) inside them, spacing constants from `components/shared/SectionLayout.tsx`, `<GridContainer>` for grids.
10. **Organize by business domain**, not technical layer (see `docs/ARCHITECTURE.md`).

## Conventions

- Custom components: `PascalCase.tsx`, `const` arrow function, `default export`. shadcn primitives keep their named exports.
- Forms follow https://ui.shadcn.com/docs/forms/react-hook-form (`Controller` + `Field`/`FieldLabel`/`FieldError`).
- Brand name, tagline and description live in `lib/site.ts`.
- Any UI work starts with the `frontend-design-system` skill (`.claude/skills/`), run inside the existing token system.
- Never commit `.env*` files or tokens.
