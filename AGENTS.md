<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Next Starter — agent entry point

Full rules live in **`CLAUDE.md`**; read it first. Deep docs: `docs/ARCHITECTURE.md` (surfaces, data flow, adding a domain) and `docs/API.md` (backend contract).

Hard rules at a glance: API calls only server-side via `lib/api-client.ts` from `lib/<domain>/api.ts` · writes are server actions in `app/actions/` returning `ActionState` · roles enforced with `requireRole()` in layouts, pages and actions · cookie-forwarding reads never in a plain `"use cache"` · tables = shadcn data-table structure · forms = shadcn react-hook-form structure · icons via `@/lib/icons` (`I*`) · Typography outside shadcn compounds, native slots inside · paths from `lib/routes.ts` · `lib/` and `components/` organized by business domain · never edit `components/ui/` except `Typography.tsx`.
