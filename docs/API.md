# Backend API contract

The frontend talks to an external REST API (`API_BASE_URL`) **from the server only**, through `lib/api-client.ts`. Any backend that follows this contract works without code changes. If the real API disagrees with this file, the API wins: update this file and flag the difference.

## Response envelope

Every response is wrapped:

```json
{ "success": true, "status": 200, "message": "OK", "data": { } }
```

`apiFetch<T>()` unwraps `data` and throws `ApiError(status, message)` when `success` is false or the body isn't JSON.

## Pagination

List endpoints take `page` (0-based) and `size` query params and return:

```json
{
  "page": { "content": [], "totalElements": 0, "totalPages": 0, "size": 10, "number": 0, "numberOfElements": 0, "first": true, "last": true, "empty": true },
  "activeCount": 0,
  "inActiveCount": 0
}
```

Types: `Page<T>` / `PagedResult<T>` in `lib/types.ts`. Optional list params: `query`, `active`, `sortBy`, `sortDir`, `ignoreCaseSort`.

Some list endpoints answer an empty result with an error envelope instead of an empty page. Reads treat any non-401 `ApiError` as "no rows" (see `lib/users/api.ts`).

## Auth

Auth is JWT in two HttpOnly cookies, `access_token` and `refresh_token`. The API sets them via `Set-Cookie` on login/refresh; the app re-sets them as its own first-party cookies (`lib/auth/cookies.ts`) and forwards them as a `Cookie` header on every API call.

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| POST | `/auth/login` | `{ email, password }` | `AuthUserPayload` + auth cookies |
| POST | `/auth/refresh` | — (cookies) | new auth cookies |
| GET | `/auth/me` | — | `AuthUserPayload` |
| POST | `/auth/logout` | — | — |
| POST | `/auth/change-password` | `{ appUserId, currentPassword, newPassword, confirmPassword }` | — |

`AuthUserPayload = { appUserId, email, role: { id, name, role, system }, isNew }`. `role.role` is a string like `ROLE_ADMIN`; `lib/auth/roles.ts` maps it to an app role (`USER` | `ADMIN`).

On a 401 the client calls `/auth/refresh` once and replays the request once. If that fails, the cookies are cleared and the user is treated as signed out.

## Users (admin)

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/appUser/get-all` | paginated, `PagedResult<AppUser>` |
| POST | `/appUser/save` | `{ id?, email, roleId, password? }`: creates without `id`, updates with it |
| PUT | `/appUser/activate-status/{id}` | toggles active/inactive |
| DELETE | `/appUser/delete/{id}` | |
| PATCH | `/appUser/change-new-flag/{id}` | clears `isNew` |

## Roles

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/roles?page=0&size=100` | paginated, `PagedResult<Role>` |

## Files

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/files/upload` | multipart `file` (image), returns the URL (string or `{ url }`) |
| POST | `/files/upload-pdf` | multipart `file` (pdf/doc/docx), same return shape |

Uploaded media is served from `<API origin>/uploads/**`; `next.config.ts` allows that path for `next/image`.

## Gaps

Things the frontend needs that the contract doesn't have yet. Don't invent endpoints for these; stub the action and note it here.

1. **Sign-in**: the app has no login or registration pages. `/auth/login` is unused, and `/dashboard`, `/admin` and `/account` redirect signed-out visitors to the home page.
2. **Profile**: no endpoint to read/update the signed-in user's profile. `/account` shows session details read-only.
3. **Blog**: no endpoints for posts or categories. `/blogs` reads placeholder posts from `lib/blog/content.ts` and filters them on the client. There are no article pages yet.
4. **Plans**: no endpoint for plans or prices. `/pricing` reads `lib/pricing/content.ts`.
5. **Contact**: no enquiry or demo-request endpoint. Contact and Get Started links open WhatsApp (`SITE.contact.whatsappUrl`).
