# Handy Owl — DB wiring handoff

Everything that was sitting as `// TODO: DB` in the code is now real. This file is your step-by-step to finish the session: install, migrate, test the full signup → pay → premium loop, then commit.

---

## What changed in this session

**Edited:**
- `app/api/auth/[...nextauth]/route.js` — Prisma adapter wired in, Credentials provider does a real `prisma.user.findUnique` + `bcrypt.compare`, jwt callback refreshes `plan` + `stripeCustomerId` from the DB on every request (so webhook-driven upgrades flow into the session without a re-login).
- `app/api/stripe/webhook/route.js` — `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted` now update the User row (plan, stripeCustomerId, stripeSubscriptionId, subscriptionStatus, subscriptionEndsAt). Falls back to stripeCustomerId or email lookup if metadata.userId is missing.
- `app/api/stripe/checkout/route.js` — requires auth (401 otherwise), reuses `user.stripeCustomerId` if the user already has one (no duplicate Stripe customers on re-subscribe).
- `app/api/stripe/portal/route.js` — looks up `stripeCustomerId` from the DB instead of trusting the client session.
- `app/api/email-capture/route.js` — real `prisma.emailCapture.upsert`.
- `app/login/page.js` — signup mode now POSTs `/api/auth/signup` first, then signs in.

**New:**
- `app/api/auth/signup/route.js` — creates a FREE-plan user with a bcrypt-hashed password.

Nothing is committed yet. All nine files pass `node --check`.

---

## Steps to run on your machine

### 1. Install deps

```
npm install
```

### 2. Generate the Prisma client

```
npx prisma generate
```

### 3. Create the DB tables

This applies the schema to your Supabase Postgres (the `DATABASE_URL` in `.env.local`).

```
npx prisma migrate dev --name init
```

If you've already pushed the schema before with `prisma db push`, this will detect drift and offer to reset. Say no and instead run:

```
npx prisma migrate resolve --applied init
```

### 4. Start the dev server

```
npm run dev
```

### 5. In a second terminal, forward Stripe webhooks

You need Stripe CLI installed once: <https://stripe.com/docs/stripe-cli>.

```
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The first line it prints is a `whsec_…` webhook secret. **Confirm it matches `STRIPE_WEBHOOK_SECRET` in your `.env.local`.** If it doesn't, update `.env.local` and restart `npm run dev`.

---

## End-to-end smoke test

1. Open <http://localhost:3000/login>, click "Sign up free", create `test@example.com` / a password 8+ chars. You should land on `/dashboard`.
2. Go to <http://localhost:3000/pricing>, click "Start Premium — $7.99/mo".
3. Use Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP.
4. You'll be redirected to `/dashboard/upgrade-success`.
5. In the Stripe CLI terminal you should see `checkout.session.completed` → `200`.
6. In the Next.js terminal you should see `New Premium subscriber: userId=…`.
7. Open Prisma Studio in a third terminal to confirm:

   ```
   npx prisma studio
   ```

   The `User` table should show your test user with `plan = PREMIUM`, a `stripeCustomerId`, a `stripeSubscriptionId`, `subscriptionStatus = active`, and a `subscriptionEndsAt` date.

### Cancel test

In the Stripe dashboard (Test mode) → Customers → find your test user → cancel the subscription. Watch the CLI — a `customer.subscription.deleted` event fires. The user's `plan` in the DB should flip back to `FREE`.

---

## If something goes wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| `PrismaClientInitializationError` on startup | `DATABASE_URL` wrong or Supabase paused | Check Supabase dashboard, copy the pooled connection string into `.env.local` |
| Signup returns 500 | Prisma client not generated after schema edits | Re-run `npx prisma generate` |
| Webhook 400 "Invalid signature" | Mismatched `STRIPE_WEBHOOK_SECRET` | Copy the fresh `whsec_…` from `stripe listen` into `.env.local`, restart dev server |
| User stays FREE after paying | Webhook not reaching your machine | Make sure `stripe listen` is running and pointing to `localhost:3000/api/stripe/webhook` |
| "You need to be signed in to subscribe." | Clicked upgrade while logged out | Expected — pricing page still shows upgrade button to anonymous visitors. Future fix: redirect to `/login` instead |

---

## Commit when green

```
git add -A
git commit -m "Wire auth, Stripe, and email capture to Prisma DB"
```

---

## What's still open after this

Not in scope for this session, but worth tracking:

- **Pricing-page UX for anonymous visitors** — redirect Upgrade clicks to `/login?next=/pricing` instead of 401-ing.
- **Annual vs monthly toggle on pricing page** — currently visual only; the yearly UpgradeButton works but there's no real toggle state.
- **`config.api.bodyParser = false`** in the webhook route is a no-op in App Router (harmless but misleading). Safe to delete if you want.
- **Guide content** — still ~10 guides; business plan wants 20-30 at MVP.
- **Vercel deploy** — `vercel.json` is there; set the env vars on Vercel and connect the repo.
