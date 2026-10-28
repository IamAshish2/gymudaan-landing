# Next Starter

A Next.js 16 starter for apps backed by an external REST API. It comes with:

- **Server-side API access**: one client (`lib/api-client.ts`) that forwards auth cookies, unwraps the API envelope, and refreshes expired tokens.
- **Cookie-based auth**: login, logout, change password, `/auth/me` session lookup, and a `?next=` redirect after login.
- **Role-guarded surfaces**: public site, user dashboard (`/dashboard`), admin dashboard (`/admin`), and account settings (`/account`).
- **A working example domain**: admin **Users** management (paginated table, search, sort, filters, create/edit dialog, row actions, detail sheet, skeletons).
- **Design system**: shadcn/ui on Tailwind v4, Typography, spacing constants, light/dark/system theme, route progress bar, ⌘K command palette.
- **Rich text**: a Plate editor with image upload and server-side sanitizing (demo at `/dashboard/editor`).

## Getting started

```bash
npm install
cp .env.example .env.local   # then set API_BASE_URL
npm run dev
```

Open http://localhost:3000. Sign-in needs a backend that implements the contract in [`docs/API.md`](docs/API.md). The public pages work without one.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Make it yours

1. **Name and copy**: edit `lib/site.ts`.
2. **Brand colors**: edit the tokens in `app/globals.css` (`--primary` etc., light and dark).
3. **Roles**: map your API's role strings in `lib/auth/roles.ts`.
4. **Your first domain**: follow the recipe in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#adding-a-domain-recipe), using `lib/users` + `components/users` as the template.
5. **Remove the demo**: delete `app/(dashboard)/dashboard/editor`, `components/rich-text/EditorDemo.tsx`, `app/actions/rich-text.ts`, and the "Editor" item in `lib/nav.ts`.

## Project layout

```
app/
  (site)/            public pages + /account settings
  (auth)/            /login, /register
  (dashboard)/       /dashboard (USER)
  (admin)/           /admin (ADMIN)
  actions/           server actions, one file per entity
components/
  ui/                shadcn primitives (+ Typography, GridContainer)
  layout/            shells, navbars, sidebar, command palette
  shared/            cross-domain components (SectionLayout, ConfirmDialog, editor, …)
  <domain>/          components owned by one domain (users, roles, settings, …)
lib/
  api-client.ts      the only path to the backend
  auth/              cookies, session, roles, requireRole
  <domain>/          api.ts, types.ts, validations.ts per domain
  routes.ts          every URL
  nav.ts             every sidebar / settings / palette item
docs/                API contract + architecture
proxy.ts             optimistic auth-cookie check for guarded paths
```
