# Paradigm IT Services Website — Technical Implementation Plan

**Project:** Paradigm IT Services Website  
**Stack:** Astro + Custom MD-based CMS (edge compute), Tailwind CSS, Git-based publishing  
**Date:** 2026-04-21  
**Status:** Draft v1.0

---

## 1. Architecture Overview

### 1.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        User Requests                                │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Cloudflare Edge Network                         │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │  CDN Caching     │    │  Edge Workers    │                     │
│  │  (Static Assets)│    │  (Dynamic MD)    │                     │
│  └─────────────────┘    └─────────────────┘                     │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Git-Based CMS                                  │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Content Repository (MD + Frontmatter)                      │  │
│  │  /content/{pages,services,posts,landings}/* .md             │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Static Site Generator | Astro 4.x | Fast, content-focused, SEO-optimized, island architecture |
| Styling | Tailwind CSS 3.x | Rapid development, brand color system, responsive |
| CMS | Custom MD-based (edge compute) | Frontmatter + custom tags, blog-capable, git-backed |
| Publishing | Git workflow | Remote git → Staging → Production, CDN caching |
| Hosting | Cloudflare Pages + Workers | Edge compute, fast global delivery |
| Form Handling | Cloudflare Workers + Email | Serverless form processing |

---

## 2. Project Structure

```
paradigm-website/
├── .specify/                      # Specification files
├── src/
│   ├── components/
│   │   ├── Header.astro           # Navigation header
│   │   ├── Footer.astro           # Footer with contact info
│   │   ├── Hero.astro            # Hero section
│   │   ├── ServiceCard.astro     # Service display card
│   │   ├── ContactForm.astro     # Pre-qualification form
│   │   └── Button.astro          # Reusable button component
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Main layout wrapper
│   │   └── PageLayout.astro       # Page-specific layout
│   ├── pages/
│   │   ├── index.astro           # Home page
│   │   ├── services.astro        # Services listing
│   │   ├── about.astro           # About page
│   │   ├── contact.astro         # Contact page
│   │   └── landings/
│   │       ├── packaged-ai.astro # Landing page 1
│   │       └── element.astro     # Landing page 2
│   ├── styles/
│   │   └── global.css            # Tailwind imports, custom styles
│   ├── content/
│   │   ├── pages/                # Page content (MD)
│   │   ├── services/             # Service definitions (MD)
│   │   ├── posts/                # Blog posts (MD)
│   │   └── landings/             # Landing page content (MD)
│   └── utils/
│       ├── content-loader.ts     # MD content fetching
│       └── form-handler.ts       # Form submission logic
├── public/
│   ├── assets/                   # Images, logos
│   └── fonts/                    # Custom fonts (if any)
├── astro.config.mjs              # Astro configuration
├── tailwind.config.mjs           # Tailwind configuration
├── package.json                  # Dependencies
└── wrangler.toml                # Cloudflare Workers config
```

---

## 3. Key Technical Decisions

### 3.1 MD-based CMS Design

**Frontmatter Schema:**
```yaml
---
title: "Page Title"
description: "Meta description"
template: "page" | "landing" | "post"
status: "published" | "draft" | "archived"
priority: 1
author: "Author Name"
date: "2026-04-21"
tags: ["tag1", "tag2"]
cta: "contact" | "consultation" | "none"
og_image: "/assets/og-image.jpg"
---
```

**Content Categories:**
- `/content/pages/` — Static pages (Home, About, Services, Contact)
- `/content/services/` — Service definitions with icons, descriptions
- `/content/posts/` — Blog posts (future v2)
- `/content/landings/` — Landing page variants

### 3.2 Edge Compute Integration

**Cloudflare Workers:**
- Form submission handling (anti-spam, validation)
- Dynamic content rendering (if needed post-build)
- Analytics event capture

**Build Pipeline:**
```
Git Push → GitHub Actions → Build Astro → Deploy to Cloudflare Pages
                                              ↓
                                    Invalidate CDN Cache
```

### 3.3 Styling System (Tailwind)

**Brand Colors:**
```javascript
// tailwind.config.mjs
colors: {
  primary: '#0D9488',    // Teal - innovation, trust
  secondary: '#1E3A5F',  // Navy - professionalism
  accent: '#0D9488',     // Same as primary
}
```

**Typography:**
- Font family: Roboto (Google Fonts)
- Headings: Roboto Bold
- Body: Roboto Regular

---

## 4. Page Implementation

### 4.1 Home Page (`/`)

| Section | Content | Component |
|---------|---------|-----------|
| Header | Logo, Navigation | Header.astro |
| Hero | Tagline, Primary CTA | Hero.astro |
| Services Preview | 3 featured services | ServiceCard.astro x3 |
| About Teaser | Company intro | Text block |
| Trust Signals | Stats, Caribbean focus | Stats.astro |
| Footer | Contact, Social, Legal | Footer.astro |

### 4.2 Services Page (`/services`)

- Service cards with icons
- Service descriptions from MD content
- "Learn More" links to detailed pages
- Process section (optional)

### 4.3 About Page (`/about`)

- Company story
- Caribbean/Jamaican focus
- Team section (if content available)
- Values/mission statement

### 4.4 Contact Page (`/contact`)

- Pre-qualification form fields:
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Business Phase (dropdown)
  - "Biggest Impact" (textarea)
- CEO meeting booking integration
- Location: Kingston, Jamaica
- Alternative contact methods

### 4.5 Landing Pages (`/landings/*`)

- Packaged AI offering
- Element (Digital Presence starter)

---

## 5. Feature Implementation

### 5.1 Pre-qualification Form

**Form Fields:**
| Field | Type | Validation |
|-------|------|------------|
| name | text | required, min 2 chars |
| email | email | required, valid email |
| phone | tel | optional |
| business_phase | select | required |
| biggest_impact | textarea | required, min 10 chars |

**Submission Flow:**
1. Client-side validation
2. Cloudflare Worker form handler
3. Anti-spam check (honey pot, rate limiting)
4. Email notification to team
5. Thank you page confirmation

### 5.2 SEO Optimization

- Semantic HTML structure
- Meta tags (title, description, og:image)
- Schema.org structured data
- Sitemap generation
- robots.txt

### 5.3 Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| TTFB | < 600ms |

### 5.4 Accessibility (WCAG 2.1 AA)

- Color contrast ratios
- Keyboard navigation
- ARIA labels
- Skip links
- Alt text for images

---

## 6. Publishing Workflow

### 6.1 Git-Based Workflow

```
Local Development → Git Commit → GitHub Push
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
            Staging Environment             Pull Request
            (preview URL)                    (code review)
                    │                               │
                    ▼                               ▼
            Stakeholder Review              Merge to Main
                    │                               │
                    ▼                               ▼
            Production Deploy              Auto Deploy
            (Cloudflare Pages)              (Cloudflare Pages)
```

### 6.2 Environment Variables

```
CF_ACCOUNT_ID=
CF_PAGES_PROJECT=
CF_API_TOKEN=
GA_TRACKING_ID=
FORM_ENDPOINT=
```

---

## 7. Dependencies

### 7.1 Core Dependencies

```json
{
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "gray-matter": "^4.0.3",
    "marked": "^12.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "wrangler": "^3.0.0"
  }
}
```

---

## 8. Milestones

| Phase | Task | Target Date |
|-------|------|--------------|
| 1 | Project setup & configuration | Day 1 |
| 2 | Base layout & components | Day 2 |
| 3 | Home page implementation | Day 3 |
| 4 | Services & About pages | Day 4 |
| 5 | Contact form & landing pages | Day 5 |
| 6 | SEO & performance optimization | Day 6 |
| 7 | Content population | Day 7 |
| 8 | Testing & QA | Day 8 |
| 9 | Staging review | Day 9 |
| 10 | Production deploy | Day 10 |

**Launch Target:** May 1st, 2026

---

## 9. Open Questions (Resolved in Spec)

| # | Question | Answer |
|---|----------|--------|
| 1 | Primary domain? | serviceparadigm.com |
| 2 | Top 3 services? | Digital Transformation, Consulting (AI+IT), Managed Services |
| 3 | Primary CTA? | Book meeting with CEO (pre-qual form) |
| 4 | Blog in v1? | Yes — via MD CMS |
| 5 | Analytics? | GA4 + GrowthBook |

---

## 10. Files to Create

### 10.1 Configuration Files

- `astro.config.mjs` — Astro configuration
- `tailwind.config.mjs` — Tailwind with brand colors
- `tsconfig.json` — TypeScript configuration
- `wrangler.toml` — Cloudflare Workers config
- `.gitignore` — Git ignore patterns

### 10.2 Component Files

- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/Hero.astro`
- `src/components/ServiceCard.astro`
- `src/components/ContactForm.astro`
- `src/components/Button.astro`

### 10.3 Layout Files

- `src/layouts/BaseLayout.astro`
- `src/layouts/PageLayout.astro`

### 10.4 Page Files

- `src/pages/index.astro`
- `src/pages/services.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/landings/packaged-ai.astro`
- `src/pages/landings/element.astro`

### 10.5 Content Files

- `src/content/pages/home.md`
- `src/content/pages/services.md`
- `src/content/pages/about.md`
- `src/content/pages/contact.md`
- `src/content/services/digital-transformation.md`
- `src/content/services/consulting.md`
- `src/content/services/managed-services.md`

---

## 11. Testing Strategy

### 11.1 Functional Testing

- Navigation links work correctly
- Forms validate and submit
- Responsive design across breakpoints
- Accessibility audit (axe-core)

### 11.2 Performance Testing

- Lighthouse performance score
- Core Web Vitals validation
- Mobile device testing

### 11.3 Browser Testing

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 12. Success Criteria

- [ ] All pages render correctly
- [ ] Forms submit and validate
- [ ] Mobile-responsive design works
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Core Web Vitals pass
- [ ] SEO meta tags populated
- [ ] Git-based publishing workflow functional
- [ ] Launch by May 1st, 2026

---

**Plan Status:** Ready for Implementation  
**Next Step:** `/speckit.tasks` to generate work items  
**Last Updated:** 2026-04-21