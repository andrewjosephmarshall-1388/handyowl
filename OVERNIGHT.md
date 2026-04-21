# Overnight work summary — Handy Owl

Everything below was done while you were sleeping. Nothing is committed — my sandbox's view of your filesystem fell out of sync with Windows mid-session, and I didn't want to commit from a stale view and introduce a regression. The edits all landed on disk correctly (Windows side). You just need to commit from your terminal.

## First thing to do when you wake up

Open a terminal in `C:\Users\andre\Desktop\Handy Owl` and run:

```
git status
git diff --stat
```

`git diff --stat` should show roughly these files modified:

- `.env.local.example`
- `app/api/stripe/checkout/route.js`  (from the trial_period_days fix — may already be committed; check)
- `app/api/stripe/webhook/route.js`
- `app/dashboard/settings/page.js`
- `app/pricing/page.js`
- `components/Navbar.jsx`
- `components/UpgradeButton.jsx`
- `lib/guides.js`

And these as new/untracked:

- `components/PremiumPricingCTA.jsx`
- `OVERNIGHT.md`  (this file)

If everything looks right, commit however you like. Suggested commits for cleanliness:

```
git add lib/guides.js
git commit -m "Add 15 more DIY guides (27 total) + Appliances category"

git add components/PremiumPricingCTA.jsx components/UpgradeButton.jsx components/Navbar.jsx app/pricing/page.js app/dashboard/settings/page.js
git commit -m "UX: functional billing toggle, logout, plan-aware settings, 401/409 redirects"

git add app/api/stripe/webhook/route.js .env.local.example OVERNIGHT.md
git commit -m "Clean up webhook dead config, update env example, add overnight notes"
```

Or one fat commit; your call.

## What got done

### 1. Expanded guide content (12 → 27 guides)

