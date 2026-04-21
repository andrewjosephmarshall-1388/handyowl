# GitHub Issues - DIY Homeowner Platform (Bulk Import Ready)

## Instructions for Bulk Import

1. Copy each issue block below
2. Go to your GitHub repo → Issues → New Issue
3. Paste the content (title goes in title field, rest in description)
4. OR use GitHub CLI: `gh issue create --title "..." --body "..."`
5. Assign labels: `phase-1`, `backend`, `frontend`, `content`, etc.
6. Assign milestone: `MVP (Week 1-8)`, `Phase 2 (Week 9-16)`, etc.
7. Assign to team members

---

## PHASE 1: MVP (Weeks 1-8)

### WEEK 1: Foundation & Setup

---

**Issue #1: Set up GitHub repository structure**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `infrastructure`, `critical-path`
**Assignee:** Tech Lead
**Points:** 8

**Description:**

Create the main GitHub repository with proper directory structure:

- [ ] Create main branch with branch protection rules
- [ ] Create `develop` branch for development work
- [ ] Create directory structure:
  - `/backend` (Node.js/Express)
  - `/frontend` (React/Next.js)
  - `/docs` (documentation)
  - `/scripts` (deployment, database migrations)
- [ ] Add `.gitignore` (Node, React, environment files)
- [ ] Add `README.md` with project overview
- [ ] Add `CONTRIBUTING.md` with team guidelines
- [ ] Set up GitHub Teams and access permissions

**Success Criteria:**
- Team can clone and run locally
- Branch protection prevents direct merges to main
- Clear folder organization

**Depends on:** None

---

**Issue #2: Configure development environment & CI/CD**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `infrastructure`, `critical-path`
**Assignee:** Tech Lead
**Points:** 13

**Description:**

Set up local development environment and continuous integration/deployment:

**Local Development:**
- [ ] Create `docker-compose.yml` for local PostgreSQL, Redis, etc.
- [ ] Create `.env.example` template file
- [ ] Document setup instructions in README
- [ ] Test that new devs can run locally in <30 minutes

**CI/CD Pipeline:**
- [ ] Set up GitHub Actions workflow
- [ ] Configure for PR checks:
  - [ ] Linting (ESLint for JS/TS)
  - [ ] Unit tests (Jest)
  - [ ] Build success check
- [ ] Configure for main branch:
  - [ ] All PR checks pass
  - [ ] Deploy to staging automatically
- [ ] Set up deployment to production (manual trigger)
- [ ] Add GitHub status checks to PR requirements

**Success Criteria:**
- New dev can setup locally in <30 minutes
- All PRs automatically tested
- Passing tests required for merge

**Depends on:** #1

---

**Issue #3: Design database schema (ER diagram)**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`, `critical-path`
**Assignee:** Tech Lead
**Points:** 13

**Description:**

Design comprehensive database schema for MVP:

**Tables to create:**
- [ ] `users` (id, email, password_hash, name, subscription_tier, created_at, updated_at)
- [ ] `subscriptions` (id, user_id, tier, start_date, renewal_date, status, stripe_id)
- [ ] `guides` (id, title, category, difficulty, time_minutes, cost_estimate, description, video_url, created_at, updated_at)
- [ ] `guide_steps` (id, guide_id, step_number, title, description, image_urls[], created_at)
- [ ] `guide_materials` (id, guide_id, name, quantity, unit, affiliate_link, price)
- [ ] `guide_tools` (id, guide_id, name, rental_option, affiliate_link, price)
- [ ] `creator_partnerships` (id, creator_name, channel_url, tier, revenue_share_percent, email, signed_agreement_url)
- [ ] `analytics_events` (id, user_id, event_type, guide_id, timestamp, metadata)
- [ ] `user_bookmarks` (id, user_id, guide_id, created_at)
- [ ] `guide_ratings` (id, guide_id, user_id, rating, review_text, created_at)

**For each table:**
- [ ] Define all columns with types
- [ ] Add constraints (NOT NULL, UNIQUE, FK relationships)
- [ ] Add indexes for common queries
- [ ] Create ER diagram in Lucidchart or similar
- [ ] Document relationships between tables
- [ ] Design for performance (query optimization)

**Success Criteria:**
- All tables defined with proper constraints
- ER diagram created and reviewed
- Indexes planned for common queries
- Tech lead approves design

**Depends on:** #1

---

**Issue #4: Set up AWS cloud infrastructure**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `infrastructure`, `critical-path`
**Assignee:** Tech Lead / DevOps
**Points:** 20

**Description:**

Configure AWS infrastructure for staging and production:

**Compute:**
- [ ] Create EC2 instances (staging + production)
- [ ] Configure security groups (SSH, HTTP, HTTPS)
- [ ] Set up auto-scaling groups

**Database:**
- [ ] Create RDS PostgreSQL instance (staging + production)
- [ ] Configure backups (daily, 30-day retention)
- [ ] Test restore procedure
- [ ] Set up read replicas for scaling

**Storage:**
- [ ] Create S3 buckets (images, videos, documents)
- [ ] Configure CloudFront CDN for S3
- [ ] Set up lifecycle policies (old files → Glacier)

**Monitoring & Logging:**
- [ ] CloudWatch for logs and metrics
- [ ] Set up alarms (CPU, disk, database connections)
- [ ] Create SNS topics for alerts

**Domains & SSL:**
- [ ] Route53 DNS setup
- [ ] SSL certificates (ACM)
- [ ] HTTPS configured

**Documentation:**
- [ ] Document AWS setup in CONTRIBUTING.md
- [ ] Create runbook for deployments
- [ ] Create disaster recovery procedure

**Success Criteria:**
- Staging environment fully functional
- Can deploy code with zero downtime
- Backups tested and verified
- Alerts working

**Depends on:** #1, #3

---

**Issue #5: Create Figma design system**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `design`
**Assignee:** Design Lead
**Points:** 16

**Description:**

Build reusable design system in Figma for consistency across app:

**Colors:**
- [ ] Primary color palette (brand color + shades)
- [ ] Secondary colors (success, warning, error)
- [ ] Neutral palette (grays for text, backgrounds)
- [ ] Accessibility check (contrast ratios WCAG AA)

**Typography:**
- [ ] Heading styles (H1-H6)
- [ ] Body text styles (regular, bold, sizes)
- [ ] Monospace for code/pricing
- [ ] Line heights and letter spacing defined

**Components:**
- [ ] Buttons (primary, secondary, tertiary, sizes)
- [ ] Form inputs (text, email, password, error states)
- [ ] Cards (guide card, creator card, testimonial)
- [ ] Modals / dialogs
- [ ] Navigation (header, sidebar, footer)
- [ ] Loading states, skeleton screens

**Patterns:**
- [ ] Authentication flow screens
- [ ] List/detail patterns
- [ ] Empty states
- [ ] Error states

**Documentation:**
- [ ] Component usage guide in Figma
- [ ] Responsive breakpoints defined
- [ ] Naming conventions for components

**Success Criteria:**
- All components documented
- Frontend devs can build from Figma without questions
- Consistent spacing, typography, colors
- Accessible color combinations

**Depends on:** None (can start immediately)

---

**Issue #6: Scaffold backend server (Node.js/Express)**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`, `critical-path`
**Assignee:** Backend Dev 1
**Points:** 13

**Description:**

Create initial Node.js/Express server structure:

- [ ] Initialize Node.js project (`npm init`)
- [ ] Install core dependencies:
  - [ ] Express (web framework)
  - [ ] PostgreSQL client (node-postgres)
  - [ ] JWT (jsonwebtoken) for auth
  - [ ] bcryptjs for password hashing
  - [ ] dotenv for environment variables
  - [ ] cors for cross-origin requests
  - [ ] helmet for security headers
  - [ ] morgan for request logging

- [ ] Create folder structure:
  - [ ] `/routes` (API endpoints)
  - [ ] `/controllers` (business logic)
  - [ ] `/models` (database queries)
  - [ ] `/middleware` (auth, error handling)
  - [ ] `/config` (database, environment config)

- [ ] Set up basic middleware:
  - [ ] Body parser (JSON)
  - [ ] CORS configuration
  - [ ] Security headers (helmet)
  - [ ] Request logging (morgan)
  - [ ] Error handling middleware

- [ ] Create main server file (`server.js`):
  - [ ] Listen on port 5000 (or configurable)
  - [ ] Test that server starts and responds to health check

- [ ] Create health check endpoint:
  - [ ] `GET /health` returns `{status: "ok"}`
  - [ ] Use in CI/CD to verify deployment

**Success Criteria:**
- `npm start` starts the server
- `GET /health` returns 200
- All dependencies installed
- Code follows ESLint config

**Depends on:** #2

---

**Issue #7: Scaffold frontend React app**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `frontend`, `critical-path`
**Assignee:** Frontend Dev 1
**Points:** 13

**Description:**

Create React/Next.js frontend structure:

- [ ] Initialize Next.js project (or Create React App if preferred)
- [ ] Install core dependencies:
  - [ ] React Router (navigation)
  - [ ] Axios (HTTP client)
  - [ ] React Query (data fetching)
  - [ ] Tailwind CSS (styling)
  - [ ] React Hook Form (form handling)
  - [ ] Zustand or Redux (state management)

