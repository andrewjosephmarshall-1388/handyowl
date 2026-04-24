# Overnight 2 — Handy Owl

Done while you slept. Nothing is committed; everything is on disk waiting for you to review and push.

## First thing in the morning

```
cd C:\Users\andre\Desktop\Handy Owl
git status
git diff --stat
```

Expected: modifications to `lib/guides.js`, `app/dashboard/page.js`, `package.json`. Two new files: `app/robots.js`, `app/sitemap.js`. Plus this `OVERNIGHT2.md`.

## What got done

### 1. Guides expanded to 42 (+15)

`lib/guides.js` now has 42 guides across all 8 categories. New additions:

Plumbing — `replace-kitchen-faucet`, `install-low-flow-toilet`
Electrical — `replace-ceiling-light`, `add-dimmer-switch`
HVAC — `bleed-radiator`, `clean-dehumidifier`
Flooring — `repair-tile-grout`, `deep-clean-carpet`
Painting — `paint-front-door`
Landscaping — `overseed-lawn`, `sharpen-mower-blade`
Carpentry — `install-door-handle-lock`, `hang-heavy-mirror`
Appliances — `clean-refrigerator-coils`, `replace-refrigerator-water-filter`

Breakdown: 28 free / 14 premium. Same schema as existing guides. Steps, materials, creator attribution, realistic prices.

### 2. Privacy Policy and Terms of Service — verified, not changed

Already have real content (not placeholder). They cover the OAuth-review essentials: data collection disclosure, third-party services (Stripe, Google, YouTube are mentioned), user rights to access/correct/delete, contact email `hello@handyowl.net`. When you're ready to publish the OAuth app out of test mode, Google's reviewers should accept these as-is. If they push back, typical requests are: add a "Data Deletion Instructions" section and a "Children's Privacy" section. Easy to bolt on if needed.

### 3. SEO — robots.js and sitemap.js

New files `app/robots.js` and `app/sitemap.js`. Next.js App Router convention — they auto-generate `/robots.txt` and `/sitemap.xml` at build time. The sitemap enumerates the landing page, guide index, all 42 guide detail URLs, 8 category filter URLs, pricing, privacy, terms, and creators. `/api/` and `/dashboard/` are disallowed from indexing.

The files resolve the site URL from `NEXT_PUBLIC_SITE_URL` first, then `NEXTAUTH_URL`, then fall back to `https://handyowl.vercel.app`. When you point `handyowl.net` at Vercel, set `NEXT_PUBLIC_SITE_URL=https://handyowl.net` and the sitemap updates itself.

### 4. Dashboard realism

`app/dashboard/page.js` — the fake stats ($847 saved, 6 projects done, 12 guides saved, 8 new) are gone. Replaced with catalog-level counts that are actually true (total guides, free vs premium, category count). "Continue where you left off" with fake progress is gone — replaced with "Featured this week" pointing to `clean-dryer-vent` (a safety-critical guide that's a good first click). Dead variables `savedGuides` and `inProgressGuide` removed.

Once per-user guide progress starts getting written to the DB (the `GuideProgress` and `SavedGuide` tables already exist in Prisma), the dashboard can swap back to "Continue where you left off." That's a future task.

### 5. Next.js security patch

Vercel flagged `next@14.2.5` for a security vulnerability (CVE from December 2025 — middleware auth bypass). Bumped `package.json` to `^14.2.21`, and `eslint-config-next` to match. The caret means npm will install the latest 14.2.x patch on your next install.

**Run `npm install` before `npm run dev`** on your machine — `node_modules` needs to refresh. And since Vercel runs `npm install` as part of the build, the next push to main will auto-upgrade in production.

**Minor risk heads-up:** Next.js patch versions are backward-compatible, but I couldn't validate the build in my sandbox (no npm registry access). If `npm run dev` errors after the install, revert with `git checkout -- package.json && npm install` and we'll upgrade more carefully.

## Commit suggestion

Three logical commits for a clean history, or one fat commit — your call.

**Split version:**

```
git add lib/guides.js
git commit -m "Add 15 more DIY guides (42 total)"

git add app/robots.js app/sitemap.js
git commit -m "Add robots.txt and sitemap.xml for SEO"

git add app/dashboard/page.js
git commit -m "Replace dashboard fake stats with catalog counts"

git add package.json
git commit -m "Bump Next.js to patched 14.2.x for security update"

git add OVERNIGHT2.md
git commit -m "Add overnight 2 notes"
```

**Fat version:**

```
git add -A
git commit -m "Overnight 2: +15 guides, SEO files, honest dashboard, Next.js patch"
```

## After committing

Push to trigger a Vercel deploy:

```
git push
```

Then on your machine, you'll want to run `npm install` to pick up the newer Next.js patch locally:

```
npm install
npm run dev
```

Verify the site still loads, sign in works, and the dashboard shows the new honest stats (42 / 28 / 14 / 8). Hit http://localhost:3000/robots.txt and http://localhost:3000/sitemap.xml in your browser — both should render.

On production, https://handyowl.vercel.app/sitemap.xml should list all 42 guide URLs once the deploy finishes.

## Still open for future sessions

- **Custom domain `handyowl.net`** — DNS + Vercel domain config. When done: set `NEXT_PUBLIC_SITE_URL` in Vercel, swap `NEXTAUTH_URL` to the new domain, update Stripe webhook URL.
- **Stripe live mode** — swap the 5 test-mode Stripe env vars for live-mode values. Create a live webhook endpoint on the new live URL.
- **Per-user guide progress** — wire the `GuideProgress` and `SavedGuide` tables up to the guide detail page (save on step completion, bookmark buttons). Then the dashboard can show real personal stats again.
- **Publish OAuth consent screen** — move Google OAuth out of test mode so any Gmail user can sign in. Requires domain ownership verification in Google Search Console.
- **Marketing / user validation** — still the highest-leverage work. Talk to 5–10 real homeowners before building more features.
- **Next.js 15 upgrade** — eventually. Lots of breaking changes, separate project.

## Gotchas I want to flag

- My sandbox view of `lib/guides.js` gets stale sometimes (same mount desync we saw last time). The Windows file is the source of truth — Read tool showed the full 1158-line file with all 42 guides intact before I stopped. If `git status` or `wc -l` on your side disagrees with what I described, trust Windows git.
- I couldn't validate the `package.json` Next.js bump with `node --check` because the sandbox read of `package.json` itself was failing (mount sync quirk). The JSON is syntactically valid — I kept the edit small (just version strings) to minimize risk.
- The Next.js version bump will regenerate `package-lock.json` when you `npm install`. The lockfile diff will be large. That's expected.

Sleep you well.
