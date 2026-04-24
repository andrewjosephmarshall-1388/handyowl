# Handy Owl — Project State

**Living document.** Purpose: bring a future Claude session (or any collaborator) up to speed on Handy Owl in 15 minutes. Update at the end of meaningful work sessions.

Last updated: **2026-04-22**

---

## For a new Claude session — start here

You are taking over context on an in-progress project. Andrew Marshall (@andrewjosephmarshall-1388) is the founder and non-technical (self-described); you've done most of the coding so far. Read this file first, then skim the others listed in "Canonical docs" below, then ask Andrew what he wants to work on today.

**Core facts to internalize before responding:**

1. Handy Owl is **live in production** at https://handyowl.vercel.app. Not hypothetical. Real site, real deploys.
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

- **Production site:** https://handyowl.vercel.app
- **GitHub repo:** https://github.com/andrewjosephmarshall-1388/handyowl
- **Supabase project:** `lnxszamfwmfldjhyibji`
- **Stripe account:** `acct_1TOKiCK0HvkkcFap` (still in test mode)
- **Google Cloud project:** `handy-owl` (OAuth in testing mode, not yet published)

### What works end-to-end (verified by Andrew)

- Landing page renders on production
- Sign up with email + password (bcrypt hashed, stored in Supabase User table)
- Sign up with Google OAuth
- Log in both ways
- Sign out (navbar + settings page)
- Browse 42 guides across 8 categories
- Paid subscription: Pricing page → Upgrade → Stripe Checkout → test card `4242 4242 4242 4242` → redirect to success page → webhook fires → User.plan flips to PREMIUM in DB
- Plan switching: Dashboard → Manage Subscription → Stripe Billing Portal → Update Plan (monthly ↔ yearly) → webhook fires → DB updates
- Cancellation: via Stripe Dashboard admin action (immediate) → webhook fires → User.plan flips to FREE, subscriptionStatus to "canceled"

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

**Single domain in auth redirects, not wildcards.** NEXTAUTH_URL is explicitly set to the full production URL (currently `https://handyowl.vercel.app`). When we swap to `handyowl.net`, update this env var, add the new URL to Google OAuth's Authorized redirect URIs, and add it to the Stripe Customer Portal config.

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

1. **Point `handyowl.net` at Vercel.** DNS config + Vercel custom domain. When done: update `NEXTAUTH_URL` in Vercel, update Stripe webhook endpoint URL in Stripe Dashboard, update Google OAuth Authorized redirect URIs, update Stripe Customer Portal config if needed. `NEXT_PUBLIC_SITE_URL` env var can also be set so robots.txt/sitemap.xml reflect the new domain.
2. **Switch Stripe from test mode to live mode.** Create live products + prices, set up a live webhook endpoint, swap 5 Stripe env vars in Vercel (secret key, publishable key, price IDs for monthly+yearly, webhook secret). Stripe Customer Portal needs to be configured in live mode too (same setup as test mode was).
3. **Publish Google OAuth consent screen.** Moves OAuth out of test mode so any Gmail user can sign in (not just whitelisted test users). Requires verifying domain ownership in Google Search Console.
4. **Creator referral tracking.** ~3-4 hours of work. Add `User.referredBy` column, middleware to capture `?ref=` query param into cookie, signup flow tweak to persist it. Per `docs/creator-partnership.md`, this needs to be live before $1K MRR.
5. **Per-user guide progress tracking.** Wire the GuideProgress and SavedGuide tables to the guide detail pages. "Continue where you left off" on the dashboard can show real progress instead of the current "Featured this week" fallback.
6. **Customer validation.** Talk to 5-10 real homeowners (HVAC-adjacent or general) about whether they'd pay $7.99/mo for this. Pre-validates the business before sinking more dev time. Andrew should drive this; Claude can help draft interview scripts.
7. **Onboard real creators.** Use the outreach templates in `docs/creator-partnership.md`. Goal: 3-5 founding creators in first month.
8. **Next.js 15 upgrade.** Larger project. Lots of breaking changes. Not urgent.

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

**Last session ended:** 2026-04-22, around the time of this file being created.

**What happened this session:**
- Pushed overnight 2 work (15 new guides, robots/sitemap, honest dashboard, Next.js patch) to production
- Had strategic discussion about creator outreach, revenue share terms, and attribution
- Created `docs/creator-partnership.md` as canonical creator strategy reference (committed but not pushed at session end)
- Created this file (`PROJECT_STATE.md`)

**What's waiting at session start for next time:**
- Uncommitted: `PROJECT_STATE.md` (this file)
- Committed locally but not pushed: `b369d5a Add creator partnership reference doc`
- Both need `git push` from Andrew's Windows terminal

**Next reasonable moves (Andrew's call):**
- Customer validation / talk to real homeowners (highest-leverage non-coding work)
- Outreach to creators using the templates in `docs/creator-partnership.md`
- Point `handyowl.net` at Vercel
- Switch Stripe to live mode
- Build the referral tracking (3-4 hours of code)
