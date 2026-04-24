# Overnight 3 — Handy Owl

Done while you slept. Nothing is committed from my side (sandbox mount went stale on `lib/guides.js` again — committing from there would have deleted 800 lines of guide content). Windows git sees the true state; commit from your terminal when you're back.

---

## First thing in the morning

```
cd C:\Users\andre\Desktop\Handy Owl
git status
git diff --stat
```

You should see:

**New files:**
- `middleware.js`
- `prisma/migrations/20260422020000_add_referral_tracking/migration.sql`
- `app/api/guides/progress/route.js`
- `OVERNIGHT3.md` (this file)

**Modified (real changes I made):**
- `prisma/schema.prisma` — added `referredBy`, `referredAt`, `completedStepsCsv` columns
- `app/api/auth/signup/route.js` — reads referral cookie at signup
- `app/api/auth/[...nextauth]/route.js` — `createUser` event reads referral cookie for Google signups
- `app/guides/[slug]/GuideDetail.jsx` — rewrite: uses real field names, wires up progress persistence, handles missing video
- `components/GuideCard.jsx` — fixed field references

**Modified (likely CRLF noise, ignore or sweep up):**
- A bunch of other files that you didn't change — Windows git keeps flagging LF-vs-CRLF on files I wrote previously. Safe to include or ignore.

---

## What got done

### 1. Creator referral tracking (MVP complete)

The full pipeline from `?ref=fix-it-rick` URL → cookie → User.referredBy is in place. When a creator shares `https://handyowl.net/?ref=fix-it-rick` and someone signs up from that link, their User row gets `referredBy: "fix-it-rick"` and `referredAt` set. From there, calculating creator earnings is a Postgres query grouping subscription revenue by `referredBy`.

**Implementation:**
- `middleware.js` at project root: intercepts every page request, pulls `ref` query param, validates it's a clean slug (`/^[a-z0-9-]{2,48}$/`), writes it to an httpOnly cookie `handy_owl_ref` with 30-day TTL.
- `app/api/auth/signup/route.js`: on email/password signup, reads the cookie and persists the slug into `User.referredBy` + sets `referredAt` to now.
- `app/api/auth/[...nextauth]/route.js`: added a NextAuth `events.createUser` handler that does the same for Google OAuth signups (the Prisma adapter creates the user; this event runs right after and updates the referral columns).

**Schema:**
- `User.referredBy` (String, nullable, indexed)
- `User.referredAt` (DateTime, nullable)

**How to test after migration:**
1. Visit `https://handyowl.vercel.app/?ref=test-creator` in an incognito window
2. Sign up for a new account
3. Check Supabase User table — the row should have `referredBy: test-creator`, `referredAt: <timestamp>`

**How to query creator earnings (once real revenue is flowing):**
```sql
-- Count of active premium users attributed to each creator
SELECT "referredBy", COUNT(*) as subscribers
FROM "User"
WHERE "plan" = 'PREMIUM' AND "referredBy" IS NOT NULL
GROUP BY "referredBy"
ORDER BY subscribers DESC;
```

For dollar amounts, you'd need to cross-reference Stripe subscription data — can build a proper reporting query when needed.

### 2. Per-user guide progress tracking

The existing progress UI in `GuideDetail.jsx` was local-state only — close the tab and progress was gone. Now it persists to the DB.

- `POST /api/guides/progress` — takes `{ slug, completedSteps: [0, 2, 3], totalSteps: 5 }`, validates slug against the guides catalog, sanitizes step indices, upserts into `GuideProgress` table. Returns normalized counts.
- `GET /api/guides/progress?slug=<slug>` — returns the current completion state for the current user.
- `GuideDetail.jsx` now loads progress on mount if the user is authenticated, and saves with a 500ms debounce on every checkbox click. Shows "Progress saved" indicator. If the user is not signed in, shows a "Sign in to save your progress across visits" CTA instead.

**Schema:**
- `GuideProgress.completedStepsCsv` (String, default "") — CSV of completed step indices. Simple encoding; no join table needed. Migrate to a JSON column if per-step metadata is ever needed.
- Added index on `(userId, updatedAt)` for fast "continue where you left off" lookups on the dashboard.

### 3. Fixed critical rendering bugs in the guide pages

Discovered while building progress tracking: `GuideCard.jsx` and `GuideDetail.jsx` were referencing field names that don't exist on the guide data (`guide.time` when it's `guide.duration`, `guide.categoryName` when there's only `guide.category`, `guide.videoId` when there isn't one, `guide.creatorName` when it's `guide.creator.name`, etc.). This means every guide card on the landing page and every guide detail page was rendering with missing fields in production.

**Fixed in both files:**
- `guide.time` → `guide.duration`
- `guide.ratingCount` → `guide.reviews`
- `guide.categoryName` / `guide.categoryIcon` → looked up from the `categories` array by slug
- `guide.creatorName` / `guide.creatorSubs` → `guide.creator.name` / `guide.creator.subscribers`
- `guide.savings` → computed as `contractorCost - diyCost`
- `guide.videoId` → extracted from `guide.creator.youtube` URL with a helper; video section is hidden entirely when there's no real URL (previously would render an iframe pointed at the wrong URL)
- Removed duplicate `<Navbar />` and `<Footer />` — these are already in the root `app/layout.js`, so guide detail pages were rendering two copies of each

