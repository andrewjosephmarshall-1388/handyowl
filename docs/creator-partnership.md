# Handy Owl Creator Partnership

Canonical reference for how Handy Owl partners with YouTube DIY creators. Use this for outreach, onboarding, and implementation planning.

---

## TL;DR

Handy Owl features creators' embedded YouTube videos inside structured DIY guides, with full attribution and a link back to their channel on every embed. Founding creators get a revenue share on subscribers they refer, an affiliate commission passthrough on materials, and prominent placement when the platform launches.

---

## What creators get

1. **Prominent attribution** on every guide their content appears in: name, channel link, subscriber count, and a "Watch on YouTube" call-to-action above every embedded video.
2. **Referral machine** — every Handy Owl user who watches their video is a potential new YouTube subscriber, and clicks from embeds pass watch time and engagement signals back to their channel.
3. **Dedicated referral URL** (e.g., `https://handyowl.net/?ref=fix-it-rick`) that tracks revenue attribution to them. Shareable anywhere: video descriptions, community posts, Patreon, Instagram.
4. **Affiliate link passthrough** — their Amazon Associate links (or Home Depot, Lowe's partner links) get used in the materials list for guides featuring their videos, not ours. They keep the affiliate commission on any tool/material purchased through the guide.
5. **Founding creator status** — logo and credit on the Handy Owl launch page, social proof for their own audience, and first-access to new features (e.g., creator dashboards, analytics, co-marketing opportunities).
6. **Revenue share** on attributed paid subscribers.

---

## Revenue share terms

**Rate:** 30% of attributed subscription revenue.

**Duration:** 12 months per attributed subscriber. After 12 months, attribution expires and 100% of the subscription goes to Handy Owl. The user stays subscribed; the creator's payout obligation ends.

**Starts at:** $1,000 MRR. Before that milestone, Handy Owl is still pre-revenue and operating on founder savings; after it, the rev share kicks in retroactively for all attributed subscribers still active.

**30-day clawback:** if an attributed user refunds within 30 days or charges back, the creator doesn't earn on that subscription. Standard industry practice; protects both parties from abuse.

**Payout threshold:** Creator balances accumulate until they cross $50, at which point a payout issues (monthly cadence, ACH or PayPal). This avoids writing out sub-$5 checks.

**Flexibility for larger partners:** 30%/12mo is the standard "founding creator" offer. Creators with 500K+ subscribers or unique positioning may negotiate custom terms (e.g., 40% for 12 months, or 30% for 24 months) at Andrew's discretion.

---

## How attribution tracking works

### Phase 1 — Referral links (launch approach)

Each creator gets a unique referral URL: `https://handyowl.net/?ref=<creator-slug>`.

When someone clicks that URL:

1. The `ref=<creator-slug>` query parameter is captured and stored in a first-party cookie (30-day lifetime).
2. When the visitor signs up later (even in a different session, same browser), the cookie value is written to a new `User.referredBy` column at account creation.
3. When that user eventually pays, the attribution is already on the user record. Calculation of creator payouts becomes a simple Postgres query.

**Implementation status:** not yet built. Planned for the sprint before $1K MRR so it's ready when the rev share kicks in.

**Effort estimate:** 3-4 hours of work.
- Schema migration: add `User.referredBy` column (nullable string)
- Middleware: capture `?ref=` from any incoming URL, set cookie
- Signup flow tweak: read cookie on account creation, persist to User row
- Admin query / dashboard view for creator earnings

### Phase 2 — View-based attribution (future)

Once referral-link attribution is in place and revenue is flowing, a second layer can be added to credit creators for guides a paying user actually engaged with — even if that user didn't come in through a referral link.

Implementation sketch:
- Track guide views per user (already supported by the `GuideProgress` table, currently unused)
- At payment time, look back at the user's recent guide engagement
- Distribute a small percentage pool across creators of viewed guides

This is deferred until there's meaningful revenue to distribute. Not a launch concern.

---

## Outreach strategy

### Who to target

**Start with the 10K–100K subscriber range.** Smaller than that and their audience is too thin to move the needle; bigger and their inboxes are flooded with pitches and you're competing for attention.

**Niches that matter for Handy Owl:**
- Plumbing how-to (fix-it videos, no-call-a-plumber content)
- Electrical DIY (safety-focused channels)
- HVAC maintenance
- Carpentry and finish work
- Flooring installation
- Appliance repair (refrigerator, dryer, dishwasher)
- General home maintenance / homeowner education

### Where to find them

- YouTube search for specific project titles (e.g., "fix leaky faucet", "install ceiling fan") and browse the top non-mega results
- Reddit: r/DIY, r/HomeImprovement, r/HomeOwners creator recommendations
- Existing guide creators — every guide in `lib/guides.js` already references a creator by name and subscriber count. Work from that list

### How to reach them

**Business email on their YouTube About tab** is the highest-response-rate channel. Use this first.

If no email listed, try in order:
1. Their personal website (if any)
2. Instagram DM (good for smaller creators)
3. Twitter/X DM (hit or miss)
4. LinkedIn (works for more professional-leaning creators)

YouTube's internal DM system is a dead zone. Skip it.

### Cadence

- Initial email: personalized per creator, naming a specific video
- Follow-up: one follow-up after 7 days if no response
- After second non-response: move on. Don't chase.

### Volume expectations

A realistic first batch is 15–20 creators. Expect:
- ~30% reply rate (5-6 replies)
- ~10-15% of those convert to actual partnerships (1-2 creators)

Your goal for the first month is 3-5 founding creators, not 15. Quality of relationships beats quantity of signups.

---

## Outreach templates

### Primary email (first contact)

```
Subject: Featuring your [specific video title] on Handy Owl

Hi [Creator Name],

Big fan of your [specific video title] — especially [one specific thing
about it, e.g., "the way you explain LINE vs LOAD at 4:32; most electrical
tutorials skip that entirely"]. That's the kind of explanation my audience
needs.

I'm building Handy Owl (https://handyowl.net), a DIY home
maintenance site that pairs structured step-by-step guides with expert
creator videos. It's pre-launch — 42 guides live, no paying users yet,
under active build.

I'd like to feature [that video] (or others) embedded in relevant guides
with full attribution: your name, channel, subscriber count, and a
prominent link back to your channel above every embed. Every reader
Handy Owl sends to your video is a potential new subscriber for you.

For the founding creators who come in now, I'm offering:

- Prominent "Featuring: [Your Channel]" credit on every guide
- Your Amazon/Home Depot affiliate links in the materials list (you
  keep the commission, not me)
- Dedicated referral URL to share with your audience
- 30% rev-share on every paid subscriber you refer, for 12 months,
  starting once Handy Owl crosses $1K MRR
- Founding creator badge on the launch page

Would you be open to a 15-minute call to walk through what we're
building? Happy to work around your schedule.

Thanks,
[Andrew]
[email] / [phone]
https://handyowl.net
```

### Follow-up email (day 7)

```
Subject: Re: Featuring your [video] on Handy Owl

Hi [Name],

Quick follow-up on my note from last week — I know inboxes are a mess.
If you're not interested, totally understandable; no need to reply.

If you are, even a one-line "tell me more" is all I need to set up the
call.

Site is at https://handyowl.net — worth a 2-minute click through
before you decide.

Thanks,
[Andrew]
```

### Variant: "You're already featured" (post-populate)

Use this when their video is already live on the platform. Strongest pitch — proves investment, gives them something concrete to click, removes hypothetical framing.

```
Subject: Your [video title] is on Handy Owl — partnership?

Hi [Creator Name],

Featured your video "[exact video title]" on our [Guide Title] guide:
https://handyowl.net/guides/[slug]

It went live this week with full attribution to your channel + a
prominent "Watch more on YouTube" link back to you. Every reader is a
potential new subscriber for your channel.

I'm building Handy Owl as a curated DIY home-maintenance site. Pre-
launch (42 guides, no paying users yet), and I'm picking 3-5 founding
creators to partner with formally.

For founding creators:
- 30% rev-share on subscribers you refer, 12 months, kicks in at $1K MRR
- Your affiliate links (Amazon/Home Depot) replace mine in the materials
  list of guides featuring your videos — you keep the commission
- Dedicated referral URL to share with your audience
- Founding creator badge + prominent placement at launch

If you'd rather your video NOT be on the site, just reply and it's gone
the same day — there's a "Request removal" link on every embed too.

Otherwise: open to a 15-min call? Even a one-line "tell me more" is
enough to set up time.

Thanks,
[Andrew]
hello@handyowl.net
https://handyowl.net
```

### Variant: Embedding-disabled creator (modified ask)

When a creator's videos can't embed (they have it disabled in YouTube settings), the page shows their attribution + a "Watch on YouTube" button but no playable video. The pitch becomes: "I want your videos here, you'd just need to flip a setting."

```
Subject: Your video on Handy Owl — quick favor?

Hi [Creator Name],

I featured you as the creator on our [Guide Title] guide on Handy Owl:
https://handyowl.net/guides/[slug]

I'd love your video "[exact video title]" to play directly on the page,
but I noticed your channel has video embedding disabled — when I added
the URL it just shows blank instead of playing. So right now your name
and channel link are there, but the video isn't.

If you flip "Allow embedding" to ON in YouTube Studio (Settings →
Channel → Advanced settings, or per-video in the upload defaults),
your video would appear inline and every visitor watching it counts as
a YouTube view for you. Happy to walk you through the toggle if helpful.

Either way, would love to chat about a partnership — 30% rev-share on
subscribers you refer (12mo, kicks in at $1K MRR), affiliate-link
passthrough, founding creator placement.

Thanks,
[Andrew]
hello@handyowl.net
```

### Instagram / Twitter DM (short-form variant)

```
Hey — your [specific video] helped me understand [specific thing].

I'm building Handy Owl (https://handyowl.net), a DIY home
maintenance site that embeds expert creator videos inside structured
step-by-step guides. Pre-launch, looking for founding creators.

Open to a 15-min call to talk partnership? Rev-share + affiliate link
passthrough + full attribution on every embed.
```

---

## Call script — what to cover

### Open (1 min)

- Thank them for the time
- Quick intro: your name, what you did before Handy Owl, the problem you're solving
- One-sentence vision for Handy Owl

### Discovery (5 min)

Ask, don't pitch. Goal: understand their priorities so you can frame the partnership in their terms.

- "What are you trying to grow right now — subscribers, sponsorships, a product of your own?"
- "What pain points do you have in the DIY creator space?"
- "Do you do affiliate partnerships already? Which ones, and how do they work?"

### Pitch (5 min)

Walk through https://handyowl.net live. Show a guide that features their video (even if you haven't asked yet — have one ready to show). Frame what you're offering in terms of what they just said in discovery.

Key points:
- Attribution, attribution, attribution — show exactly how their credit appears
- Referral link + rev share mechanics
- Affiliate passthrough
- No exclusivity — they can embed on Handy Owl and stay on every other platform

### Close (4 min)

- "Is there anything about this that doesn't sit right?"
- If yes: listen, address, offer to discuss further
- If no: "Great — what I'd like to do is [next step]. Can I send over a one-page partnership summary for your review?"

Common next steps:
- Email them the one-page summary (use this markdown file, export to PDF, or just paste the "What creators get" + "Revenue share terms" sections)
- Propose a guide to launch with
- Schedule follow-up in 2 weeks

Never close on the call. Give them time to think. Pressuring = death.

---

## Anticipated FAQs

**"What happens if I pull permission later?"**
You can request removal anytime. We'll remove the embed within 7 days, and you keep 100% of any already-earned revenue share.

**"Do I need to sign a contract?"**
A lightweight written agreement (email exchange is fine to start) establishes the terms. A formal contract becomes worthwhile once real revenue is flowing; we'll handle that when we cross the first payout threshold.

**"Do you have numbers — users, traffic, anything?"**
Not yet. Handy Owl just launched in April 2026. Being upfront: you'd be joining at the beginning. The early creator pool is whoever is willing to build this with me.

**"What if my video changes or I re-upload it?"**
YouTube embeds point at a video ID, not a URL. If you re-upload with a new ID, let me know and I'll swap the embed. If you edit the existing video, the embed updates automatically.

**"Can I promote my own paid products in the video or guide?"**
Absolutely — any link in your video stays in your video. If you have a paid course or your own site, we can include a "Learn more from [Creator]" CTA in the guide with a link to your site.

**"Is this exclusive? Can I still use my video on my site / in Patreon?"**
Not exclusive in any way. You retain all rights to your content. Handy Owl gets permission to embed, nothing more.

**"How do I get paid?"**
Monthly payouts via ACH or PayPal, once your accumulated earnings cross $50. Below that, they roll forward to the next month.

**"Why 12 months and not lifetime?"**
Two reasons. First, it matches industry standard (Skillshare, Substack, most creator-economy SaaS use 12-month windows). Second, it aligns incentives — your content's influence is strongest in the first months; a lifetime share on a single embed would be unusual and unsustainable for Handy Owl to offer to every creator.

**"Can I see the referral dashboard before I sign on?"**
Not yet — it's being built alongside the first wave of creator partnerships. The commitment is that attribution tracking will be live before the $1K MRR threshold where rev share kicks in. You'll get the dashboard URL as soon as it's ready.

---

## Onboarding checklist (once a creator says yes)

- [ ] Confirm their business email / best contact for ongoing communication
- [ ] Get their preferred referral slug (e.g., `fix-it-rick`, or let them choose)
- [ ] Confirm their Amazon Associate tag (or other affiliate network tags) for materials passthrough
- [ ] Identify first 1-3 guides to launch with (their videos embedded, materials lists updated with their affiliate tag)
- [ ] Add their channel info to the launch page's "Featured creators" section
- [ ] Draft a one-paragraph partnership confirmation email summarizing terms; both parties reply "agreed" — lightweight agreement, email-as-record
- [ ] Schedule a 30-day check-in to review how it's going and gather feedback

---

## Operational notes for future you

- Keep a simple spreadsheet (or Notion DB) of creators: contact, channel, subscriber count, status (pitched / replied / onboarded / inactive), referral slug, agreed-terms snapshot, last contact date
- Revisit the rev share terms when you hit 50 paying users — by then you'll have data on churn and LTV, and can decide if 30%/12mo is still right or needs tuning
- Consider creator tiering later: "Standard" (30%/12mo) vs "Elite" (higher rate, priority placement, exclusive co-marketing) for creators who bring serious volume
- Phase 2 view-based attribution is deferred until after the first $10K in cumulative revenue. Not worth the engineering complexity before then

---

*Last updated: April 2026 — initial version. Revise when rev-share terms change, attribution tracking goes live, or the creator roster hits 10 partners.*