- [ ] Create folder structure:
  - [ ] `/pages` (page components)
  - [ ] `/components` (reusable UI components)
  - [ ] `/hooks` (custom React hooks)
  - [ ] `/services` (API calls)
  - [ ] `/styles` (global styles)
  - [ ] `/utils` (helper functions)

- [ ] Set up styling:
  - [ ] Tailwind CSS configured
  - [ ] Global CSS file created
  - [ ] Theme colors defined

- [ ] Create basic pages:
  - [ ] Home page (placeholder)
  - [ ] 404 page
  - [ ] Health check component (shows connection status)

- [ ] Set up API client:
  - [ ] Axios instance with base URL
  - [ ] Request/response interceptors
  - [ ] Error handling

**Success Criteria:**
- `npm start` runs dev server on localhost:3000
- Home page loads
- No console errors
- All dependencies installed

**Depends on:** #2

---

### WEEK 2-3: Authentication & Core APIs

---

**Issue #8: Create user authentication API (signup, login, logout)**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`, `critical-path`
**Assignee:** Backend Dev 1
**Points:** 21

**Description:**

Build complete authentication system with JWT tokens:

**Endpoints:**
- [ ] `POST /api/auth/signup`
  - Input: email, password, name
  - Output: user object, JWT token
  - Validation: email format, password strength (8+ chars)
  - Error: email already exists, validation errors
  
- [ ] `POST /api/auth/login`
  - Input: email, password
  - Output: user object, JWT token
  - Error: invalid credentials, user not found
  - Rate limiting: max 5 failed attempts per IP per 15 min

- [ ] `POST /api/auth/logout`
  - Output: success message
  - Invalidate token on client

- [ ] `POST /api/auth/forgot-password`
  - Input: email
  - Output: confirmation message
  - Action: send reset email with token
  - Error: user not found

- [ ] `POST /api/auth/reset-password`
  - Input: reset_token, new_password
  - Output: success message
  - Validation: token not expired, password strong

- [ ] `GET /api/auth/me`
  - Auth required: yes (JWT token in header)
  - Output: current user object
  - Error: token invalid/expired

**Database Queries:**
- [ ] Create user in `users` table
- [ ] Hash password with bcrypt (salt rounds: 10)
- [ ] Store JWT secret in environment variable
- [ ] Query user by email
- [ ] Update password in database

**Middleware:**
- [ ] Create `authenticateToken` middleware
  - Extracts JWT from Authorization header
  - Validates token signature
  - Attaches user to request object
  - Returns 401 if invalid

**Testing:**
- [ ] Unit tests for password hashing
- [ ] Unit tests for JWT creation/validation
- [ ] Integration tests for signup flow
- [ ] Integration tests for login flow
- [ ] Test invalid credentials
- [ ] Test token expiration

**Success Criteria:**
- Can signup with new email
- Can login with correct credentials
- Cannot login with wrong password
- JWT tokens validated on protected endpoints
- Tokens expire after 24 hours

**Depends on:** #6, #3

---

**Issue #9: Create guide API (read endpoints)**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`, `critical-path`
**Assignee:** Backend Dev 2
**Points:** 16

**Description:**

Build read-only API endpoints for guides:

**Endpoints:**

- [ ] `GET /api/guides`
  - Query params: category, difficulty, search, page, limit
  - Output: paginated list of guides (title, category, difficulty, thumbnail)
  - Auth required: no
  - Caching: 1 hour

- [ ] `GET /api/guides/:id`
  - Output: full guide object
  - Include: title, description, category, difficulty, time, cost, video_url, steps, materials, tools
  - Include: creator info (name, channel_url, bio)
  - Include: user rating (if user is authenticated)
  - Auth required: no (but check subscription tier for premium content)

- [ ] `GET /api/guides/:id/steps`
  - Output: array of steps (step_number, title, description, images)
  - Pagination: optional
  - Auth required: depends on guide premium status

- [ ] `GET /api/categories`
  - Output: list of all categories with guide count
  - Auth required: no
  - Caching: 1 hour

- [ ] `GET /api/guides/search`
  - Query params: q (search term)
  - Output: matching guides, sorted by relevance
  - Auth required: no

**Database Queries:**
- [ ] Query guides with filters
- [ ] Query single guide with all details
- [ ] Query steps for a guide
- [ ] Full-text search on guide titles/descriptions

**Caching:**
- [ ] Redis cache for category list
- [ ] Cache guide details (1 hour TTL)
- [ ] Invalidate cache on guide update

**Content Access Control:**
- [ ] Check subscription tier before returning premium content
- [ ] Free users: titles, descriptions, creator info only
- [ ] Premium users: full content including videos
- [ ] Video URL hidden for free users

**Testing:**
- [ ] Test all endpoints return correct data
- [ ] Test pagination
- [ ] Test search functionality
- [ ] Test access control (free vs. premium)
- [ ] Test caching

**Success Criteria:**
- All endpoints return 200 with correct data
- Search works on guide titles
- Free tier can browse but not access video URLs
- Response time <500ms (cached)

**Depends on:** #6, #3

---

**Issue #10: Create user profile API**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`, `critical-path`
**Assignee:** Backend Dev 2
**Points:** 13

**Description:**

Build user profile management endpoints:

**Endpoints:**

- [ ] `GET /api/users/:id`
  - Output: user profile (name, email, created_at, subscription_tier)
  - Auth required: yes (user can only view own profile)

- [ ] `PATCH /api/users/:id`
  - Input: name, email, profile_photo_url
  - Output: updated user object
  - Auth required: yes
  - Validation: email unique, valid email format

- [ ] `DELETE /api/users/:id`
  - Action: soft delete user account
  - Output: success message
  - Auth required: yes
  - Action: anonymize user data, keep subscription records

- [ ] `GET /api/users/:id/saved-guides`
  - Output: list of user's bookmarked guides
  - Auth required: yes
  - Pagination: yes

- [ ] `POST /api/users/:id/saved-guides`
  - Input: guide_id
  - Output: success message
  - Auth required: yes

- [ ] `DELETE /api/users/:id/saved-guides/:guide_id`
  - Output: success message
  - Auth required: yes

**Database Queries:**
- [ ] Query user by ID
- [ ] Update user profile
- [ ] Soft delete user (set deleted_at timestamp)
- [ ] Query saved guides for user

**Validation:**
- [ ] Email format validation
- [ ] Prevent duplicate emails
- [ ] User can only modify own profile

**Testing:**
- [ ] Test get profile
- [ ] Test update profile
- [ ] Test delete account
- [ ] Test save/unsave guides
- [ ] Test auth required

**Success Criteria:**
- User can view and update own profile
- Cannot modify other users' profiles
- Can bookmark/unbookmark guides
- Profile updates reflected immediately

**Depends on:** #8, #3

---

### WEEK 2-3: Frontend Authentication Pages

---

**Issue #11: Design & build signup page**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `frontend`, `critical-path`
**Assignee:** Frontend Dev 1
**Points:** 13

**Description:**

Create signup page with form validation:

**Design (from Figma):**
- [ ] Layout: centered form, light background
- [ ] Logo in header
- [ ] Heading: "Create your account"
- [ ] Form fields: name, email, password, confirm password
- [ ] Submit button: primary style
- [ ] Link to login page

**Form Validation:**
- [ ] Required field validation
- [ ] Email format validation
- [ ] Password strength validation (min 8 chars, at least 1 uppercase, 1 number)
- [ ] Password confirmation matches
- [ ] Show error messages below each field
- [ ] Disable submit button while loading

**Functionality:**
- [ ] Connect to backend `/api/auth/signup` endpoint
- [ ] Show loading spinner while submitting
- [ ] On success: redirect to dashboard, show welcome message
- [ ] On error: show error message, allow retry
- [ ] Store JWT token in localStorage/httpOnly cookie

**User Experience:**
- [ ] Focus management (keyboard navigation)
- [ ] Error messages clear and actionable
- [ ] Success message visible
- [ ] Can navigate back to login

**Testing:**
- [ ] Test form validation (each field)
- [ ] Test signup with valid data
- [ ] Test signup with duplicate email (error handling)
- [ ] Test signup with weak password
- [ ] Test redirect after signup

**Success Criteria:**
- Form validates before submission
- Signup works end-to-end with backend
- Error messages display correctly
- User redirected to dashboard on success

**Depends on:** #7, #8, #5

---

**Issue #12: Design & build login page**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `frontend`, `critical-path`
**Assignee:** Frontend Dev 2
**Points:** 13

**Description:**

Create login page with form validation:

**Design (from Figma):**
- [ ] Layout: centered form, light background
- [ ] Logo in header
- [ ] Heading: "Sign in to your account"
- [ ] Form fields: email, password
- [ ] Submit button: primary style
- [ ] "Forgot password?" link
- [ ] Link to signup page

**Form Validation:**
- [ ] Required field validation
- [ ] Email format validation
- [ ] Show error messages
- [ ] Disable submit button while loading
- [ ] Rate limiting message if too many failed attempts

**Functionality:**
- [ ] Connect to backend `/api/auth/login` endpoint
- [ ] Show loading spinner while submitting
- [ ] On success: redirect to dashboard, store token
- [ ] On error: show error message (generic for security)
- [ ] Remember email (optional, localStorage)