### 4. Schema migration file ready to run

`prisma/migrations/20260422020000_add_referral_tracking/migration.sql` is pre-written. When you run `npx prisma migrate dev` (or `npx prisma migrate deploy` in production), Prisma applies the SQL to Supabase.

Contents:
```sql
ALTER TABLE "User" ADD COLUMN "referredBy" TEXT;
ALTER TABLE "User" ADD COLUMN "referredAt" TIMESTAMP(3);
CREATE INDEX "User_referredBy_idx" ON "User"("referredBy");
ALTER TABLE "GuideProgress" ADD COLUMN "completedStepsCsv" TEXT DEFAULT '';
CREATE INDEX "GuideProgress_userId_updatedAt_idx" ON "GuideProgress"("userId", "updatedAt");
```

All additive — nothing destructive. Safe to run against production.

---

## What you need to do in the morning

**1. Apply the database migration.** From your Windows terminal in the project folder:

```
npx prisma migrate deploy
```

`migrate deploy` is the production-safe variant — it applies pending migrations without prompting or generating shadow databases. Takes a few seconds. Verify in Supabase's Table Editor that the `User` table now has `referredBy` and `referredAt` columns, and `GuideProgress` has `completedStepsCsv`.

If you prefer the dev variant (same effect, plus regenerates the Prisma client):

```
npx prisma migrate dev
```

**2. Commit and push.**

```
git add -A
git commit -m "Overnight 3: referral tracking, progress persistence, guide page bugfixes"
git push
```

`git add -A` will sweep up the CRLF normalization noise along with the real changes. That's fine — it just means your working tree is clean afterwards.

Push will trigger a Vercel deploy. Wait for it to turn green (~2 min).

**3. Verify in production.**

- `https://handyowl.vercel.app/guides` — guide cards should now show category names (e.g. "Plumbing") and correct durations. Previously these were blank/broken.
- Click any guide — the detail page should render properly. Breadcrumb, header, steps list, sidebar with savings calculation. No duplicate navbar.
- Sign in, check a step, close the tab, come back to the same guide. Previously-checked steps should still be checked.
- Visit `https://handyowl.vercel.app/?ref=test-creator` in an incognito window, sign up. In Supabase's User table, the new user's `referredBy` should be `test-creator`.

---

## Known limitations / decisions

**Dashboard "Featured this week" not yet wired to real progress.** The dashboard still shows the hardcoded editor's-pick card rather than dynamically pointing to the user's in-progress guide. The infrastructure is in place — the `GuideProgress` table gets populated correctly now — but wiring the dashboard to query it is a follow-up. Small piece of work (~30 min); deferred to keep the overnight scope focused.

**Video embeds hidden when no real URL.** All 42 guides currently have placeholder `creator.youtube: 'https://youtube.com'` values. The video section in `GuideDetail.jsx` now detects this and hides the iframe entirely rather than rendering a broken embed. When real creators come on, their actual YouTube URLs replace the placeholder and the video automatically appears.

**Progress saves are debounced, not synchronous.** If a user rapidly toggles a checkbox many times, we save 500ms after the last toggle. If they close the tab within 500ms, that last change might not persist. Acceptable tradeoff for not hammering the DB.

**Cookie cleared after email/password signup, not after Google OAuth signup.** The `createUser` event in NextAuth doesn't have access to the response object, so we can't clear the cookie from there. The cookie expires on its own 30-day TTL, which is fine because attribution only fires once per user (the `createUser` event runs exactly once per user lifetime).

---

## Commit grouping (if you want clean history)

The one-fat-commit path above is fine. If you prefer logical splits:

```
git add middleware.js prisma/schema.prisma prisma/migrations/20260422020000_add_referral_tracking app/api/auth/signup/route.js "app/api/auth/[...nextauth]/route.js"
git commit -m "Add creator referral attribution (User.referredBy + middleware + signup persistence)"

git add app/api/guides/progress app/guides/[slug]/GuideDetail.jsx
git commit -m "Add per-user guide progress tracking"

git add components/GuideCard.jsx
git commit -m "Fix GuideCard to use real field names (duration, category lookup)"

git add OVERNIGHT3.md
git commit -m "Overnight 3 notes"
```

(The rest of the "modified" files are CRLF normalization and can go in a single "normalize line endings" commit, or just be folded into any of the above via `git add -A`.)

---

## Gotcha I want to flag explicitly

My sandbox's view of `lib/guides.js` is stuck at the older 325-line version while the Windows file has the full 1158 lines (42 guides). This is a mount-sync quirk we've hit before. The Windows file is correct; Windows git sees it correctly. If you run `git diff --stat lib/guides.js` and see a reasonable number of lines changed (or zero, if my changes didn't touch that file), you're fine. If you see "-832 lines," something is very wrong — don't commit, and let's debug together.

I explicitly did NOT commit from the sandbox this session to avoid any chance of committing the truncated view and losing guide content.
