# 🦉 Handy Owl

**The DIY homeowner guide platform.** Learn to maintain, repair, and improve your home through expert video walkthroughs and interactive step-by-step guides — and stop paying contractors for jobs you can do yourself.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Fraunces (display) + Inter (body)
- **Database:** PostgreSQL + MongoDB (planned)
- **Auth:** NextAuth.js (planned)
- **Payments:** Stripe (planned)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
app/
  page.js              # Landing page
  guides/
    page.js            # Guide listing
    [slug]/
      page.js          # Guide detail (SSG)
      GuideDetail.jsx  # Interactive client component
  dashboard/
    page.js            # Logged-in home
  pricing/
    page.js            # Pricing page
components/
  Navbar.jsx
  GuideCard.jsx
  Footer.jsx
lib/
  guides.js            # Data layer (mock → DB later)
```

## Business Model

Freemium + single Premium tier at **$7.99/month** or **$74/year**.  
Revenue also from affiliate product links and expert consultations.
