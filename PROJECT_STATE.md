# Handy Owl — Project State

**Living document.** Purpose: bring a future Claude session (or any collaborator) up to speed on Handy Owl in 15 minutes. Update at the end of meaningful work sessions.

Last updated: **2026-04-25** (Google OAuth consent screen published)

---

## For a new Claude session — start here

You are taking over context on an in-progress project. Andrew Marshall (@andrewjosephmarshall-1388) is the founder and non-technical (self-described); you've done most of the coding so far. Read this file first, then skim the others listed in "Canonical docs" below, then ask Andrew what he wants to work on today.

**Core facts to internalize before responding:**

1. Handy Owl is **live in production** at https://handyowl.net. Not hypothetical. Real site, real deploys.
2. Everything runs end-to-end today: signup, Google OAuth, email/password login, Stripe test-mode paid subscriptions (monthly and yearly), plan switching via Stripe Billing Portal, cancellation, webhooks, DB sync.
3. The business is **pre-revenue**. No real customers yet. Stripe is still in test mode. The `.vercel.app` URL hasn't been swapped for `handyowl.net` yet.
4. Andrew's working style: he prefers to do UI clicks himself on third-party dashboards (Stripe, Google Cloud, Supabase), but appreciates you driving where you can (Vercel env vars via Chrome MCP, code edits). He pastes screenshots/PDFs when he needs you to see what's on his screen.

**Canonical docs (read in this order):**

1. This file (`PROJECT_STATE.md`) — top-level summary
2. `README.md` — project overview and tech stack (somewhat out of date, but structurally fine)
3. `business_model.md` — pricing, revenue model, target user
4. `docs/creator-partnership.md` — creator outreach strategy and rev-share terms
5. `OVERNIGHT.md` — changelog from the first overnight session (initial DB wiring + UX)
6. `OVERNIGHT2.md` — changelog from the second overnight session (content + SEO + dashboard polish)
7. `RESUME.md` — original scaffolding handoff (mostly historical now)
8. `prisma/schema.prisma` — database schema
9. `lib/guides.js` — all guide content (single source of truth)
10. `.env.local.example` — what env vars exist and what they do

`git log --oneline` is always a fast way to see what commits have landed.

---

## What Handy Owl is

A freemium DIY home-maintenance education site. Homeowners read structured step-by-step guides that embed expert creator videos from YouTube. Target audience: budget-conscious homeowners who'd rather learn to fix/maintain things than pay contractors.

**Product structure:**
- **Free tier:** 10 guides/month, basic instructions, limited tools
- **Premium tier ($7.99/mo or $74/yr):** unlimited access to all 42 guides, full cost calculators, interactive checklists, downloadable materials lists, expert videos (eventually), priority support

**Revenue streams (in order of priority):**
1. Subscription revenue (primary)
2. Affiliate commissions on materials recommended in guides
3. Creator revenue share passthrough (Andrew's cut of subscription revenue attributed to a creator's videos is 30% for 12 months — see `docs/creator-partnership.md`)

---

## Current operational state

### Live URLs

- **Production site:** https://handyowl.net  (also accessible at https://handyowl.vercel.app — same deployment)
- **GitHub repo:** https://github.com/andrewjosephmarshall-1388/handyowl
- **Supabase project:** `lnxszamfwmfldjhyibji`
- **Stripe account:** `acct_1TOKiCK0HvkkcFap` (live mode active as of 2026-04-24)
- **Google Cloud project:** `handy-owl` (OAuth published / In production as of 2026-04-25)
- **Domain registrar:** GoDaddy. DNS: A record `@ → 216.198.79.1` points the apex at Vercel. CNAME `www → handyowl.net.` was already there and follows the apex implicitly.

### What works end-to-end (verified by Andrew)

- Landing page renders on production
- Sign up with email + password (bcrypt hashed, stored in Supabase User table)
- Sign up with Google OAuth
- Log in both ways
- Sign out (navbar + settings page)
- Browse 42 guides across 8 categories
- Paid subscription (TEST mode verified, LIVE mode configured): Pricing page → Upgrade → Stripe Checkout → card → redirect to success page → webhook fires → User.plan flips to PREMIUM in DB
- Plan switching: Dashboard → Manage Subscription → Stripe Billing Portal → Update Plan (monthly ↔ yearly) → webhook fires → DB updates
- Cancellation: via Stripe Dashboard admin action (immediate) → webhook fires → User.plan flips to FREE, subscriptionStatus to "canceled"

### Live Stripe configured but not yet exercised by a real customer

