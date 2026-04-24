# Ripple Nexus — theripplenexus.com

> Enterprise AI automation systems, SaaS architecture, and data infrastructure — built for founders and operators who demand measurable outcomes.

**Live:** [theripplenexus.com](https://www.theripplenexus.com) &nbsp;·&nbsp; **Stack:** React 18 · Vite · TypeScript · Tailwind CSS · Supabase · Vercel

---

## What This Repo Is

Full production codebase for the Ripple Nexus website, including:

- The public marketing site — all pages, brand system, SEO schema
- **RNS Scheduler** — a custom-built booking system (no Calendly). It qualifies leads, processes payments via Razorpay (INR) and PayPal (USD), books calendar slots, creates Google Meet links, and fires confirmation emails — all in one seamless funnel
- Vercel serverless API routes (`/api/`) backing the scheduler and contact form

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Browser  ·  Vercel Edge CDN                │
│              React 18 SPA  ·  Vite build  ·  TypeScript       │
└───────────────────────┬──────────────────────────────────────┘
                        │ HTTPS
          ┌─────────────┴──────────────┐
          │                            │
   ┌──────▼──────┐              ┌──────▼───────────┐
   │  Static Site │              │  /api/* routes   │
   │  (CDN edge)  │              │  Vercel Fns      │
   │              │              │  (Node.js ESM)   │
   │  All pages   │              │                  │
   │  Brand sys   │              │  /qualify        │
   │  Assets      │              │  /slots          │
   └──────────────┘              │  /create-order   │
                                 │  /verify-payment │
                                 │  /book           │
                                 │  /contact        │
                                 │  /detect-country │
                                 └──────┬───────────┘
                                        │
             ┌──────────────────────────┼──────────────────────┐
             │                          │                      │
      ┌──────▼──────┐          ┌────────▼──────┐    ┌─────────▼──────┐
      │   Supabase   │          │   Payments    │    │ Google Calendar│
      │  (Postgres)  │          │               │    │   + Meet       │
      │              │          │ Razorpay  INR │    │                │
      │ rns_applicants│         │ PayPal    USD │    │ Service acct   │
      │ rns_payments  │         └───────────────┘    │ JWT auth       │
      │ rns_bookings  │                              └────────────────┘
      │ rns_slots     │
      │ rns_settings  │
      └───────────────┘
```

---

## RNS Scheduler — Full Booking Flow

The scheduler is a 6-step state machine. Each step is an isolated React component under `src/components/scheduler/`.

```
  Visitor lands on page
         │
         │  clicks "Request AI Systems Audit"
         ▼
┌─────────────────────────────────────────┐
│  STEP 1 · LandingStep.tsx               │
│  ─────────────────────────────────────  │
│  What to expect · time commitment       │
│  "The audit is 45 minutes. Here's       │
│   what we surface in that session."     │
└──────────────────┬──────────────────────┘
                   │  "Apply Now"
                   ▼
┌─────────────────────────────────────────┐
│  STEP 2 · QualificationStep.tsx         │
│  ─────────────────────────────────────  │
│  Full name · Email · LinkedIn           │
│  Problem description (60 char min)      │
│  Budget range · Urgency                 │
└──────────────────┬──────────────────────┘
                   │  Submit
                   │
                   │  POST /api/scheduler/qualify
                   │
          ┌────────┴────────┐
          │                 │
     score ≥ 60        score < 60
          │                 │
          ▼                 ▼
  ┌───────────────┐  ┌─────────────────────┐
  │  STEP 3       │  │  RejectionStep.tsx   │
  │  PricingStep  │  │  ─────────────────  │
  │  .tsx         │  │  Shows score reason  │
  │               │  │  Offers lead form    │
  │  Consultation │  └─────────────────────┘
  │  fee shown:   │
  │  ₹1,999 (IN)  │
  │  $199 (Global)│
  └───────┬───────┘
          │  "Proceed to Payment"
          ▼
┌─────────────────────────────────────────┐
│  STEP 4 · PaymentStep.tsx               │
│  ─────────────────────────────────────  │
│  Country detected via IP geolocation    │
│                                         │
│  India  →  Razorpay checkout (INR)      │
│  Global →  PayPal hosted page (USD)     │
│                                         │
│  POST /api/scheduler/create-order       │
│  ← orderId + gateway credentials        │
│                                         │
│  [payment completes at gateway]         │
│                                         │
│  POST /api/scheduler/verify-payment     │
│  ← HMAC sig verify (Razorpay)           │
│    or order capture (PayPal)            │
│  ← amount validation (± 1% tolerance)  │
│  ← marks rns_payments "completed"      │
└──────────────────┬──────────────────────┘
                   │  payment verified
                   ▼
┌─────────────────────────────────────────┐
│  STEP 5 · BookingStep.tsx               │
│  ─────────────────────────────────────  │
│  Calendar grid (GET /api/scheduler/slots│
│  filtered by date, is_available = true) │
│                                         │
│  User picks slot + confirms timezone    │
│                                         │
│  POST /api/scheduler/book               │
│  ← ownership check (payment→applicant) │
│  ← duplicate booking guard             │
│  ← atomic slot claim (Supabase PATCH   │
│    with is_available=true filter —      │
│    concurrent race condition safe)      │
│  ← Google Calendar event created       │
│  ← Meet link generated                 │
│  ← confirmation email sent             │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│  STEP 6 · ConfirmationStep.tsx          │
│  ─────────────────────────────────────  │
│  Booking ID · Date · Time (IST)         │
│  Client timezone · Google Meet link     │
└─────────────────────────────────────────┘
```

---

## Payment Flow

```
      POST /api/scheduler/create-order
                   │
     detect countryCode in request body
                   │
         ┌─────────┴─────────┐
         │                   │
      IN (India)          all others
         │                   │
         ▼                   ▼
   Razorpay API          PayPal API
   creates order         creates order
   currency: INR         currency: USD
   amount: ₹1,999        amount: $199
         │                   │
         ▼                   ▼
   Razorpay JS SDK      redirect to
   checkout modal       PayPal hosted
         │                   │
         └─────────┬─────────┘
                   │
      POST /api/scheduler/verify-payment
                   │
         ┌─────────┴─────────┐
         │                   │
    Razorpay              PayPal
    ───────               ──────
    HMAC-SHA256          capture order
    signature check      via PayPal API
         │                   │
    fetch payment        verify status
    from Razorpay API    = "COMPLETED"
         │                   │
    verify amount        verify amount
    matches fee (±1%)    matches fee (±1%)
    status = "captured"       │
         │                   │
         └─────────┬─────────┘
                   │
        UPDATE rns_payments
        SET status = 'completed'
                   │
              → BookingStep
```

---

## Lead Qualification Scoring

```
                    form submitted
                          │
          ┌───────────────┼───────────────┐
          │               │               │
    Budget check    Problem depth    Urgency signal
    ──────────────  ─────────────    ──────────────
    India: ≥ ₹75K   length ≥ 60      immediate  +20
    Global: ≥ $1K   not vague        1–3 months +15
                                     3–6 months  +8
    yes → +50        yes → up to     exploring   +0
    no  →  0         +30 (by length)
          │               │               │
          └───────────────┴───────────────┘
                          │
                   total (max 100)
                          │
              ┌───────────┴───────────┐
              │                       │
         score ≥ 60              score < 60
              │                       │
          QUALIFIED               REJECTED
       → PricingStep           → RejectionStep
                                (reason: budget /
                                 vague description /
                                 low urgency)
```

---

## Project Structure

```
ripple-nexus-web/
│
├── api/                           Vercel serverless functions
│   ├── contact.js                 Contact form → SMTP email
│   └── scheduler/
│       ├── _cors.js               Shared CORS, Supabase helpers, rate limiter
│       ├── book.js                Slot claim + Google Calendar + email
│       ├── create-order.js        Razorpay / PayPal order creation
│       ├── detect-country.js      IP geolocation → country code
│       ├── qualify.js             Lead scoring + Supabase insert
│       ├── slots.js               Available slots query
│       └── verify-payment.js      Payment verification + DB update
│
├── public/
│   ├── favicon.svg                Brand SVG favicon (obsidian bg, violet mark)
│   └── site.webmanifest
│
├── src/
│   ├── assets/                    Logo variants (SVG — dark/light/icon/horizontal)
│   │
│   ├── components/
│   │   ├── scheduler/             RNS Scheduler — 6-step booking funnel
│   │   │   ├── RNSScheduler.tsx   Orchestrator + step state machine
│   │   │   ├── LandingStep.tsx    Step 1 — intro
│   │   │   ├── QualificationStep.tsx  Step 2 — lead form
│   │   │   ├── PricingStep.tsx    Step 3 — fee display
│   │   │   ├── PaymentStep.tsx    Step 4 — Razorpay / PayPal
│   │   │   ├── BookingStep.tsx    Step 5 — slot calendar
│   │   │   ├── ConfirmationStep.tsx  Step 6 — confirmed
│   │   │   └── RejectionStep.tsx  Disqualified path
│   │   │
│   │   ├── AnimatedCard.tsx       Reusable Framer Motion card
│   │   ├── ChatBot.tsx            Navik AI — deterministic FSM chatbot
│   │   ├── CtaSection.tsx         Primary conversion CTA
│   │   ├── EmotionalStatement.tsx
│   │   ├── FloatingCTA.tsx        Scroll-triggered sticky bar
│   │   ├── Footer.tsx
│   │   ├── GlobalSection.tsx      Region / country reach grid
│   │   ├── HeroSection.tsx
│   │   ├── LeadForm.tsx           General inquiry → /api/contact
│   │   ├── Navbar.tsx
│   │   ├── PricingSection.tsx     3-tier agent licensing
│   │   ├── ProcessSection.tsx     4-step engagement process
│   │   ├── ProblemSolutionSection.tsx
│   │   ├── QuestionsSection.tsx   Diagnostic signal cards
│   │   ├── RealStoriesSection.tsx
│   │   ├── SEOHead.tsx            Meta tags + JSON-LD schema injection
│   │   ├── ServicesSection.tsx    6 AI system products
│   │   ├── TestimonialsSection.tsx
│   │   └── TrustSection.tsx
│   │
│   ├── data/
│   │   └── caseStudies.ts         30+ verified project records + categories
│   │
│   ├── lib/
│   │   ├── rns-country.ts         Country → currency / fee / budget mapping
│   │   └── utils.ts               cn() Tailwind class helper
│   │
│   ├── pages/
│   │   ├── Index.tsx              Homepage — lazy-loaded section stack
│   │   ├── About.tsx
│   │   ├── CancellationPolicy.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Contact.tsx
│   │   ├── GeoService.tsx         /locations/:country/:service (programmatic SEO)
│   │   ├── NotFound.tsx           404
│   │   ├── PrivacyPolicy.tsx
│   │   ├── ServiceSilo.tsx        /services/:slug (programmatic SEO)
│   │   ├── Services.tsx
│   │   └── TermsOfService.tsx
│   │
│   ├── App.tsx                    Router + lazy page imports
│   ├── index.css                  CSS custom property token definitions
│   └── main.tsx
│
├── supabase-schema.sql            DB schema + seed (run once)
├── tailwind.config.ts             Brand token → Tailwind class mapping
├── vercel.json                    SPA fallback + API rewrite rules
└── vite.config.ts
```

---

## Brand Token System

All colors are CSS custom properties in `src/index.css`. Never use hardcoded hex values or Tailwind opacity hacks (`text-white/60`, `bg-black`) — always reference the token.

| Token | Hex | Role |
|---|---|---|
| `--obsidian` | `#0A0B14` | Page background |
| `--ink` | `#12141F` | Card / surface background |
| `--carbon` | `#1A1D2E` | Elevated surface |
| `--nexus-violet` | `#7C5CFF` | Primary brand color, all CTAs |
| `--violet-hover` | `#6B4EE6` | CTA hover state |
| `--plasma` | `#B794FF` | Gradient midpoint |
| `--ion-cyan` | `#22D3EE` | Gradient end, highlights |
| `--quantum-lime` | `#A3E635` | Success, verified badges |
| `--pearl` | `#F4F5FA` | Primary text |
| `--graphite-300` | `#94A3B8` | Body / secondary text |
| `--graphite-400` | `#64748B` | Muted / label text |
| `--graphite-600` | `#2D3347` | Borders, dividers |

**Signature gradient** (headings, highlights):
```css
linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)
```

**Banned patterns** — these will fail visual review:

```
rgba(31,86,212,...)   ← old brand blue, removed
bg-black              ← use var(--obsidian)
text-white/60         ← use var(--graphite-300)
border-white/10       ← use var(--graphite-600)
card-elevated         ← undefined class, never existed
glass-panel           ← undefined class, never existed
text-secondary        ← maps to carbon (#1A1D2E) = invisible on dark bg
```

---

## Pricing System

Three tiers, anchored against automation ROI — not the cost of the service.

| Tier | Name | Global (USD) | India (INR) | Anchored against |
|---|---|---|---|---|
| I | AI Readiness Audit | $5,000 – $15,000 | ₹2L – ₹6.5L | $50K–$300K annual automation ROI |
| II | Custom AI Agent Build | $20,000 – $150,000 | ₹8L – ₹75L | 10–25% of annual system value created |
| III | Agent License & Retainer | $1,500 – $5,000/mo | ₹60K – ₹2L/mo | Ongoing model + expansion layer |

**Entry point** (RNS Scheduler consultation fee): ₹1,999 · India &nbsp;/&nbsp; $199 · Global

India pricing is set at ~40–45% below global to reflect enterprise B2B purchasing power in the Indian market. It is not a straight currency conversion — a straight FX conversion (₹83/$) would price the India market incorrectly and signal poor market understanding.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion |
| UI primitives | shadcn/ui (brand-token remapped) |
| Routing | React Router v6 |
| Backend | Vercel Serverless Functions (Node.js ESM) |
| Database | Supabase (PostgreSQL) |
| Payments — India | Razorpay |
| Payments — Global | PayPal |
| Calendar / Meet | Google Calendar API (service account JWT) |
| Email | Nodemailer via SMTP |
| Deployment | Vercel |
| Fonts | Satoshi Variable · Inter · JetBrains Mono |

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/your-org/ripple-nexus-web.git
cd ripple-nexus-web

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in all values — see table below

# 4. Set up the database (one-time)
# Open Supabase → SQL editor → paste + run supabase-schema.sql

# 5. Start dev server
npm run dev
# → http://localhost:5173

# 6. Production build check
npm run build
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SUPABASE_URL` | ✅ | Your Supabase project URL |
| `SUPABASE_SERVICE_KEY` | ✅ | `service_role` key (not `anon`) |
| `RAZORPAY_KEY_ID` | ✅ | Razorpay live key ID |
| `RAZORPAY_KEY_SECRET` | ✅ | Razorpay live key secret |
| `PAYPAL_CLIENT_ID` | ✅ | PayPal app client ID |
| `PAYPAL_CLIENT_SECRET` | ✅ | PayPal app client secret |
| `PAYPAL_MODE` | ✅ | `live` or `sandbox` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | optional | Service account email for Calendar |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | optional | RSA private key (newlines as `\n`) |
| `GOOGLE_CALENDAR_ID` | optional | Calendar ID or `primary` |
| `SMTP_HOST` | ✅ | SMTP server hostname |
| `SMTP_PORT` | ✅ | SMTP port (usually `465`) |
| `SMTP_USER` | ✅ | SMTP login email |
| `SMTP_PASS` | ✅ | SMTP password |
| `SITE_URL` | ✅ | Full site URL, no trailing slash |

> **Google Calendar is optional.** When not configured, the scheduler still works end-to-end — confirmation emails are sent via SMTP instead. Calendar invites and Meet links are best-effort, never blocking.

---

## Database Tables

Run `supabase-schema.sql` once in the Supabase SQL editor to create all tables and seed default settings.

```
rns_applicants    qualification form submissions + lead scores
rns_payments      payment records (provider, order ID, status, amount)
rns_bookings      confirmed session bookings + Meet links
rns_slots         available calendar slots (managed via admin panel)
rns_settings      runtime config — fees, thresholds, session duration
```

Key settings stored in `rns_settings` (editable live via the admin panel):

| Key | Default | Description |
|---|---|---|
| `consultation_fee_inr` | `1999` | India session fee (₹) |
| `consultation_fee_usd` | `199` | Global session fee ($) |
| `budget_threshold_inr` | `75000` | Min qualifying budget India (₹) |
| `budget_threshold_usd` | `1000` | Min qualifying budget Global ($) |
| `session_duration_minutes` | `60` | Slot length in minutes |

---

## Deployment

Push to `main` — Vercel deploys automatically.

```
  git push origin main
         │
         ▼
   Vercel CI picks up push
         │
         ▼
   npm run build
   (Vite — ~15s)
         │
    ┌────┴────┐
    │         │
  dist/    api/*.js
    │         │
    ▼         ▼
 Edge CDN  Serverless
 (static)  Functions
           (Node 18)
         │
         ▼
  vercel.json rewrites:
  /api/*  → serverless functions
  /*      → dist/index.html  (SPA fallback)
```

**Required Vercel project settings:**
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Add all environment variables in the Vercel dashboard

---

## Pages and Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | `Index.tsx` | Homepage — full conversion funnel |
| `/about` | `About.tsx` | Company story + approach |
| `/services` | `Services.tsx` | Six AI system products |
| `/case-studies` | `CaseStudies.tsx` | 30+ verified results, filterable |
| `/contact` | `Contact.tsx` | General contact form |
| `/services/:slug` | `ServiceSilo.tsx` | Programmatic SEO — one page per service type |
| `/locations/:country/:service` | `GeoService.tsx` | Programmatic SEO — geo × service pages |
| `/privacy-policy` | `PrivacyPolicy.tsx` | |
| `/terms-of-service` | `TermsOfService.tsx` | |
| `/cancellation-policy` | `CancellationPolicy.tsx` | |
| `*` | `NotFound.tsx` | 404 |

---

## Key Engineering Decisions

**Why a custom scheduler instead of Calendly?**
The booking flow needs to gate access behind lead qualification scoring and payment in a single seamless experience. Off-the-shelf tools cannot do lead scoring, multi-currency payment routing, and IP-based country detection in one flow. Building it in-house eliminates monthly SaaS cost and gives full control over every step and conversion point.

**Why lazy-load everything below the hero?**
The RNS Scheduler bundle alone is ~150 KB. Lazy-loading all below-fold sections (via `React.lazy` + `Suspense`) keeps the initial page interactive fast. A `useEffect` in `Index.tsx` polls for the `#rns-scheduler` DOM element and scrolls to it once the lazy bundle loads — this fixes hash-link navigation from other pages where the element doesn't exist yet on arrival.

**Why Supabase?**
Postgres DB + REST API + dashboard in a single free-tier service. The `service_role` key is only ever used server-side inside Vercel functions — never exposed to the browser.

**Why INR pricing ≠ USD × 83?**
Enterprise B2B software in India is priced at 40–45% below global. Straight FX conversion prices most Indian enterprise clients out and signals the vendor doesn't understand the market. India tier prices are calibrated against what Indian enterprises actually budget for equivalent scope, not the exchange rate.
