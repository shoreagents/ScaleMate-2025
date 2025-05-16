### [2024-06-10] Export as PDF Button Restyle & Backup
- **What:** Created a full backup of `src/pages/role-builder/components/PreviewBlueprint.tsx` as `PreviewBlueprint.tsx.backup` before making any changes. Updated the Export as PDF button to match the SecondaryButton style from FormSection.tsx (background color, text color, padding, border radius, font weight, flex display, icon alignment, and hover effect).
- **Why:** To ensure UI consistency and align with design standards per user request. Backup created for recoverability per .cursorrules.md.
- **Files:**
  - `src/pages/role-builder/components/PreviewBlueprint.tsx` (modified)
  - `src/pages/role-builder/components/PreviewBlueprint.tsx.backup` (backup)
- **Result:** Button now visually matches the SecondaryButton. Backup safely stored. No errors encountered.

## [REMOVED] Rate Limiting Middleware and Upstash Dependencies - [DATE]

- Removed all rate limiting logic and Upstash Redis integration from `src/middleware.ts`.
- Middleware now simply passes all requests through.
- Uninstalled `@upstash/ratelimit` and `@upstash/redis` packages from dependencies.
- Created a backup of the original middleware as `src/middleware.ts.backup` before making changes.
- Reason: Project uses Supabase for backend; Redis/Upstash was only used for rate limiting, which is no longer required. 