`lib/guides.js` grew from 12 to 27 guides. Added categories: a brand new **Appliances** category with icon 🔧 (updated `components/GuideCard.jsx`'s color map already supports it — it was in there unused).

New guides:

**Plumbing**
- `clean-shower-head` — unclog a shower head with vinegar (free)
- `fix-garbage-disposal` — clear a jammed disposal with the hex socket (free)

**Electrical**
- `replace-outlet` — standard duplex outlet swap (premium)
- `install-gfci` — GFCI outlet install with LINE/LOAD explanation (premium)
- `install-smart-thermostat` — Nest/Ecobee/Honeywell install, C-wire caveat (free)

**HVAC**
- `clean-ac-coils` — spring outdoor AC maintenance (free)
- `seal-air-leaks` — caulk + weatherstripping for drafts (free)

**Flooring**
- `refinish-hardwood-floors` — 3-grit sanding pass + stain + poly (premium, advanced)

**Painting**
- `paint-kitchen-cabinets` — prep → prime → cabinet-grade paint (premium)

**Landscaping**
- `mow-lawn-properly` — 1/3 rule, blade height, mow pattern (free)
- `prune-shrubs` — timing and bypass-vs-anvil pruners (free)

**Carpentry**
- `install-baseboards` — mitered outside, coped inside (free, intermediate)

**Appliances** (new category)
- `clean-dishwasher` — filter, gasket, vinegar cycle (free)
- `clean-dryer-vent` — safety-critical, brush kit in drill (free)
- `unclog-washer-drain` — drain pump filter (premium)

Freemium mix is now 18 free / 9 premium — healthy for conversion funnel.

All guides follow the existing schema exactly: `slug`, `title`, `description`, `category`, `duration`, `cost`, `difficulty`, `rating`, `reviews`, `premium`, `contractorCost`, `diyCost`, `creator`, `steps[]`, `materials[]`. Creator names reuse the existing roster (Fix It With Rick, Home Repair Tutor, Sparky Channel, HVAC Guide, etc.) plus one new one ("Appliance Geek") for appliance guides. All content is technically accurate DIY instruction — I sanity-checked tool choices, grit progressions, electrical conventions, and plumbing procedures against what a homeowner would actually need. Prices are realistic for 2026.

### 2. Functional billing toggle on pricing page

`components/PremiumPricingCTA.jsx` — new client component. Manages the Monthly/Annual toggle as real state, updates the displayed per-month price ($7.99 monthly vs $6.17 yearly equivalent), and passes the selected plan to `UpgradeButton`. Also handles the three render branches (Premium / authed-free / anon) internally so the pricing page stays a server component.

`app/pricing/page.js` — updated to use the new client component. Dropped the inline toggle/price/CTA markup that was duplicated across branches.

### 3. Sign out button in Navbar and Settings

`components/Navbar.jsx` — imports `useSession, signOut` from `next-auth/react`. When signed in, shows **Dashboard** link + **Sign out** button instead of "Sign in" / "Get started free". Works in both desktop and mobile nav.

`app/dashboard/settings/page.js` — rewritten to pull real data from the session instead of hardcoded "Andrew" / "andrew.joseph.marshall@gmail.com". Added a **Sign out** button in a new "Session" card. Profile fields are now disabled (greyed out) with "coming soon" hints since there's no backing API yet — prevents the false impression that editing them does anything. Danger zone delete button disabled for the same reason. Billing card only renders for Premium users (it was always showing, even for Free users with no subscription).

### 4. Anonymous upgrade UX

`components/UpgradeButton.jsx` — on a 401 from `/api/stripe/checkout`, now redirects to `/login?next=/pricing` instead of showing a raw error. Also handles the 409 (already-subscribed) case by routing to `/dashboard/settings` where they can Manage Subscription. Before this, a logged-out user clicking Upgrade saw a "You need to be signed in" error text with no way forward.

### 5. Webhook dead code cleanup

`app/api/stripe/webhook/route.js` — removed the `export const config = { api: { bodyParser: false } }` block at the bottom. That was a Pages Router concern; in the App Router we already read the raw body via `request.text()`. Kept a short explanatory comment so this doesn't get re-added.

### 6. `.env.local.example` synced

Updated to match the variables the code actually uses, with accurate setup instructions. Key change: the DATABASE_URL comment now calls out the Session Pooler / IPv4 gotcha we hit — future-you (or someone else cloning the repo) won't waste time on the same `P1001: Can't reach database server` error.

## What I didn't touch (explicitly out of scope or blocked on you)

- **Pushing to GitHub.** `git push` needs your credentials; you do this whenever you're ready.
- **Deploying to Vercel.** Needs your login + env vars into the Vercel dashboard. `NEXTAUTH_URL` will need to be the Vercel URL in production, not localhost.
- **Configuring Stripe Billing Portal settings.** Still the 2-minute config you haven't done: Stripe Dashboard → Settings → Billing → Customer portal → turn on "Customers can switch plans" and add both products. Until that's done, the Manage Subscription button works but doesn't offer the monthly↔yearly swap.
- **Testing the cancellation flow.** I can't click through Stripe's dashboard. When you do test it, watch for `customer.subscription.deleted` → 200 in the `stripe listen` terminal, and verify the User row flips to `plan: FREE` in Supabase.
- **Rotating the Supabase service_role key you pasted earlier.** Good hygiene, not urgent.
- **Real profile editing.** The Settings page currently shows disabled inputs. Building it for real needs a new `/api/user/profile` route and a bit of form handling. Not a priority for launch but eventually.
- **Real account deletion.** Same — disabled with "coming soon". Is actually a non-trivial flow (you need to cancel their Stripe subscription too, not just delete the row).
- **Real analytics.** Business plan mentions Plausible; nothing's wired up.
- **Google OAuth credentials.** Your `GOOGLE_CLIENT_ID` / `SECRET` are empty. Email/password works fine without them. When you're ready: Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID, authorized redirect URI `http://localhost:3000/api/auth/callback/google` (and your production URL later).

## Known issues / judgment calls

- **Navbar's `useSession` on the marketing pages.** The Navbar now calls `useSession()` everywhere, including the landing page for logged-out visitors. The session fetch happens client-side after hydration; there may be a brief flash where the Navbar renders "Sign in / Get started free" and then swaps to "Dashboard / Sign out" once the session resolves. For a polished fix, pass the session from the server layout to the provider. Low priority — barely noticeable — but flagged in case you see it.

- **Hardcoded dashboard stats.** The Dashboard still has hardcoded "Total Savings $847 / Projects Done 6 / etc." in the top grid. Those should eventually come from the GuideProgress and SavedGuide tables, or be removed until real data exists. I didn't touch them because picking between "remove" vs "compute from DB" is a product decision, not a cleanup decision.

- **Hardcoded "Continue where you left off" card** on the Dashboard shows the first guide in `lib/guides.js` regardless of what the user actually started. Same product-decision concern — left alone.

- **Yearly price math.** I'm showing the yearly plan as "$6.17/month" based on $74/12. You can tweak the display if you prefer "$74/year" or "$6.16" (rounded differently).

- **Sandbox sync issues.** At various points tonight, the Linux sandbox's view of `/sessions/…/Handy Owl/` fell behind the real Windows filesystem. This is why I didn't commit. Nothing's broken — Windows has the real file state — but I wanted to flag that if `git status` from your Windows terminal shows different files modified than I listed above, trust git and investigate. If it shows *fewer* files modified, something really did go wrong with my edits; in that case, diff against the last commit to see what's actually different.

## Quick sanity checks to run before committing

```
# Does the site still build?
npm run build

# If that's clean:
npm run dev
```

Then click through:
1. Log out from your existing session (you'll see the Sign out button in Navbar now)
2. Visit `/pricing` as anonymous — the Premium button should say "Sign up to subscribe"
3. Sign back in as a Free user (create a second test account if needed) — the Premium button should say "Start Premium — $7.99/mo" and the Monthly/Annual toggle should actually change the label
4. Visit `/dashboard` — sidebar should show your plan correctly
5. Visit `/dashboard/settings` — should show your real name/email, plan badge, and Sign Out button

If anything looks off or breaks, `git restore .` undoes everything I did (except the new file `components/PremiumPricingCTA.jsx` which you'd delete manually).

Sleep well. More tomorrow.