**User Experience:**
- [ ] Focus management
- [ ] Clear error messages
- [ ] Can navigate to signup or forgot password
- [ ] Social login placeholder (for future)

**Testing:**
- [ ] Test form validation
- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials
- [ ] Test rate limiting
- [ ] Test redirect after login

**Success Criteria:**
- Form validates before submission
- Login works with valid credentials
- Rejects invalid credentials with message
- User redirected to dashboard on success

**Depends on:** #7, #8, #5

---

**Issue #13: Build forgot password & reset flow**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `frontend`
**Assignee:** Frontend Dev 2
**Points:** 10

**Description:**

Create forgot password request and reset pages:

**Forgot Password Page:**
- [ ] Design in Figma
- [ ] Form with email input
- [ ] Connect to `/api/auth/forgot-password`
- [ ] Show success message: "Check your email for reset link"
- [ ] Handle errors gracefully

**Reset Password Page:**
- [ ] Parse reset token from URL query param
- [ ] Form with new password, confirm password
- [ ] Password validation (8+ chars, mix of types)
- [ ] Connect to `/api/auth/reset-password`
- [ ] Show success message: redirect to login
- [ ] Handle expired tokens

**Email Template:**
- [ ] Design reset email in HTML
- [ ] Include reset link with token
- [ ] Expiration time stated (24 hours)
- [ ] Security warning

**Testing:**
- [ ] Test forgot password request
- [ ] Test reset password with valid token
- [ ] Test reset password with expired token
- [ ] Test invalid email handling
- [ ] Test password validation

**Success Criteria:**
- Users can reset password via email
- Tokens expire after 24 hours
- Reset flow works end-to-end

**Depends on:** #7, #8

---

### WEEK 3-4: Content Strategy & Creator Partnerships

---

**Issue #14: Research & compile creator database**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`, `critical-path`
**Assignee:** Content Manager
**Points:** 13

**Description:**

Identify 50-100 expert video creators for partnership:

**Categories to Research:**
- [ ] Flooring (tile, laminate, hardwood installation)
- [ ] Plumbing (repairs, water heater maintenance)
- [ ] HVAC & air conditioning maintenance
- [ ] Electrical (outlets, switches, basic safety)
- [ ] Carpentry & woodworking (cabinets, doors)
- [ ] General home maintenance (seasonal, basic repairs)
- [ ] Outdoor projects (decks, patios, fencing)

**For Each Creator, Document:**
- [ ] Name / channel name
- [ ] YouTube URL
- [ ] Subscriber count
- [ ] Video quality (1080p+)
- [ ] Most relevant video URL
- [ ] Contact info (email if available)
- [ ] Engagement level (comments, responses)
- [ ] Upload frequency
- [ ] Tier assessment (1, 2, or 3)

**Output:**
- [ ] Create spreadsheet with all 50-100 creators
- [ ] Organize by tier (Tier 1: 15-20, Tier 2: 30-40, Tier 3: 50+)
- [ ] Flag top 20 "must-haves"
- [ ] Add notes on why each creator is good fit

**Tools:**
- [ ] YouTube search
- [ ] TubeBuddy or VidIQ for analytics
- [ ] Google Sheets for tracking
- [ ] Email scraper for contact info

**Success Criteria:**
- 50+ creators documented
- Clear tier classification
- Contact info collected for at least 80%
- Quality threshold verified (1080p minimum)

**Depends on:** None (can start immediately)

---

**Issue #15: Create partnership agreement & outreach templates**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`, `critical-path`
**Assignee:** Content Manager
**Points:** 13

**Description:**

Develop legal agreements and email templates for creator recruitment:

**Partnership Agreement (1-page):**
- [ ] Creator grants permission to embed video
- [ ] Creator retains copyright
- [ ] Creator can monetize on YouTube
- [ ] [Your App] provides credit + backlink
- [ ] Video can be removed with 30 days notice
- [ ] Revenue share terms (if applicable)
- [ ] Signature blocks

**Save as:** `creator_partnership_agreement.pdf` template

**Outreach Email Templates:**

- [ ] Tier 1 email (personalized, high-touch)
  - Reference their specific video
  - Value prop (traffic, audience growth, exposure)
  - Custom ask
  - CTA
  - Example: "Hi [Creator], I noticed your tile installation video is great..."

- [ ] Tier 2 email (template, but personalized)
  - Generic structure
  - Specific to their niche
  - Simpler ask
  - Example: "Hi [Creator], we're building a platform for DIYers..."

- [ ] Tier 3 email (template, bulk send)
  - Very generic
  - Quick to customize
  - Example: "Hi [Creator], we love your content on [topic]..."

**Tracking Spreadsheet:**
- [ ] Creator name
- [ ] Email sent date
- [ ] Response received (yes/no)
- [ ] Response date
- [ ] Agreement signed (yes/no)
- [ ] Video URL
- [ ] Featured on platform (yes/no)
- [ ] Status (prospect, partner, declined)

**Success Criteria:**
- Agreement template legal-reviewed
- 3 email templates ready to send
- Tracking system in place
- Ready for outreach campaign

**Depends on:** #14

---

**Issue #16: Launch Tier 1 creator outreach campaign**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`, `critical-path`
**Assignee:** Content Manager
**Points:** 21

**Description:**

Send personalized emails to top 15-20 creators:

**Process:**
- [ ] Select 15-20 Tier 1 creators from database
- [ ] Customize each email (reference their channel/videos)
- [ ] Mention specific video you want to feature
- [ ] Explain value prop (traffic, audience growth)
- [ ] Attach partnership agreement
- [ ] Send via professional email (Gmail with signature)
- [ ] Track send date in spreadsheet

**Timing:**
- [ ] Send 3-5 per day over week 1-2
- [ ] Personalization key (they can tell if mass email)
- [ ] Send during business hours (Tue-Thu, 9-11am)

**Follow-up:**
- [ ] After 7 days, send follow-up if no response
- [ ] Keep tone friendly, not pushy
- [ ] Mention you'd love their input on their niche

**Success Metrics:**
- [ ] Target: 30-50% response rate
- [ ] At least 5 creators agree to partnership
- [ ] Agreements signed and stored

**Tracking:**
- [ ] Update spreadsheet with responses
- [ ] Note any questions/feedback
- [ ] Plan next steps with each creator

**Success Criteria:**
- 15-20 Tier 1 creators contacted
- 5+ positive responses
- 3+ signed agreements
- Contact info for follow-ups

**Depends on:** #14, #15

---

**Issue #17: Begin Tier 2 creator outreach**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`
**Assignee:** Content Manager
**Points:** 16

**Description:**

Send template-based outreach to 30-40 Tier 2 creators:

**Process:**
- [ ] Use template email (less personalized than Tier 1)
- [ ] Customize [CREATOR_NAME] and [TOPIC] fields
- [ ] Send 3-5 per day
- [ ] Track responses in spreadsheet

**Expectations:**
- [ ] Higher response rate than Tier 1 (50-70% typically)
- [ ] Faster decision-making (less established creators often more open)
- [ ] May need simpler partnership terms

**Follow-up:**
- [ ] Follow up after 5 days if no response
- [ ] More flexible on terms if they have questions

**Goal:**
- [ ] Recruit 10-15 Tier 2 creators
- [ ] Build diversity of content

**Success Criteria:**
- 30+ Tier 2 creators contacted
- 10-15 positive responses
- 8+ signed agreements

**Depends on:** #14, #15

---

**Issue #18: Organize approved creator partnerships**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`
**Assignee:** Content Manager
**Points:** 8

**Description:**

Create master list of approved partners with content:

**For Each Approved Creator:**
- [ ] Creator name, channel URL
- [ ] Agreement signed (date)
- [ ] Revenue terms (flat fee, % share, free)
- [ ] Video URLs to feature
- [ ] Guide category & topic
- [ ] Contact (email, preferred method)
- [ ] Status (active, pending, archived)

**Create Master Spreadsheet:**
- [ ] Column for each field above
- [ ] Sort by category
- [ ] Color-code by status
- [ ] Add notes on partnership status

**Organize Folder:**
- [ ] `/partnerships/[creator_name]/agreement.pdf`
- [ ] `/partnerships/[creator_name]/videos.md` (list of video URLs)
- [ ] `/partnerships/[creator_name]/contact.txt` (email, preferred contact method)

**Success Criteria:**
- 10-15+ active creators documented
- Clear status for each partnership
- Video URLs organized by category
- Easy reference for content team

**Depends on:** #16, #17

---

### WEEK 3-5: Content Creation

---

**Issue #19: Write guide intro & content for flooring guides**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`, `critical-path`
**Assignee:** Content Writer
**Points:** 21

**Description:**

Create comprehensive guides for flooring category (4-5 guides):

**Guides to create:**
1. Laying tile floor
2. Installing laminate flooring
3. Cleaning / maintaining hardwood
4. Fixing squeaky floors
5. Patching floor damage

