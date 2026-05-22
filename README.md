# Ripple Nexus — theripplenexus.com

> Enterprise data infrastructure, operational intelligence, and autonomous systems — built for scale.

**Live:** [theripplenexus.com](https://www.theripplenexus.com) &nbsp;·&nbsp; **Stack:** React 18 · Vite · TypeScript · Tailwind CSS · Vercel

---

## What This Repo Is

Full production codebase for the Ripple Nexus enterprise platform frontend, including:

- The public infrastructure platform site
- Brand architecture, design systems, and SEO schemas
- Enterprise trust systems (Security Center, Reliability SLAs, Developer Hub, Changelog)
- Vercel serverless API routes (`/api/`)

---

## System Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                    Browser  ·  Vercel Edge CDN               │
│              React 18 SPA  ·  Vite build  ·  TypeScript      │
└───────────────────────┬──────────────────────────────────────┘
                        │ HTTPS
          ┌─────────────┴──────────────┐
          │                            │
   ┌──────▼──────┐              ┌──────▼───────────┐
   │  Static Site │              │  /api/* routes   │
   │  (CDN edge)  │              │  Vercel Fns      │
   │              │              │  (Node.js ESM)   │
   │  Platform    │              │                  │
   │  Docs        │              │  /contact        │
   │  Security    │              │  /detect-country │
   └──────────────┘              └──────────────────┘
```

---

## Platform Core Modules

The architecture is split into 6 core operational products (located in `src/components/ServicesSection.tsx` and routed dynamically via `/platform/:slug`):

1. **Nexus Flow** - Autonomous lead qualification and routing pipelines.
2. **Nexus Command** - Centralized data ingestion and operational dashboards.
3. **Nexus Core** - Foundational data structuring and multi-AZ deployments.
4. **Nexus Intelligence** - Machine learning predictive engines.
5. **Nexus Edge** - High-performance localized compute endpoints.
6. **Nexus Web** - Composable, headless infrastructure for high-velocity frontends.

---

## Project Structure

```text
ripple-nexus-web/
│
├── api/                           Vercel serverless functions
│   ├── contact.js                 Contact form handler
│   └── scheduler/                 Legacy / internal endpoints
│
├── public/                        Static assets
│   ├── favicon.svg                Brand SVG favicon (obsidian bg, violet mark)
│   └── site.webmanifest
│
├── src/
│   ├── assets/                    Logo variants
│   │
│   ├── components/                React components
│   │   ├── ControlPlaneSection.tsx  Homepage terminal reality
│   │   ├── Footer.tsx             Enterprise routing footer
│   │   ├── HeroSection.tsx        
│   │   ├── Navbar.tsx             Primary navigation
│   │   ├── SEOHead.tsx            Meta tags + JSON-LD schema injection
│   │   ├── ServicesSection.tsx    6 core platform modules
│   │   └── TrustSection.tsx
│   │
│   ├── data/
│   │   └── caseStudies.ts         Verified deployment records
│   │
│   ├── pages/                     Route endpoints
│   │   ├── Index.tsx              Homepage
│   │   ├── Changelog.tsx          Platform velocity tracker
│   │   ├── DeveloperHub.tsx       API Documentation gateway
│   │   ├── LoginGateway.tsx       Enterprise Identity / SSO flow
│   │   ├── Platform.tsx           Main platform offering page
│   │   ├── Reliability.tsx        Uptime and SLA details
│   │   ├── SecurityCenter.tsx     Compliance and Zero-Trust architecture
│   │   └── ServiceSilo.tsx        /platform/:slug dynamically generated pages
│   │
│   ├── App.tsx                    React Router implementation
│   └── index.css                  CSS custom property token definitions
│
├── tailwind.config.ts             Brand token mapping
└── vite.config.ts
```

---

## Brand Token System

All colors are CSS custom properties in `src/index.css`. Never use hardcoded hex values or Tailwind opacity hacks (`text-white/60`, `bg-black`) — always reference the token to maintain the enterprise aesthetic.

| Token | Hex | Role |
|---|---|---|
| `--obsidian` | `#0A0B14` | Page background |
| `--ink` | `#12141F` | Card / surface background |
| `--carbon` | `#1A1D2E` | Elevated surface |
| `--nexus-violet` | `#7C5CFF` | Primary brand color, minimal use |
| `--pearl` | `#F4F5FA` | Primary text |
| `--graphite-300` | `#94A3B8` | Body / secondary text |
| `--graphite-400` | `#64748B` | Muted / label text |
| `--graphite-500` | `#475569` | Muted / disabled |
| `--graphite-600` | `#2D3347` | Borders, dividers |
| `--quantum-lime` | `#A3E635` | Success, verified badges |

*Note: Gradients and excessive glowing effects have been systematically deprecated in favor of high-contrast, structural minimalism to reflect institutional maturity.*

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion |
| UI primitives | shadcn/ui |
| Routing | React Router v6 |
| Backend | Vercel Serverless Functions (Node.js ESM) |
| Deployment | Vercel |

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/ashucfx/ripple-nexus-website.git
cd ripple-nexus-website

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:8080

# 4. Production build check
npm run build
```

---

## Deployment

Push to `main` — Vercel deploys automatically via Edge caching.

**Required Vercel project settings:**
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
