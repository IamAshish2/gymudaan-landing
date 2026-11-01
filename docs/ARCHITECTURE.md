# Architecture

## Surfaces

One app, four route groups. Groups don't change URLs; the folder inside each group sets the prefix.

| Group | URL | Who | Guard | Shell |
| --- | --- | --- | --- | --- |
| `(marketing)` | `/`, `/pricing`, `/blogs`, `/terms`, `/privacy-policy` | everyone | — | `LandingHeader` + `LandingFooter`, fixed palette |
| `(site)/account` | `/account/*` | any signed-in user | `requireRole(...ALL_ROLES)` in the layout | `SiteShell` + `SettingsNav` |
| `(dashboard)` | `/dashboard/*` | `USER` | `requireRole("USER")` in the layout | `DashboardShell surface="dashboard"` |
| `(admin)` | `/admin/*` | `ADMIN` | `requireRole("ADMIN")` in the layout | `DashboardShell surface="admin"` |

`proxy.ts` only checks that the access-token cookie exists and redirects to the home page if it doesn't. There is no login page, so `/dashboard`, `/admin` and `/account` need a session created some other way. It is **not** a security boundary. Real checks are `requireRole()` in layouts, pages and server actions, and then the API's own JWT check.

## Data flow

```
Client component ──(server action)──▶ app/actions/<entity>.ts ──▶ lib/<domain>/api.ts? ──▶ lib/api-client.ts ──▶ API
Server component ─────────────────────────────────────────────▶ lib/<domain>/api.ts ──▶ lib/api-client.ts ──▶ API
```

- **Reads** live in `lib/<domain>/api.ts` (`import "server-only"`). Reads that forward user cookies use `"use cache: private"` (or no cache); only `publicApiFetch` may run inside a plain `"use cache"`.
- **Writes** are server actions in `app/actions/<entity>.ts`: Zod-validate (`lib/<domain>/validations.ts`), `requireRole(...)`, call the API, `updateTag(CACHE_TAGS.x)`, and return `ActionState`. Never throw to the client.
- **Identity**: `getSessionUser()` resolves the session once per request (React `cache`). Layouts pass the user down as props.

## Streaming

Each page is a synchronous shell (heading + description), then `<Suspense fallback={<XSkeleton />}>`, then an async section that fetches. Every data section gets a skeleton shaped like it, kept in its domain's `skeletons/` folder.

## Adding a domain (recipe)

Copy the Users module. For a domain called `projects`:

1. `lib/projects/types.ts`: the API entity type.
2. `lib/projects/api.ts`: paginated read with `"use cache: private"` + `cacheTag(CACHE_TAGS.projects)`.
3. `lib/projects/validations.ts`: Zod schema + default values for the form.
4. `lib/cache-tags.ts`: add `projects: "projects"`.
5. `app/actions/projects.ts`: save/delete actions that call `updateTag(CACHE_TAGS.projects)`.
6. `components/projects/`: `ProjectsTable`, `ProjectsColumns`, `ProjectDialog`, `ProjectRowActions`, `skeletons/ProjectsTableSkeleton`.
7. `lib/routes.ts`: add the path; `lib/nav.ts`: add the sidebar item.
8. `app/(admin)/admin/projects/page.tsx`: shell + `Suspense` + async section reading `?page=` from `searchParams`.
9. Document the endpoints in `docs/API.md`.

## Folder rules

Organize `lib/` and `components/` **by business domain**, not by technical layer. Each domain owns its `api.ts`, `types.ts` and `validations.ts`. Inside a domain folder, drop the domain prefix from filenames (`lib/users/api.ts`, not `lib/users/users-api.ts`). `lib/` root and `components/shared/` are only for code with no single domain owner.