**For Each Guide:**
- [ ] Find/assign creator video
- [ ] Write intro (100-200 words) - why this skill matters
- [ ] Extract steps from video into text (500-1000 words)
- [ ] Capture 1-2 images per step from video
- [ ] Create tools & materials checklist with affiliate links
- [ ] Write safety warnings
- [ ] Write expert tips
- [ ] Create cost breakdown (DIY vs. contractor cost)
- [ ] Write "when to call a professional" section
- [ ] Add related guides (internal links)
- [ ] Creator bio box (name, channel, subscriber count)
- [ ] Proofread for clarity & accuracy
- [ ] SEO optimization (keywords, meta description)

**Tools Needed:**
- [ ] Video editing software (screenshots/frames)
- [ ] Google Docs for drafting
- [ ] Link to affiliate accounts

**Format/Template:**
```
Title: [Guide Title]
Category: Flooring
Difficulty: [Beginner/Intermediate/Advanced]
Time: [X hours]
Cost: [$XXX]
Video: [embed]

## Why This Matters
[Intro paragraph]

## What You'll Need
### Tools
- [tool] (affiliate link)
- [tool] (affiliate link)

### Materials
- [material] (affiliate link)
- [material] (affiliate link)

## Steps
### Step 1: [Step Title]
[Description]
[Image]

[Repeat for each step]

## Expert Tips
- Tip 1
- Tip 2

## Safety First
- Warning 1
- Warning 2

## Cost Breakdown
DIY: $XXX
Contractor: $XXX
Savings: $XXX

## When to Call a Pro
[Guidance]

## Creator
[Creator name], [channel], [X subscribers]

## Related Guides
- [Link]
- [Link]
```

**Success Criteria:**
- 4-5 flooring guides complete
- All include video, text, images, materials list
- Affiliate links embedded
- Proofread and error-free
- SEO-optimized

**Depends on:** #15, #18

---

**Issue #20: Write guides for plumbing & water category**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`, `critical-path`
**Assignee:** Content Writer
**Points:** 21

**Description:**

Create comprehensive guides for plumbing category (4-5 guides):

**Guides to create:**
1. Draining water heater
2. Fixing leaky faucet
3. Unclogging drain
4. Fixing running toilet
5. Winterizing pipes (seasonal)

**Follow same process as #19:**
- [ ] Find/assign creator videos
- [ ] Write intros
- [ ] Extract steps from videos
- [ ] Capture images
- [ ] Create checklists with affiliate links
- [ ] Add safety warnings (important for plumbing!)
- [ ] Cost breakdowns
- [ ] Creator attribution
- [ ] SEO optimization

**Additional Notes:**
- Safety is critical for plumbing — emphasize water shut-off locations
- Tools for plumbing guides: wrenches, adapters, specialized tools
- Link to professional plumbers for complex repairs
- Seasonal guides (winterize in fall)

**Success Criteria:**
- 4-5 plumbing guides complete
- All follow template
- Safety warnings prominent
- Ready for publication

**Depends on:** #15, #18

---

**Issue #21: Write guides for HVAC & AC category**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`, `critical-path`
**Assignee:** Content Writer
**Points:** 16

**Description:**

Create guides for HVAC category (3-4 guides):

**Guides to create:**
1. Cleaning air conditioner filter
2. Cleaning AC unit
3. Changing furnace filter
4. Basic HVAC maintenance

**Follow same process as #19:**
- [ ] Find/assign creator videos
- [ ] Write intros
- [ ] Extract steps
- [ ] Capture images
- [ ] Create checklists
- [ ] Add safety notes (electrical hazards)
- [ ] Cost breakdowns
- [ ] Creator info
- [ ] SEO optimization

**Note:** HVAC is seasonal (spring for AC, fall for furnace)

**Success Criteria:**
- 3-4 HVAC guides complete
- All follow template
- Ready for publication

**Depends on:** #15, #18

---

**Issue #22: Write guides for cabinets & storage category**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`
**Assignee:** Content Writer
**Points:** 16

**Description:**

Create guides for cabinets category (3-4 guides):

**Guides to create:**
1. Replacing cabinet doors
2. Refacing cabinets
3. Installing new shelving
4. Fixing cabinet hinges/handles

**Follow same process as #19:**
- [ ] Find/assign creator videos
- [ ] Write intros
- [ ] Extract steps
- [ ] Capture images
- [ ] Create checklists with tools/materials
- [ ] Add tips (measurement, alignment)
- [ ] Cost breakdowns
- [ ] Creator info
- [ ] SEO optimization

**Success Criteria:**
- 3-4 cabinet guides complete
- All follow template
- Ready for publication

**Depends on:** #15, #18

---

**Issue #23: Write guides for doors & general maintenance**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`
**Assignee:** Content Writer
**Points:** 16

**Description:**

Create guides for doors & general maintenance (4-5 guides):

**Guides to create:**
1. Installing new door
2. Fixing squeaky hinges
3. Replacing doorknob/lock
4. Weatherproofing door
5. Cleaning gutters

**Follow same process as #19:**
- [ ] Find/assign creator videos
- [ ] Write intros
- [ ] Extract steps
- [ ] Capture images
- [ ] Create checklists
- [ ] Add safety warnings
- [ ] Cost breakdowns
- [ ] Creator info
- [ ] SEO optimization

**Success Criteria:**
- 4-5 guides complete
- All follow template
- Total of 20-30 guides ready by end of week 5

**Depends on:** #15, #18

---

### WEEK 4-5: Payments & Affiliate Setup

---

**Issue #24: Set up Stripe account & create products/pricing plans**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`, `critical-path`
**Assignee:** Backend Dev 1
**Points:** 16

**Description:**

Configure Stripe for payment processing:

**Stripe Setup:**
- [ ] Create Stripe account
- [ ] Verify business info
- [ ] Enable webhook signing
- [ ] Generate test & live API keys
- [ ] Store keys in environment variables

**Create Products:**
- [ ] Product: Premium (monthly)
  - [ ] Price: $9.99/month
  - [ ] Price: $99/year (20% discount)
  
- [ ] Product: Pro (monthly)
  - [ ] Price: $24.99/month
  - [ ] Price: $249/year (20% discount)

**Test Mode:**
- [ ] Test all pricing in Stripe test mode
- [ ] Use test credit card (4242 4242 4242 4242)
- [ ] Verify charges go through
- [ ] Test refunds

**Webhook Setup:**
- [ ] Create webhook endpoint: `/api/webhooks/stripe`
- [ ] Configure to listen for:
  - [ ] `charge.succeeded` (payment completed)
  - [ ] `charge.failed` (payment failed)
  - [ ] `customer.subscription.created` (new subscription)
  - [ ] `customer.subscription.updated` (subscription changed)
  - [ ] `customer.subscription.deleted` (subscription cancelled)
- [ ] Webhook handler processes events
- [ ] Update user subscription tier in database

**Documentation:**
- [ ] Document Stripe setup process
- [ ] Document test card numbers
- [ ] Document how to transition to live mode

**Success Criteria:**
- Stripe account fully configured
- Test payments work
- Webhooks receiving events
- Subscription tiers created

**Depends on:** #6

---

**Issue #25: Build subscription checkout page (frontend)**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `frontend`, `critical-path`
**Assignee:** Frontend Dev 1
**Points:** 21

**Description:**

Create pricing page and checkout flow:

**Pricing Page:**
- [ ] Design in Figma (from #5)
- [ ] Display 3 tiers: Free, Premium, Pro
- [ ] For each tier, show:
  - [ ] Price (monthly & annual)
  - [ ] Feature list (checkmarks)
  - [ ] CTA button ("Subscribe" or "Current Plan")
  - [ ] Annual discount badge (20% off)

- [ ] Free tier:
  - [ ] Display as "Current" if user not subscribed
  - [ ] Grayed out features
  - [ ] No button (already on free tier)

- [ ] Premium & Pro:
  - [ ] "Upgrade" button with tier and price
  - [ ] Annual/monthly toggle (update price)
  - [ ] Click button → Stripe checkout

**Checkout Page:**
- [ ] Use Stripe Hosted Checkout or Stripe Elements
- [ ] Display:
  - [ ] Selected tier & price
  - [ ] Subscription term (monthly/annual)
  - [ ] User email (pre-filled)
  - [ ] Payment method entry (card details)
  - [ ] Billing address (optional)
  - [ ] "Subscribe" button

- [ ] Error handling:
  - [ ] Invalid card → show error
  - [ ] Network error → retry button
  - [ ] Duplicate subscription → message

- [ ] Success:
  - [ ] Redirect to dashboard
  - [ ] Show "Welcome, Premium Member!" message
  - [ ] Update UI to show new tier
  - [ ] Hide "Upgrade" buttons

**Confirmation Email:**
- [ ] Send email after successful payment
- [ ] Include: subscription tier, price, renewal date, how to manage

**Responsive Design:**
- [ ] Mobile: single column, large buttons
- [ ] Desktop: 3-column tier layout
- [ ] Tablet: 3-column or responsive grid

**Testing:**
- [ ] Test signup → pricing page
- [ ] Test upgrading from free tier
- [ ] Test choosing monthly vs. annual
- [ ] Test payment flow with Stripe test card
- [ ] Test error handling (invalid card, etc.)
- [ ] Test post-payment redirect

**Success Criteria:**
- Pricing page displays all tiers
- Upgrade button works
- Checkout flow works end-to-end
- Payment successful → user tier updated
- Confirmation email sent

**Depends on:** #24, #7, #5

---

**Issue #26: Implement backend subscription & payment flow**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`, `critical-path`
**Assignee:** Backend Dev 1
**Points:** 21

**Description:**

Build backend logic for subscription management:

**Endpoints:**

- [ ] `POST /api/subscriptions/checkout`
  - Input: tier (premium or pro), billing_cycle (monthly or annual)
  - Output: Stripe checkout session URL
  - Action: Create checkout session in Stripe, return session_id for redirect
  - Auth required: yes

- [ ] `GET /api/subscriptions/status`
  - Output: current user's subscription (tier, renewal_date, status)
  - Auth required: yes
  - Return: "free" or {"tier": "premium", "renewal_date": "2024-05-15"}

- [ ] `POST /api/subscriptions/cancel`
  - Output: success message
  - Action: Cancel subscription in Stripe, set subscription_end_date in database
  - Auth required: yes
  - Notes: User still has access until renewal_date

- [ ] `PATCH /api/subscriptions/update-tier`
  - Input: new_tier
  - Output: updated subscription
  - Action: Update subscription in Stripe, update database
  - Auth required: yes

**Webhook Handler:**
- [ ] `/api/webhooks/stripe` (from #24)
- [ ] Listen for subscription events
- [ ] Update user.subscription_tier in database
- [ ] Log all events for debugging

**Database Updates:**
- [ ] Update `users.subscription_tier` (free, premium, pro)
- [ ] Add `users.stripe_customer_id` (to link user to Stripe customer)
- [ ] Update `subscriptions` table:
  - [ ] user_id, tier, start_date, renewal_date, stripe_subscription_id, status

**Billing Logic:**
- [ ] Monthly: auto-renews every 30 days
- [ ] Annual: auto-renews every 365 days
- [ ] Failed payment: retry 3 times, then downgrade to free
- [ ] Cancellation: keep access until renewal_date, then downgrade

**Testing:**
- [ ] Test checkout session creation
- [ ] Test webhook receiving payment success
- [ ] Test webhook receiving payment failure
- [ ] Test user tier update in database
- [ ] Test subscription cancellation
- [ ] Test access control (premium users can view premium content)

**Success Criteria:**
- Checkout works end-to-end
- Stripe webhooks update user tier
- Cancelled users downgrade to free
- Failed payments handled gracefully

**Depends on:** #24, #8, #10

---

**Issue #27: Set up affiliate marketing accounts & integrate links**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`
**Assignee:** Content Manager
**Points:** 16

**Description:**

Create affiliate accounts and embed product links in guides:

**Accounts to Set Up:**
- [ ] Amazon Associates
  - [ ] Sign up
  - [ ] Get affiliate ID
  - [ ] Store in environment variable

- [ ] Home Depot affiliate program
  - [ ] Sign up through affiliate network
  - [ ] Get affiliate ID
  - [ ] Setup tracking

- [ ] Lowe's affiliate program
  - [ ] Similar setup

- [ ] Specialty tool brands (DeWalt, Makita, etc.)
  - [ ] Identify top tools used in guides
  - [ ] Sign up for affiliate programs
  - [ ] Get affiliate IDs

**Create Product Database:**
- [ ] For each tools/material category:
  - [ ] Product name
  - [ ] Affiliate link (Amazon, Home Depot, etc.)
  - [ ] Price (from retailer)
  - [ ] Image (product photo)
  - [ ] Budget tier (budget/mid-range/pro)

**Embed in Guides:**
- [ ] Tools needed section → affiliate links
- [ ] Materials needed section → affiliate links
- [ ] Alternative options (budget vs. pro)
- [ ] "Buy on Amazon" / "Buy on Home Depot" buttons

**Tracking:**
- [ ] Create analytics dashboard
  - [ ] Clicks per guide
  - [ ] Clicks per product
  - [ ] CTR by guide category
  - [ ] Monthly commission earnings

**Transparency:**
- [ ] Add disclaimer: "We earn commission from affiliate links"
- [ ] Place near affiliate links

**Testing:**
- [ ] Click affiliate links → goes to correct product page
- [ ] Tracking works (cookies stored, impressions logged)
- [ ] Links work on mobile

**Success Criteria:**
- Affiliate accounts set up
- 20-30 guides have product links
- Tracking dashboard working
- Ready to earn commissions

**Depends on:** #19-23

---

### WEEK 5-6: Video & Analytics Setup

---

**Issue #28: Set up video hosting & player component**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `frontend`, `video`
**Assignee:** Frontend Dev 2
**Points:** 16

**Description:**

Configure video hosting and create embeddable player:

**Choose Video Host:**
- [ ] Option 1: Vimeo (recommended)
  - [ ] Pro: Quality, customizable player, analytics
  - [ ] Cost: ~$25/month starter plan
  - [ ] Embed via iframe

- [ ] Option 2: YouTube (free, but limited control)
  - [ ] Embed via iframe
  - [ ] Use unlisted videos for privacy

- [ ] Option 3: Self-hosted on S3 (complex, but full control)
  - [ ] Requires video transcoding
  - [ ] More expensive at scale

**Recommendation:** Vimeo for first 100 guides

**Video Player Component:**
- [ ] Create React component `<VideoPlayer>`
- [ ] Input props: video_id, title, thumbnail
- [ ] Features:
  - [ ] Responsive (16:9 aspect ratio)
  - [ ] Play/pause controls
  - [ ] Volume control
  - [ ] Fullscreen option
  - [ ] Quality selector (if available)
  - [ ] Playback speed (0.75x, 1x, 1.25x, 1.5x)
  - [ ] Progress bar / seek
  - [ ] Show video title

- [ ] Responsive:
  - [ ] Mobile: full width, smaller controls
  - [ ] Desktop: 800px width (or larger with sidebar)
  - [ ] Tablet: flexible width

**Video Analytics:**
- [ ] Track:
  - [ ] Video started (user hits play)
  - [ ] Video paused/resumed
  - [ ] Video completed (90%+ watched)
  - [ ] Playback quality
  - [ ] Duration watched
  - [ ] Drop-off points (when users leave)

- [ ] Use event tracking (from #1.9)
  - [ ] Send event when video milestone reached (25%, 50%, 75%, 100%)

**Fallback UI:**
- [ ] If video unavailable:
  - [ ] Show message: "Video unavailable"
  - [ ] Show text guide instead
  - [ ] Link to creator's channel

**Testing:**
- [ ] Video plays on desktop, mobile, tablet
- [ ] Controls work (play, pause, volume, fullscreen, speed)
- [ ] Responsive layout correct
- [ ] Analytics events logged
- [ ] Fallback shows if video missing

**Success Criteria:**
- Video player component built
- Plays guides from Vimeo/YouTube
- Analytics tracking works
- Mobile responsive

**Depends on:** #7, #18

---

**Issue #29: Set up analytics event tracking**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`, `analytics`
**Assignee:** Backend Dev 1
**Points:** 16

**Description:**

Configure analytics for user behavior tracking:

**Choose Analytics Platform:**
- [ ] Option 1: Mixpanel (recommended for B2C)
  - [ ] Free tier: 100K events/month
  - [ ] Pro: Funnel analysis, cohorts, retention
  
- [ ] Option 2: Amplitude
  - [ ] Similar to Mixpanel
  - [ ] Strong free tier

- [ ] Option 3: Google Analytics
  - [ ] Free, familiar to most
  - [ ] Less detailed cohort analysis

**Recommendation:** Mixpanel

**Events to Track:**

*User Actions:*
- [ ] `user_signup` (name, email, timestamp)
- [ ] `user_login` (user_id, timestamp)
- [ ] `user_logout` (user_id, timestamp)
- [ ] `view_guide` (user_id, guide_id, timestamp)
- [ ] `upgrade_clicked` (user_id, tier, timestamp)
- [ ] `checkout_started` (user_id, tier, timestamp)
- [ ] `payment_success` (user_id, tier, amount, timestamp)
- [ ] `payment_failed` (user_id, tier, error, timestamp)
- [ ] `subscription_cancelled` (user_id, tier, reason, timestamp)
- [ ] `guide_saved` (user_id, guide_id, timestamp)
- [ ] `affiliate_link_clicked` (user_id, product_id, timestamp)

*Video Actions:*
- [ ] `video_started` (user_id, guide_id, timestamp)
- [ ] `video_completed` (user_id, guide_id, timestamp)
- [ ] `video_milestone` (user_id, guide_id, milestone: 25/50/75%, timestamp)

*Content Actions:*
- [ ] `guide_rated` (user_id, guide_id, rating, timestamp)
- [ ] `guide_searched` (user_id, search_query, timestamp)

**Implementation:**

*Frontend:*
- [ ] Install Mixpanel SDK
- [ ] Initialize with project token
- [ ] Create helper function: `trackEvent(event_name, properties)`
- [ ] Call from React components:
  - [ ] On guide view
  - [ ] On button click (upgrade)
  - [ ] On form submit (signup, login)
  - [ ] On video events

*Backend:*
- [ ] Also track backend events
- [ ] Log payment success/failure from Stripe webhooks
- [ ] Log user registration
- [ ] Send to Mixpanel API

**Dashboard & Reports:**
- [ ] Create Mixpanel dashboards:
  - [ ] Daily active users (DAU)
  - [ ] Signup funnel (visitor → signed up → premium)
  - [ ] Payment funnel (checkout → success)
  - [ ] Popular guides
  - [ ] Video completion rate
  - [ ] Churn rate

**Testing:**
- [ ] Trigger events manually
- [ ] Verify they appear in Mixpanel
- [ ] Check event properties are correct
- [ ] Test across frontend & backend events

**Success Criteria:**
- All key events tracked
- Analytics dashboard created
- Can see user behavior and funnels
- Ready for data-driven optimization

**Depends on:** #7, #6

---

### WEEK 6-7: Testing, QA, & Launch Prep

---

**Issue #30: Write & run unit tests (backend APIs)**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`, `testing`
**Assignee:** QA Engineer / Backend Dev
**Points:** 21

**Description:**

Write comprehensive unit tests for backend:

**Testing Framework:**
- [ ] Install Jest (testing framework)
- [ ] Install Supertest (HTTP testing)
- [ ] Configure test environment

**Unit Tests - Authentication:**
- [ ] Test password hashing
- [ ] Test password verification
- [ ] Test JWT creation
- [ ] Test JWT validation
- [ ] Test token expiration
- [ ] Test invalid tokens

**Unit Tests - Database Queries:**
- [ ] Test user creation query
- [ ] Test user update query
- [ ] Test guide query
- [ ] Test bookmark/save queries
- [ ] Test subscription query

**Integration Tests - API Endpoints:**
- [ ] POST /api/auth/signup
  - [ ] Valid data → creates user, returns token
  - [ ] Duplicate email → error
  - [ ] Invalid email → error
  - [ ] Weak password → error

- [ ] POST /api/auth/login
  - [ ] Valid credentials → returns token
  - [ ] Invalid password → error
  - [ ] User not found → error
  - [ ] Rate limiting works

- [ ] GET /api/guides
  - [ ] Returns list of guides
  - [ ] Pagination works
  - [ ] Filters work (category, difficulty)
  - [ ] Search works

- [ ] GET /api/guides/:id
  - [ ] Returns guide details
  - [ ] Free tier can see title/description
  - [ ] Premium tier can see video URL
  - [ ] Guide not found → 404

- [ ] POST /api/subscriptions/checkout
  - [ ] Valid tier → creates Stripe session
  - [ ] Invalid tier → error
  - [ ] Auth required → 401 if no token

**Test Coverage:**
- [ ] Target: 80%+ code coverage
- [ ] Run coverage report: `npm test -- --coverage`

**Test Data:**
- [ ] Create fixtures for test data
- [ ] Seed test database before each test
- [ ] Cleanup after each test

**CI/CD Integration:**
- [ ] Tests run on every PR
- [ ] Failing tests block merge
- [ ] Coverage reports generated

**Success Criteria:**
- 80%+ code coverage
- All critical APIs tested
- Tests passing
- Ready for QA

**Depends on:** #6, #8, #9, #10

---

**Issue #31: Write end-to-end (E2E) tests**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `testing`
**Assignee:** QA Engineer
**Points:** 21

**Description:**

Write E2E tests for critical user flows:

**Testing Framework:**
- [ ] Install Playwright or Cypress
- [ ] Configure for local & CI/CD

**E2E Test Scenarios:**

**User Registration & Login:**
- [ ] Signup with new account
  - [ ] Verify user lands on home page
  - [ ] Verify user is logged in (token in localStorage)
  - [ ] Verify profile shows correct name/email

- [ ] Login with existing account
  - [ ] Verify user redirected to home page
  - [ ] Verify user can view guides

- [ ] Logout
  - [ ] Verify user redirected to login page
  - [ ] Verify token cleared

**Browsing Guides:**
- [ ] View guide list
  - [ ] Verify guides load
  - [ ] Verify pagination works
  - [ ] Verify filters work

- [ ] View individual guide
  - [ ] Verify guide content loads
  - [ ] Verify video player works
  - [ ] Verify tools/materials list displays

**Subscription Flow:**
- [ ] Free user upgrades to Premium
  - [ ] Click upgrade button
  - [ ] Go through Stripe checkout (test card)
  - [ ] Verify payment success
  - [ ] Verify user tier updated
  - [ ] Verify can now see premium content

- [ ] View premium-only content
  - [ ] Free user tries to view video → sees upgrade prompt
  - [ ] Premium user views video → works

**Search & Discovery:**
- [ ] Search for guide
  - [ ] Enter search term
  - [ ] Results load
  - [ ] Can click result to view guide

**Test Data:**
- [ ] Create test user accounts
- [ ] Create test guides in database
- [ ] Use Stripe test cards for payment

**CI/CD Integration:**
- [ ] Tests run in GitHub Actions
- [ ] Tests run headless (no GUI)
- [ ] Failing tests block deploy

**Reporting:**
- [ ] Generate test report
- [ ] Screenshots of failures
- [ ] Video recordings of failed tests

**Success Criteria:**
- All critical flows tested
- E2E tests passing
- Tests run in CI/CD

**Depends on:** #7, #6, #25

---

**Issue #32: Manual QA & testing**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `testing`, `critical-path`
**Assignee:** QA Engineer + Team
**Points:** 21

**Description:**

Comprehensive manual testing of entire application:

**Device & Browser Testing:**
- [ ] Desktop
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)

- [ ] Mobile (iOS & Android)
  - [ ] iPhone 14 Pro (Safari)
  - [ ] Pixel 6 (Chrome)
  - [ ] iPad (Safari)

- [ ] Responsive design
  - [ ] Test at 320px, 768px, 1024px, 1440px widths
  - [ ] Verify layout adapts properly

**Functional Testing:**

*Authentication:*
- [ ] Signup with valid data → creates account, logs in
- [ ] Signup with duplicate email → error message
- [ ] Login with valid credentials → logs in
- [ ] Login with wrong password → error message
- [ ] Logout → redirects to login
- [ ] Forgot password → reset email sent
- [ ] Reset password with valid token → password changes

*Guides:*
- [ ] Browse guides → list loads
- [ ] Filter by category → shows only that category
- [ ] Filter by difficulty → works
- [ ] Search for guide → results appear
- [ ] Click guide → detail page loads
- [ ] Video plays
- [ ] Tools/materials display
- [ ] Related guides show
- [ ] Save guide → bookmarks it
- [ ] View saved guides → shows bookmarked guides

*Subscription:*
- [ ] Free user clicks upgrade → redirects to pricing
- [ ] Select Premium → shows checkout
- [ ] Enter valid test card → payment processes
- [ ] After payment → can view premium content
- [ ] Premium user can cancel → subscription cancels
- [ ] After cancellation → can still access until renewal date

*Forms:*
- [ ] All form fields have labels
- [ ] Required fields show error if empty
- [ ] Email field validates email format
- [ ] Password confirmation matches
- [ ] Submit button disabled while loading
- [ ] Error messages clear and helpful

**Performance Testing:**
- [ ] Page load time <2 seconds
- [ ] Video starts playing <1 second
- [ ] Search results <200ms
- [ ] API responses <500ms
- [ ] Images optimized (not loading 4MB images)

**Accessibility Testing:**
- [ ] Tab navigation works (keyboard-only user)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Buttons have clear focus states
- [ ] Forms have associated labels
- [ ] Links are underlined or clearly distinguishable
- [ ] Video has captions (if available)
- [ ] Screen reader compatible (test with VoiceOver/NVDA)

**Security Testing:**
- [ ] HTTPS enabled
- [ ] Sensitive data encrypted (passwords, payment)
- [ ] SQL injection attempts fail gracefully
- [ ] XSS attempts sanitized
- [ ] CSRF tokens present on forms
- [ ] No API keys/secrets exposed in code

**Bug Reporting:**
- [ ] Create GitHub issue for each bug found
- [ ] Include: device, browser, steps to reproduce, expected vs actual, screenshot
- [ ] Triage (critical, high, medium, low)
- [ ] Assign to dev, track through to resolution

**Success Criteria:**
- No critical bugs
- No more than 5 high-priority bugs
- All other bugs documented
- App ready for launch

**Depends on:** All technical issues

---

**Issue #33: Create landing page & privacy policy**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`
**Assignee:** Marketing / Content
**Points:** 16

**Description:**

Build marketing website and legal documents:

**Landing Page (`/`):**
- [ ] Hero section
  - [ ] Large heading: "Learn DIY from Experts"
  - [ ] Subheading: "New guides every week"
  - [ ] Hero image or video
  - [ ] CTA button: "Get Started Free"

- [ ] Feature highlights
  - [ ] "Hundreds of guides"
  - [ ] "Expert creators"
  - [ ] "Save thousands"
  - [ ] "Step-by-step video"
  - [ ] Icons for each

- [ ] How it works section
  - [ ] Browse guides
  - [ ] Watch video
  - [ ] Complete project
  - [ ] Save money

- [ ] Pricing section
  - [ ] Free, Premium, Pro tiers
  - [ ] Feature comparison

- [ ] Social proof
  - [ ] "Join 5K+ homeowners"
  - [ ] Testimonials (placeholder, gather real ones later)
  - [ ] Creator partner logos

- [ ] FAQ section
  - [ ] Common questions about the platform
  - [ ] How to use, pricing, technical support

- [ ] CTA section
  - [ ] "Ready to save on your next project?"
  - [ ] Button: "Sign Up Free"

- [ ] Footer
  - [ ] Links to privacy, terms, contact
  - [ ] Social media links
  - [ ] Email signup

**Privacy Policy:**
- [ ] Legal template
- [ ] Define: data collection, usage, cookies
- [ ] GDPR compliance (EU users)
- [ ] Right to deletion
- [ ] Contact for privacy questions
- [ ] Publish at `/privacy`

**Terms of Service:**
- [ ] Legal template
- [ ] Define: acceptable use, liability, copyright
- [ ] Content creator rights
- [ ] Affiliate link disclosure
- [ ] Publish at `/terms`

**FAQ Page:**
- [ ] Q: How often are guides published? A: Weekly
- [ ] Q: Can I download guides? A: Premium only
- [ ] Q: Do you offer refunds? A: Yes, 30-day money-back
- [ ] Q: How do you choose creators? A: [Criteria]
- [ ] Q: Can I request a guide? A: [Contact info]

**Legal Review:**
- [ ] Have lawyer review privacy policy
- [ ] Have lawyer review terms of service
- [ ] Ensure compliance with FTC (affiliate disclosure)
- [ ] Ensure GDPR compliance (if EU users)

**Success Criteria:**
- Landing page complete
- Privacy policy published
- Terms of service published
- Legal compliant

**Depends on:** #7

---

**Issue #34: Create creator partnerships landing page**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `content`
**Assignee:** Marketing
**Points:** 13

**Description:**

Build page to recruit new creators:

**Creator Page (`/creators`):**
- [ ] Heading: "Grow Your Audience"
- [ ] Subheading: "Get your DIY videos in front of thousands of homeowners"

- [ ] Value prop:
  - [ ] "Reach 50K+ homeowners"
  - [ ] "Get paid for your content"
  - [ ] "Build your personal brand"
  - [ ] "No production costs"

- [ ] How it works:
  - [ ] Submit your video
  - [ ] We feature it on our platform
  - [ ] Earn revenue from referrals
  - [ ] Grow your audience

- [ ] Featured creators:
  - [ ] Showcase 5-10 partner creators
  - [ ] Name, channel, subscriber count
  - [ ] Testimonial (if available)
  - [ ] Link to their channel

- [ ] Partnership tiers:
  - [ ] Free partnership (affiliate links)
  - [ ] Revenue share partnership (% of subscriptions)
  - [ ] Featured creator partnership (exclusive benefits)

- [ ] CTA:
  - [ ] Form: creator name, channel URL, email, niche
  - [ ] "Join Our Creator Network"

**Backend:**
- [ ] Create `/api/creators/apply` endpoint
- [ ] Capture: name, email, channel_url, niche
- [ ] Send to admin email for review
- [ ] Auto-response email to creator

**Email Response:**
- [ ] Thank you email
- [ ] Next steps
- [ ] Link to partnership agreement

**Success Criteria:**
- Creator recruitment page live
- Signup form working
- Emails being sent to admins

**Depends on:** #7

---

**Issue #35: Set up email & notification system**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `backend`
**Assignee:** Backend Dev 2
**Points:** 16

**Description:**

Configure email and in-app notifications:

**Email Service:**
- [ ] Choose provider: SendGrid, Mailgun, or AWS SES
- [ ] Create account & verify domain
- [ ] Generate API key
- [ ] Store in environment variables

**Email Templates:**

- [ ] Welcome email (signup)
  - [ ] Subject: "Welcome to [App]!"
  - [ ] Body: Welcome message, link to guides
  - [ ] CTA: "Browse Guides"

- [ ] Payment confirmation
  - [ ] Subject: "Subscription Confirmed"
  - [ ] Body: Tier, price, renewal date
  - [ ] CTA: "View Your Account"

- [ ] Payment failed
  - [ ] Subject: "Payment Failed - Update Required"
  - [ ] Body: Reason, instructions to fix
  - [ ] CTA: "Update Payment Method"

- [ ] Subscription cancelled
  - [ ] Subject: "We'll Miss You!"
  - [ ] Body: Reason survey, special offer
  - [ ] CTA: "Resubscribe"

- [ ] Password reset
  - [ ] Subject: "Reset Your Password"
  - [ ] Body: Reset link (valid 24 hours)
  - [ ] CTA: "Reset Password"

- [ ] Creator application response
  - [ ] Subject: "Your Creator Application"
  - [ ] Body: Accepted/rejected, next steps
  - [ ] CTA: "Review Partnership"

**Send Email Endpoint:**
- [ ] Create helper function: `sendEmail(to, template_name, variables)`
- [ ] Call from appropriate endpoints:
  - [ ] After signup
  - [ ] After payment success
  - [ ] After payment failure
  - [ ] Password reset request
  - [ ] Creator application received

**Email Logging:**
- [ ] Log all sent emails to database
- [ ] Track delivery status
- [ ] Track open rate (with pixel)
- [ ] Track click rate

**In-App Notifications:**
- [ ] Create notification component
- [ ] Types: success, error, warning, info
- [ ] Auto-dismiss after 5 seconds
- [ ] Can be dismissed manually
- [ ] Show in top-right corner

**Testing:**
- [ ] Send test emails to real email address
- [ ] Verify subject line, content, links
- [ ] Test email links work
- [ ] Test password reset email

**Success Criteria:**
- All transactional emails sent
- Email delivery tracked
- In-app notifications working
- Ready for launch

**Depends on:** #6, #8, #25

---

**Issue #36: Final security & performance audit**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `infrastructure`
**Assignee:** Tech Lead
**Points:** 13

**Description:**

Comprehensive security and performance review before launch:

**Security Audit:**
- [ ] Dependency audit: `npm audit` - fix all high/critical vulnerabilities
- [ ] OWASP Top 10 review:
  - [ ] Injection attacks (SQL, NoSQL) - use parameterized queries
  - [ ] Broken auth - JWT properly implemented
  - [ ] XSS prevention - sanitize user input
  - [ ] CSRF protection - tokens on forms
  - [ ] Sensitive data - HTTPS, encryption
  - [ ] Access control - check subscription tier
  - [ ] Security misconfiguration - hardened headers (helmet.js)
  - [ ] Insecure deserialization - validate JSON
  - [ ] Using components with known vulnerabilities - fixed above
  - [ ] Insufficient logging - log security events

- [ ] SSL/TLS certificate valid and up-to-date
- [ ] No API keys/secrets in code or version control
- [ ] .env files not committed
- [ ] Sensitive endpoints require authentication
- [ ] Password requirements enforced
- [ ] Rate limiting on auth endpoints
- [ ] Session timeouts implemented
- [ ] CORS properly configured (not "*")

**Performance Audit:**
- [ ] Page load time <2s (use Lighthouse)
- [ ] Video start time <1s
- [ ] Search response <200ms
- [ ] Images optimized (WebP, lazy-loading)
- [ ] CSS minified & combined
- [ ] JavaScript minified
- [ ] Caching headers set (static assets)
- [ ] Database queries optimized (no N+1)
- [ ] Pagination implemented (don't load 1000 guides at once)
- [ ] Database indexes on frequently queried columns

**Tools:**
- [ ] Google Lighthouse
- [ ] WebPageTest
- [ ] GTmetrix
- [ ] npm audit
- [ ] OWASP ZAP (security scanning)

**Checklist to Fix Issues:**
- [ ] Update vulnerable dependencies
- [ ] Add security headers (helmet.js)
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Enable compression (gzip)
- [ ] Add database indexes
- [ ] Implement caching (Redis)
- [ ] Set up CDN (CloudFront)
- [ ] Test on slow network (throttle in DevTools)

**Success Criteria:**
- No critical security issues
- Lighthouse score 80+
- Page load <2s
- Zero API key leaks
- HTTPS enabled
- Ready for production

**Depends on:** All technical issues

---

### WEEK 7-8: Launch Prep & Go-Live

---

**Issue #37: Create deployment runbook & launch checklist**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `infrastructure`
**Assignee:** Tech Lead
**Points:** 13

**Description:**

Document deployment process and pre-launch checklist:

**Deployment Runbook:**
- [ ] Steps to deploy to staging
- [ ] Steps to deploy to production
- [ ] Rollback procedure (if something breaks)
- [ ] Database migration process
- [ ] Cache invalidation
- [ ] Health checks
- [ ] Monitoring alerts

**Pre-Launch Checklist:**
- [ ] All code merged to main branch
- [ ] All tests passing
- [ ] Staging environment tested
- [ ] Database backup created
- [ ] Monitoring & alerts active
- [ ] Support team trained
- [ ] Emergency contacts documented
- [ ] DNS propagated
- [ ] SSL certificate valid
- [ ] Email service working
- [ ] Stripe in live mode
- [ ] Analytics tracking active
- [ ] Sentry/error tracking active
- [ ] Load balancer configured
- [ ] Auto-scaling rules set
- [ ] Backup & disaster recovery tested

**Launch Day Checklist:**
- [ ] Deploy to production
- [ ] Run smoke tests
- [ ] Verify users can signup
- [ ] Verify users can purchase
- [ ] Monitor error logs
- [ ] Monitor database load
- [ ] Monitor server CPU/memory
- [ ] Check email delivery
- [ ] Verify analytics events
- [ ] Send launch announcement email
- [ ] Post on social media
- [ ] Stand by for support

**Post-Launch (24 hours):**
- [ ] Review error logs
- [ ] Check conversion metrics
- [ ] Monitor server stability
- [ ] Respond to user feedback
- [ ] Fix any critical bugs
- [ ] Publish launch blog post

**Success Criteria:**
- Runbook documented
- Checklist created
- Team trained on procedure
- Ready for launch

**Depends on:** All technical issues

---

**Issue #38: Prepare launch email sequence & social media**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `marketing`
**Assignee:** Marketing
**Points:** 13

**Description:**

Create marketing materials for launch:

**Email Sequence (5 emails):**

Email 1 - Launch Announcement (Day 1)
- [ ] Subject: "We're Live! Learn DIY from Experts"
- [ ] Content: What the platform is, main features
- [ ] CTA: "Get Started Free"

Email 2 - Feature Spotlight (Day 2)
- [ ] Subject: "Here's How to Save $500+ on Your Next Project"
- [ ] Content: Cost calculator, savings examples
- [ ] CTA: "Browse Guides"

Email 3 - Creator Highlights (Day 3)
- [ ] Subject: "Meet Our Expert Creators"
- [ ] Content: Featured creators, their channels
- [ ] CTA: "Explore Guides"

Email 4 - Upgrade Pitch (Day 5)
- [ ] Subject: "Unlock Premium Guides"
- [ ] Content: Premium features, benefits
- [ ] CTA: "Upgrade to Premium"

Email 5 - Win-back (Day 7)
- [ ] Subject: "Complete Your First Project with Us"
- [ ] Content: Success stories, tips
- [ ] CTA: "Start Learning"

**Social Media Posts:**

Twitter/X:
- [ ] "We're live! 🎉 Learn DIY from experts. New guides every week. Save thousands on your next project. https://[yourapp]"
- [ ] "Ever wanted to [tile a floor / drain water heater]? Our guides show you how. Save $$$. https://[yourapp]"
- [ ] "Featuring creators like @[creator]. Watch their expertise live on our platform. https://[yourapp]"

Instagram:
- [ ] Beautiful graphic: Platform logo + headline
- [ ] Caption: "DIY guides you actually want to watch. Come learn from experts."
- [ ] Photo: Before/after home improvement project
- [ ] Caption: "Save $$$ by doing it yourself. We show you how."

LinkedIn (B2B angle):
- [ ] "We're building the platform for DIY education. Real experts, real guides, real savings."
- [ ] Mention partnerships with creators
- [ ] Mention B2B opportunities

**Press Release:**
- [ ] Write 300-word press release
- [ ] Headline: "[App] Launches DIY Guide Platform with Expert Creator Partnerships"
- [ ] Send to tech blogs, home improvement publications
- [ ] Include quotes from founders

**Launch Blog Post:**
- [ ] 800-word blog post on why DIY matters
- [ ] Product tour (screenshots)
- [ ] Creator interview (optional)
- [ ] Publish on day 1

**Success Criteria:**
- Email sequence drafted
- Social posts scheduled
- Press release sent
- Blog post published

**Depends on:** #33

---

**Issue #39: Train support team & create FAQ**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `ops`
**Assignee:** Operations
**Points:** 13

**Description:**

Prepare support team for launch:

**FAQ Document:**
- [ ] How do I signup?
- [ ] How do I upgrade to Premium?
- [ ] How do I cancel my subscription?
- [ ] Can I get a refund?
- [ ] How do I reset my password?
- [ ] Why can't I see the video? (free tier explanation)
- [ ] How often are guides published?
- [ ] Can I request a guide?
- [ ] How do you choose guides?
- [ ] How do creators earn money?
- [ ] Is there an app?
- [ ] What's your refund policy?
- [ ] How do I contact support?
- [ ] Is my payment information secure?
- [ ] What if I find an error in a guide?

**Support Email Template:**
- [ ] Professional signature
- [ ] Standard template for common issues
- [ ] Escalation path (when to involve management)
- [ ] Response time SLA (target: 24 hours)

**Support Tools:**
- [ ] Email address: support@[yourapp].com
- [ ] Email forwarding configured
- [ ] Shared inbox (Frontdesk, Helpscout, or similar)
- [ ] Ticketing system set up
- [ ] Knowledge base (if using)

**Support Team Training:**
- [ ] Product walkthrough (signup, upgrade, guides)
- [ ] Common issues and solutions
- [ ] Refund policy and process
- [ ] Escalation procedures
- [ ] How to handle creator issues

**Contact Page (`/contact`):**
- [ ] Support email
- [ ] Contact form
- [ ] FAQ link
- [ ] Expected response time

**Success Criteria:**
- FAQ written
- Support email configured
- Team trained
- Ready to handle day-1 questions

**Depends on:** All

---

**Issue #40: Go-live execution**

**Milestone:** MVP - Week 1-8
**Labels:** `phase-1`, `critical-path`
**Assignee:** Tech Lead + Full Team
**Points:** 34 (half-day launch event)

**Description:**

Execute the official public launch:

**Pre-Launch (6 hours before):**
- [ ] Final checks on production system
- [ ] Database backup created
- [ ] All monitoring alerts active
- [ ] Team on standby
- [ ] Support email monitored
- [ ] Incident response plan ready

**Launch Time (Day 1, 9:00 AM):**
- [ ] Post on social media (Twitter, Instagram, LinkedIn)
- [ ] Send launch email to waitlist
- [ ] Push launch blog post
- [ ] Notify creator partners ("We're live!")
- [ ] Monitor error logs
- [ ] Monitor server resources
- [ ] Watch analytics for first users

**First 1 Hour:**
- [ ] Check that users can signup
- [ ] Check that users can view guides
- [ ] Check that users can upgrade
- [ ] Verify emails are sending
- [ ] Respond to early feedback

**First 24 Hours:**
- [ ] Monitor system stability
- [ ] Check for bugs/errors
- [ ] Engage with early users (Twitter, email)
- [ ] Fix critical bugs immediately
- [ ] Document any issues
- [ ] Celebrate! 🎉

**Post-Launch (Day 2+):**
- [ ] Daily standups on metrics
- [ ] Monitor conversion rate
- [ ] Monitor churn
- [ ] Fix bugs (prioritize critical)
- [ ] Respond to user feedback
- [ ] Iterate based on data

**Launch Day Metrics to Track:**
- [ ] Signups (target: 100+)
- [ ] Premium conversions (target: 5-10)
- [ ] Error rate (target: <1%)
- [ ] Page load time (target: <2s)
- [ ] Uptime (target: 100%)

**Success Criteria:**
- System stable
- Users can signup and use app
- No critical bugs
- 100+ signups
- Conversion rate 5%+
- Ready for phase 2

**Depends on:** All other issues

---

## PHASE 2: Growth (Weeks 9-16)

### Issue #41-50 (Abbreviated)

Once Phase 1 MVP is live and stable, Phase 2 focuses on:

- [ ] **Issue #41:** Expand content library (50-100 guides)
- [ ] **Issue #42:** Creator onboarding dashboard
- [ ] **Issue #43:** Pro tier expert chat interface
- [ ] **Issue #44:** Interactive checklists
- [ ] **Issue #45:** PDF export functionality
- [ ] **Issue #46:** Marketplace/affiliate optimization
- [ ] **Issue #47:** Mobile PWA optimization
- [ ] **Issue #48:** Email marketing automation
- [ ] **Issue #49:** B2B partnership outreach
- [ ] **Issue #50:** SEO & content marketing

---

## PHASE 3: Scale (Weeks 17-26)

### Issue #51-60 (Abbreviated)

After Phase 2 growth, Phase 3 focuses on:

- [ ] **Issue #51:** Native mobile app (iOS/Android)
- [ ] **Issue #52:** Advanced analytics dashboard
- [ ] **Issue #53:** Materials marketplace (dropship)
- [ ] **Issue #54:** Expert consultation booking
- [ ] **Issue #55:** Community features
- [ ] **Issue #56:** Custom project planning
- [ ] **Issue #57:** Contractor marketplace
- [ ] **Issue #58:** AR preview features
- [ ] **Issue #59:** AI recommendations
- [ ] **Issue #60:** Infrastructure scaling

---

## How to Import These Issues

**Option 1: Manual (one at a time)**
1. Copy an issue
2. Go to GitHub Repo → Issues → New Issue
3. Paste title
4. Paste description
5. Add labels (phase-1, backend, etc.)
6. Add to milestone (MVP)
7. Assign team member

**Option 2: Bulk Import (GitHub CLI)**
```bash
# Install GitHub CLI: https://cli.github.com/

# Create each issue:
gh issue create --title "Set up GitHub repository structure" --body "Create the main GitHub..." --label "phase-1,infrastructure,critical-path" --milestone "MVP"
```

**Option 3: Via API** (if you're comfortable with curl/scripts)
Use GitHub REST API to bulk create issues

---

## Total Issues: 40 (MVP Phase 1)

Each issue is self-contained with:
- ✅ Clear description
- ✅ Acceptance criteria
- ✅ Dependencies
- ✅ Story points (estimate)
- ✅ Labels & assignee
- ✅ Milestone

**Ready to import and start building! 🚀**

