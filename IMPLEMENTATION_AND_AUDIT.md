# Implementation and Audit Report

## Features Implemented

### [Docker] Production Container Setup

- Added `Dockerfile`, `.dockerignore`, and `docker-compose.yml` for a production Next.js container.
- Enabled `output: "standalone"` in `next.config.ts`, then copied `.next/standalone`, `.next/static`, and `public` into the runtime image.
- `docker-compose.yml` passes Firebase and Google Maps values as both build args and runtime environment variables. Local builds use non-empty demo defaults when variables are missing, but production deployments should provide real values:
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`
  - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- No Firebase Admin service account is required in the Docker image because the current app uses Firebase client Auth, Storage, and Data Connect SDKs.

Run locally:

```bash
docker compose build
docker compose up
```

Then open `http://localhost:3000`.

### [Sample Listings] Frontend Demo Fallback

- Added `lib/sample-listings.ts` with six UUID-shaped Bengaluru premium listings, coordinates, images, detail content, and owner contact data.
- The home feed and search page now use sample listings only when the approved listing query returns an empty list.
- Demo detail pages are supported directly, for example:

```text
/property/11111111-1111-4111-8111-111111111111
```

- Demo properties are marked with `isDemo`, cannot be shortlisted, and do not write lead records to Data Connect.
- The old seed route is now an explicit disabled endpoint returning HTTP `410`; sample data lives in `lib/sample-listings.ts`.

### [Admin Panel] Listing Form and Moderation Fixes

- Replaced the admin add form's manual string parsing with `react-hook-form` and `zod`.
- Reused `UploadZone` for admin image upload.
- Hardened uploads with auth checks, file type checks, max file size, max file count, safer filenames, file input reset, disabled states, and surfaced upload errors.
- Added dependency-free toast notifications in `components/ui/toast.tsx` and wired them through `components/providers.tsx`.
- Added `GetCurrentUser` Data Connect query and updated `AdminGuard` to require `User.isAdmin === true`.
- Protected `ListPendingProperties`, `ApproveProperty`, and `RejectProperty` with redacted Data Connect admin checks.
- Regenerated the Data Connect TypeScript SDK.
- Fixed moderation/listing rows so missing images render an inline fallback instead of referencing a missing `/placeholder.jpg`.
- Fixed the map info window to use DOM text nodes instead of interpolated HTML.

## Architectural Audit Findings

### Fixed During This Pass

- **Client-only admin authorization:** Previously any signed-in user could view the admin UI. The UI now checks `User.isAdmin`, and Data Connect moderation operations also enforce admin status.
- **Admin add form accepted invalid numeric fields:** `parseInt` / `parseFloat` could submit `NaN`. The admin form now uses zod coercion and validation.
- **Image upload edge cases:** Upload failures, non-image files, oversized files, repeated input selections, and missing auth are handled.
- **Broken seed route:** `app/api/seed/route.ts` was a stub with invalid imports and no route export. It now returns a clear disabled response.
- **Map popup injection risk:** Google Maps info window content no longer interpolates listing text into raw HTML.

### Remaining Items Needing Attention

- **Firebase Storage rules are not present in this repo.** Add rules before production uploads are enabled:

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.uid == userId
        && request.resource.size < 8 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

- **Firestore is mentioned in project context but no Firestore usage or rules were found.** Current listing data flows through Firebase Data Connect. If Firestore is added later, create explicit rules and indexes instead of relying on default project behavior.
- **Google Maps script loading has no visible error state.** Add `script.onerror` handling so users see a map configuration error instead of a permanent loading message:

```ts
script.onerror = () => {
  setMapError("Map failed to load. Check the Google Maps API key and network access.");
};
```

- **Data Connect compile requires authenticated Google credentials.** SDK generation succeeded, but `dataconnect:compile` failed locally because Application Default Credentials were unavailable. Run this in an authenticated Firebase environment:

```bash
npx -y firebase-tools@latest login
npx -y firebase-tools@latest dataconnect:compile
```

- **Moderation mutations rely on `User.isAdmin`.** Ensure admin profiles are provisioned through a trusted process; do not let users self-edit `isAdmin`.

## Verification

- `npm run lint` passed.
- `npm run build` passed after allowing network access for Google Fonts.
- `npx -y firebase-tools@latest dataconnect:sdk:generate` passed.
- `npx -y firebase-tools@latest dataconnect:compile` could not complete without Google Application Default Credentials.
- `npx playwright test` passed: 12 tests across Chromium and Mobile Safari.
- `docker compose build` passed.
- `docker compose up -d` passed, and `http://localhost:3000` returned HTTP 200.
- Added Playwright coverage for protected admin/add access, disabled seed endpoint, and demo listing detail rendering.