All 5 live env vars are set in Vercel (sk_live_, pk_live_, live price IDs for monthly+yearly, live whsec_). Live webhook endpoint is registered at `https://handyowl.net/api/stripe/webhook`. Live Customer Portal is configured. The integration uses the identical code path as the test-mode flow that's been verified end-to-end. Andrew's own self-test charges were blocked by Stripe's account-level fraud protection — a known pattern for new accounts self-charging. Real customer transactions are expected to flow normally; the block is between Stripe's risk system and the cardholder pattern (self-charge from new account), not anything wrong with the integration. After the first 2-3 legitimate real-customer transactions, Stripe's account warmup will neutralize these blocks.

### Verified working as of overnight 3 (2026-04-24)

- **Creator referral attribution.** Visiting `https://handyowl.vercel.app/?ref=<creator-slug>` writes `handy_owl_ref` cookie via `middleware.js`. On signup, `User.referredBy` and `User.referredAt` get populated. Tested in production with `?ref=test-creator-2` — Supabase row confirmed.
- **Per-user guide progress persistence.** `GuideProgress.completedStepsCsv` saves on 500ms debounce, restores on next visit. API: `/api/guides/progress`.
- **Guide card and guide detail page rendering.** Both fixed (used to reference fields that didn't exist on the guide data). Cards now show category name + duration; detail pages render without duplicate navbar/footer; sidebar shows correct savings calc; video section hidden when creator's youtube URL is a placeholder.

### Guide content

- 42 guides in `lib/guides.js` across 8 categories (plumbing, electrical, hvac, flooring, painting, landscaping, carpentry, appliances)
- 28 free / 14 premium split
- Each guide has: slug, title, description, category, duration, cost, difficulty, rating, reviews count, premium flag, contractorCost, diyCost, creator info, steps[], materials[]
- Creator attribution is hardcoded in each guide (e.g., "Fix It With Rick", "HVAC Guide", "Appliance Geek"). These are placeholder creators — **no real creators have agreed to the partnership yet**. Replace as real creators come on board.

---

## Technical architecture

### Stack

- **Framework:** Next.js 14.2.x (App Router), React 18, Node runtime
- **Styling:** Tailwind CSS
- **Fonts:** Fraunces (display) + Inter (body)
- **Auth:** NextAuth.js v4 with JWT sessions, Google OAuth provider + Credentials provider
- **Database:** Supabase Postgres
- **ORM:** Prisma 5 with the Prisma Adapter for NextAuth
- **Payments:** Stripe Checkout (for signups) + Stripe Billing Portal (for plan changes) + webhook at `/api/stripe/webhook`
- **Hosting:** Vercel (auto-deploys on push to `main`)
- **SEO:** `app/robots.js` and `app/sitemap.js` auto-generate `/robots.txt` and `/sitemap.xml` at build time

### Data flow (paid subscription)

1. User clicks "Upgrade" on `/pricing` → client POST to `/api/stripe/checkout`
2. Checkout route checks auth, creates Stripe Checkout Session with user metadata
3. User completes payment on Stripe-hosted page
4. Stripe fires `checkout.session.completed` to `/api/stripe/webhook`
5. Webhook handler verifies signature, looks up user by metadata or Stripe customer ID, updates User.plan = PREMIUM, sets stripe IDs and subscription status
6. User redirects back to `/dashboard/upgrade-success`
7. Next page load, JWT refresh in auth route pulls updated plan from DB → session now reflects PREMIUM

### Key files

| File | Purpose |
|------|---------|
| `app/api/auth/[...nextauth]/route.js` | NextAuth config, credentials authorize, JWT/session callbacks |
| `app/api/auth/signup/route.js` | Email/password signup (bcrypt) |
| `app/api/stripe/checkout/route.js` | Creates Stripe Checkout session; requires auth; blocks double-subscribe |
| `app/api/stripe/portal/route.js` | Creates Stripe Billing Portal session for Premium users |
| `app/api/stripe/webhook/route.js` | Handles Stripe events, updates DB |
| `app/api/email-capture/route.js` | Newsletter signup endpoint (writes to EmailCapture table) |
| `app/api/guides/route.js` | Guides list API (currently just returns from lib/guides.js) |
| `lib/prisma.js` | Prisma singleton |
| `lib/stripe.js` | Stripe singleton |
| `lib/guides.js` | All guide content |
| `prisma/schema.prisma` | DB schema: User, Account, Session, VerificationToken, GuideProgress, SavedGuide, EmailCapture, Plan enum |
| `components/PremiumPricingCTA.jsx` | Plan-aware pricing card with functional monthly/yearly toggle |
| `components/Navbar.jsx` | Auth-aware navbar (shows Dashboard + Sign out when logged in) |
| `components/ManageSubscriptionButton.jsx` | Posts to /api/stripe/portal and redirects |
| `components/UpgradeButton.jsx` | Posts to /api/stripe/checkout; handles 401 (→login) and 409 (→settings) |

---

## Key decisions + rationale

**$7.99/mo and $74/yr pricing.** Below Netflix/Skillshare to remove "is it worth it?" hesitation. Yearly saves 23% as a psychological anchor. See `business_model.md` for full reasoning.

**Supabase Session Pooler, not direct connection.** Supabase's direct Postgres host (`db.[ref].supabase.co`) is IPv6-only on the free tier, which fails from most home networks. The Session Pooler (`aws-1-us-east-2.pooler.supabase.com:5432`) is IPv4-compatible and works with Prisma migrations. If you ever update `DATABASE_URL`, use the Session Pooler form, not the direct connection.

**URL-encode special characters in DATABASE_URL.** The `!` in Andrew's Supabase password must be URL-encoded as `%21` in the connection string, or the URL parser chokes.

**NextAuth JWT strategy, not database sessions.** Simpler deployment, lower DB load. The JWT callback re-fetches the user's plan from DB on every request so webhook-driven upgrades flow into the session without re-login. See `app/api/auth/[...nextauth]/route.js`.

**`prisma generate` in the build script.** Vercel caches `node_modules`, which means Prisma's auto-generate hook doesn't run. We added `prisma generate && next build` to the build script and a `postinstall` script as belt-and-suspenders. Don't remove these.

**Single domain in auth redirects, not wildcards.** NEXTAUTH_URL is explicitly set to the full production URL (`https://handyowl.net`). The vercel.app URL still resolves to the same deployment but isn't the canonical one anywhere — Google OAuth's Authorized redirect URIs include the .net callback, Stripe Customer Portal is configured for .net, and the consent screen advertises .net.

**Rev share: 30% for 12 months per attributed subscriber, starting at $1K MRR.** Industry standard (matches Skillshare, Substack, most creator SaaS). See `docs/creator-partnership.md` for full terms.

**Stripe Billing Portal for plan changes, not custom in-app UI.** Plan switching with proration is a solved problem; Stripe does it for free. Our `/api/stripe/portal` route creates a session and redirects. Portal is configured in Stripe Dashboard → Settings → Billing → Customer Portal → must have "Customers can switch plans" enabled with both products added.

**Two separate Stripe products, not one product with two prices.** We have "Handy Owl Premium" monthly and "Handy Owl Premium" yearly as two separate products. Works fine for Checkout + Portal. Could consolidate into one product with two prices later if it matters (it doesn't right now).

**Cancel at end of period, not immediately.** Portal config is set to cancel at end of billing period. When a user cancels, `cancel_at_period_end: true` gets set and a `customer.subscription.updated` event fires. The user keeps PREMIUM access until the period actually ends, when `customer.subscription.deleted` finally flips them to FREE. This is what most customers expect.

**`stripeCustomerId` kept after cancellation.** So the user can re-subscribe without Stripe creating a duplicate customer record. `stripeSubscriptionId` gets nulled out on full cancellation.

**Guides stored in `lib/guides.js` (hardcoded), not in the database.** MVP simplicity. As volume grows or if we want per-guide analytics, migrate to a Guide table. GuideProgress and SavedGuide tables exist for user-specific tracking but aren't wired up yet.

---

## Known gotchas + workarounds

**LF/CRLF normalization on commit (Windows).** Andrew's git has `core.autocrlf = true`, which makes files look modified after Claude writes them (Claude writes LF; Windows git wants CRLF). These aren't real content changes. If `git status` shows a lot of "modified" files that you didn't touch, ignore them or include them in the commit — the diff is empty.

**Claude sandbox's Linux mount goes stale.** When Claude writes files via the Read/Write/Edit tools (which go through the Windows file bridge), the sandbox's Linux-side mount sometimes doesn't see the update for a while. Symptoms: `wc -l` shows an old size, `git status` misses changes, `node --check` reads stale content. The Windows file is the source of truth. If bash and Read disagree, trust Read.

**Claude sandbox can't reach the npm registry or GitHub.** Allowlist-based network blocks outbound calls to these. Consequences:
- Can't run `npm install` from the sandbox (Andrew must run it on Windows)
- Can't `git push` from the sandbox (Andrew must push from Windows)
- Can commit locally from the sandbox (doesn't need network), just can't publish

**Claude sandbox can't reach Stripe.** Financial-services domains are blocked for browser automation. Claude can't navigate to dashboard.stripe.com via Chrome MCP. Andrew drives all Stripe Dashboard changes; Claude guides and interprets screenshots.

**`ctrl+a` in Chrome MCP's `type` action doesn't trigger select-all.** It types the literal letter `a`. For clearing fields, use `triple_click` + `Backspace` instead, or click-then-select-manually. This burned us once with a stray `a` prefix on a Vercel env var.

**Vercel env vars have Shared (team-level) AND Project (project-level) scopes.** If the same variable exists in both with different values, unpredictable behavior results. We hit this once with `STRIPE_WEBHOOK_SECRET` — a stale team-level value was overriding the project-level fix. Convention: set variables at the **Project** level only. Delete any duplicates at the Shared level.

**Google OAuth redirect URIs must match exactly.** When NextAuth sends `https://handyowl.vercel.app/api/auth/callback/google`, Google will reject with `redirect_uri_mismatch` if that exact URL isn't in the Authorized redirect URIs list in Google Cloud Console. Check: APIs & Services → Credentials → the OAuth client → Authorized redirect URIs. The full list must include the exact URL for every environment (localhost:3000 for local, vercel.app for prod, and handyowl.net + www.handyowl.net once live).

**Authorized domains on the Google OAuth consent screen are different from Authorized redirect URIs.** Both need to be set. Consent screen's Authorized domains is "these domains are in use by our app" (just `vercel.app` or `handyowl.net`). OAuth client's Authorized redirect URIs is the exact callback URLs.

**Stripe's `trial_period_days: 0` is rejected.** Minimum is 1. Omit the field entirely to mean "no trial."

**Sensitive env vars in Vercel show `YOUR_SECRET_VALUE_GOES_HERE` when editing.** That's just the placeholder — the actual value is hidden for security. Typing a new value replaces the old one. If the field appears empty and you re-enter, you're not overwriting "garbage," you're setting a new value while the old value remains hidden.

---

## Credentials + access (what lives where)

Nothing in this file should contain actual secrets. Just pointers to where they live.

- **Production env vars:** Vercel project `handyowl` → Settings → Environment Variables → **Project** scope. Includes `DATABASE_URL`, all Stripe keys, Google OAuth credentials, NextAuth secret/URL.
- **Local dev env vars:** `.env.local` in project root (gitignored). Same variables as Vercel, with `NEXTAUTH_URL=http://localhost:3000`.
- **Stripe Dashboard:** dashboard.stripe.com (Test mode for dev, Live mode for future)
- **Google Cloud Console:** console.cloud.google.com/apis/credentials (project `handy-owl`)
- **Supabase:** supabase.com/dashboard/project/lnxszamfwmfldjhyibji
- **GitHub repo:** github.com/andrewjosephmarshall-1388/handyowl

---

## Open threads (in rough priority order)

1. **Wire dashboard "Continue where you left off" to real progress data.** Small follow-up (~30 min) now that `GuideProgress` is getting populated. Query the user's most-recently-updated in-progress guide; render it on the dashboard. Fall back to the current "Featured this week" card when the user has no progress yet.
2. **Customer validation.** Talk to 5-10 real homeowners (HVAC-adjacent or general) about whether they'd pay $7.99/mo for this. Pre-validates the business before sinking more dev time. Andrew should drive this; Claude can help draft interview scripts.
3. **Onboard real creators.** Use the outreach templates in `docs/creator-partnership.md`. Goal: 3-5 founding creators in first month. When real YouTube URLs replace the placeholder `creator.youtube: 'https://youtube.com'` values, the video embeds on guide detail pages will automatically appear.
4. **Creator earnings dashboard.** Once real referrals + real revenue exist, build a simple admin or creator-facing view that groups subscription revenue by `User.referredBy` and shows 30% cut per creator.
5. **Next.js 15 upgrade.** Larger project. Lots of breaking changes. Not urgent.

---

## How Andrew works (for future Claude sessions)

- Self-describes as "not good with coding." Don't assume technical knowledge; explain clicks and commands precisely.
- Will paste terminal output, PDFs of screenshots, URLs. Read them carefully — these are usually the signal for what's broken.
- Prefers you drive where automation exists (code edits, Chrome MCP for Vercel), and will click through third-party UIs (Stripe, Google Cloud, Supabase) himself with clear step-by-step guidance.
- Patient with back-and-forth debugging. Doesn't mind if something takes multiple iterations to land.
- Commits through his Windows terminal because the sandbox can't push. Commit locally via sandbox if helpful, but Andrew does the `git push`.
- Likes summaries at the end of major work sessions. Appreciates when you flag what's blocked on him vs what's ready.
- Email: andrew.joseph.marshall@gmail.com

---

## How to update this file

At the end of a work session that produced meaningful changes, edit this file in place. Specifically:

- Bump "Last updated" at the top
- If new features shipped, update "What works end-to-end"
- If new decisions were made, add to "Key decisions + rationale"
- If new gotchas were discovered, add to "Known gotchas + workarounds"
- If open threads were resolved, remove them; if new ones surfaced, add them
- If canonical docs were added or reorganized, update the list

Commit this file with the work it documents, not separately. Keeps the history coherent.

---

## Current session context (update when ending a session)

**Last session ended:** 2026-04-25 (Google OAuth published / In production).

**Google OAuth consent screen publishing (2026-04-25, this session):**
- Verified handyowl.net domain ownership in Google Search Console (DNS TXT record auto-detected, likely from prior Vercel/GoDaddy verification chain).
- Updated OAuth consent screen branding URLs from `handyowl.vercel.app/*` to `handyowl.net/*` (home, privacy, terms).
- Confirmed Data Access page shows zero non-sensitive, sensitive, or restricted scopes — app uses only baseline OIDC (openid/email/profile) which don't require declaration. No Google verification required.
- Published app from Testing → In production. Instant; no audit.
- Verified end-to-end with two non-test Gmail accounts (`affirmhomeinspections@gmail.com`, `tenantkit1@gmail.com`) — both signed in cleanly via Google OAuth, landed on dashboard, User rows in Supabase populated with `name` and `image` from Google profile.

**Last session ended:** 2026-04-24 (Stripe live mode active).

**Stripe live mode migration (2026-04-24, this session):**
- Activated Stripe account for live payments (Andrew completed business info flow)
- Copied products + portal config + webhook endpoint over from sandbox/test
- Captured live values: monthly price ID, yearly price ID, sk_live_, pk_live_, whsec_
- Updated all 5 Stripe env vars in Vercel via Chrome MCP
- Triggered production redeploy — green
- Live Customer Portal configured with plan switching + 4 customer-facing toggles
- Live webhook endpoint at `https://handyowl.net/api/stripe/webhook`
- Self-test real-card charges blocked by Stripe's account-level fraud protection (expected for new accounts self-charging). Skipped live verification on the basis that test-mode chain was already proven end-to-end.

**Custom domain migration (earlier 2026-04-24):**
- Added handyowl.net to Vercel project (apex-primary, no www redirect)
- Updated GoDaddy DNS: A record `@` → `216.198.79.1` (was pointing at GoDaddy WebsiteBuilder/Airo)
- Vercel auto-issued SSL within ~30 seconds of DNS resolving
- Updated Vercel env vars: NEXTAUTH_URL → `https://handyowl.net`, added NEXT_PUBLIC_SITE_URL → `https://handyowl.net`
- Updated Stripe webhook endpoint URL to `https://handyowl.net/api/stripe/webhook`
- Verified: landing page, robots.txt, sitemap.xml, email signup, Google OAuth, paid upgrade with webhook all pass on handyowl.net.

**Last session ended (overnight 3):** 2026-04-23.

**What happened this session:**
- Built creator referral attribution end-to-end: middleware, cookie, signup persistence for both email/password and Google OAuth paths. Schema migration ready to apply.
- Built per-user guide progress tracking: API route + debounced client-side save + restore on mount.
- Fixed latent rendering bugs in `GuideCard.jsx` and `GuideDetail.jsx` where the code referenced field names that didn't exist on the guide data. Removed duplicate Navbar/Footer from GuideDetail (root layout already provides them).
- Wrote `OVERNIGHT3.md` with the full rundown and the morning-checklist (run migration, commit, push, verify).

**What's waiting at session start for next time:**
- Nothing technical. The site is live in production at handyowl.net with all infrastructure operational and Stripe ready to take real money.
- The two doc updates this session (PROJECT_STATE.md edits) are uncommitted but harmless to leave.

**Next reasonable moves (Andrew's call):**
- **Customer validation** — talk to real homeowners. Highest-leverage non-coding work. See `docs/creator-partnership.md` for templates.
- **Creator outreach** — Andrew was searching for creators last session.
- **Publish Google OAuth consent screen** — moves OAuth out of test mode so any Gmail user can sign in.
- **Wire dashboard "Continue where you left off"** to `GuideProgress` queries — 30 min follow-up now that progress is being persisted.
- **Watch for first real customer transaction** — once 2-3 real customers transact successfully, Stripe's account-level fraud blocks should subside and self-charge testing will work.
