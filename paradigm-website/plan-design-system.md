# Plan: Adapt Stitch Design System to Paradigm Website

## Context

- **Source**: Google Stitch mockup (`~/Riki/Inbox/mockups/code.html` + `DESIGN.md`)
- **Generated from**: Paradigm IT Services brand assets (logo, palette)
- **Reference files**:
  - Design system spec: `~/Riki/Inbox/mockups/DESIGN.md`
  - Mockup HTML: `~/Riki/Inbox/mockups/code.html`
  - Brand assets: `~/Riki/Paradigm-Corp-Identity/Assets/`
  - DECISIONS.md: `~/Riki/Paradigm-Corp-Identity/DECISIONS.md`
- **Working directory**: `~/lab/paradigm-website/`
- **Output**: Rebuilt Astro site with full design system applied

## Current State

The Astro build exists with 9 pages but uses:
- Wrong palette: `#0D9488` / `#1E3A5F` (should be `#a33900` / `#006a68`)
- Wrong font: Roboto (should be Fraunces + Outfit + Space Grotesk)
- 8px rounded corners (should be 0px everywhere)
- White sticky nav (should be dark glass with backdrop-blur)
- Generic card/shadow styling (should be flat, background-color separated)
- "Paradigm IT Services" copy throughout (needs real copy — see §4)

**Tagline (LOCKED)**: "Engineering the Next Paradigm"
**Market (LOCKED)**: SME + Caribbean diaspora across North America

---

## Design System Spec (from Stitch mockup)

### Colors
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#a33900` | Primary buttons, accents, links |
| `primary-container` | `#c94c0e` | Gradient base, hover states |
| `secondary` | `#006a68` | Secondary buttons, hover flash, info |
| `surface` | `#f9f9fa` | Page background |
| `surface-container` | `#edeeef` | Content blocks, cards |
| `surface-container-high` | `#e7e8e9` | Secondary content areas |
| `surface-container-highest` | `#e1e2e3` | High-impact callouts |
| `surface-dim` | `#d9dadb` | Recessed elements (code blocks) |
| `surface-lowest` / `white` | `#ffffff` | Cards, overlays |
| `on-surface` | `#191c1d` | Body text |
| `on-surface-variant` | `#594239` | Secondary text |
| `tertiary` | `#2e6085` | Hero background, depth |
| `secondary-fixed` / cyan | `#1cdcd9` | Technical chips, tags, laser-pointer accents |
| `outline-variant` | `#e0c0b4` | Ghost borders at 15% opacity only |
| `error` | `#ba1a1a` | Error states |
| `inverse-surface` | `#2e3132` | Dark surfaces (nav, footer) |

### Typography
| Role | Font | Weight | Usage |
|---|---|---|---|
| Headlines | `Fraunces` (Google Fonts) | 700–900 | H1–H3, hero text |
| Body | `Outfit` (Google Fonts) | 300–600 | Paragraphs, descriptions |
| Labels/Mono | `Space Grotesk` (Google Fonts) | 400–700 | Tags, metadata, uppercase labels, technical text |

- All text: `on-surface` (#191c1d) — NEVER pure black
- Hero headline: 7xl–9xl, tight letter-spacing, `ink-bleed` text-shadow
- Body line-height: generous (relaxed leading)
- Labels: uppercase, wide letter-spacing (0.3em), small (xs)

### Spatial Rules
- `spacing-8` (2.75rem) between list/card items — NO divider lines
- `spacing-20` / `spacing-24` for massive gutters between major sections
- Columns: offset/asymmetric — headlines can bleed into left margin
- Images: can "bleed" off container edge or overlap two surface containers

### Elevation & Depth
- NO drop shadows for cards/sections — use tonal layering only
- Cards: `#ffffff` on `#f9f9fa` surface (subtle shift = all separation needed)
- Floating elements (modals): 12% opacity shadow, 48px blur
- Ghost borders: only `outline-variant` at 15% opacity for complex data tables

### Components

**Buttons**
- Primary: `primary` bg (#a33900), white text, 0px radius. Hover → `secondary` bg (#006a68) with "vibrant tech" flash
- Secondary: transparent bg, `secondary` border at 20% opacity, 0px radius
- Subscribe CTA (nav): uppercase Space Grotesk, wide tracking, `primary` bg → `secondary` on hover

**Cards**
- Flat backgrounds — no shadow, no border-radius
- Hover: background color shift to `tertiary` or `primary` with text color inversion
- Tags: cyan (`secondary-fixed` #1cdcd9) background, uppercase Space Grotesk

**Forms/Inputs**
- Underline-only style: `outline` token, 0px radius
- Focus: underline transitions to `primary` (#a33900), 2px weight
- Error: `error` text, maintain 0px styling

**Navigation**
- Fixed top, dark slate (`#0f172a` / `#1e293b`), backdrop-blur 24px
- 80% opacity surface level for glass effect
- Nav links: italic Fraunces, slate-300 → white on hover
- Mobile: hamburger icon (Material Symbols Outlined)

**Hero Section**
- Min-height: 100vh
- Background: `tertiary` (#2e6085) with abstract network/tech overlay image
- Headline: Fraunces 7xl–9xl, white, ink-bleed shadow
- Subline: Outfit, light weight, relaxed leading
- CTA: cyan button → dark on hover
- Optional: quote with left border accent

---

## Execution Plan

### Phase 1: Design System Foundation

**Step 1.1 — Update `tailwind.config.mjs`**
Replace the entire config with:
- Fonts: `headline` → Fraunces, `body` → Outfit, `label` → Space Grotesk
- Colors: Full palette from §Design System Spec table above
- Border radius: `0px` globally (borderRadius: {DEFAULT: "0px", lg: "0px", xl: "0px"})
- Extend: custom `ink-bleed` text-shadow utility

**Step 1.2 — Update `src/styles/global.css`**
- Remove Roboto import
- Import Fraunces, Outfit, Space Grotesk from Google Fonts
- Remove all `rounded-*` utility classes from component classes
- Replace shadow utilities with background-color alternatives
- Add `ink-bleed` CSS class
- Update focus states to use `primary` underline pattern

**Step 1.3 — Update `src/layouts/BaseLayout.astro`**
- Add Google Fonts preconnect + stylesheet links
- Update body class: `bg-surface` (warm paper background)
- Ensure Material Symbols Outlined is loaded for icons
- Meta description and Schema.org data remain

### Phase 2: Core Components

**Step 2.1 — Redo `src/components/Header.astro`**
- Glass dark nav: `bg-slate-900/80 backdrop-blur-xl`
- Logo: use Paradigm SVG logo from `~/Riki/Paradigm-Corp-Identity/Assets/Logos/`
  - For dark nav: use the white/light version of the logo
  - Load from `public/assets/` after copying logos there
- Nav links: italic Fraunces, hover white
- CTA button: primary → hover secondary (see buttons spec)
- Mobile: hamburger with Material Symbols Outlined
- Nav items: Home, Services, About, Contact, + Elements (as landing page link)
- Position: `fixed top-0 z-50 w-full`

**Step 2.2 — Redo `src/components/Footer.astro`**
- Background: `surface-container` (#edeeef)
- No border-top lines — use tonal shift from page background
- 4-column grid: Brand (logo + tagline) | Navigation | Connect | Legal
- Links: italic Fraunces, hover primary color
- Social icons: Material Symbols Outlined
- Copyright: Space Grotesk, uppercase, wide tracking

**Step 2.3 — Redo `src/components/Hero.astro`**
- Full-viewport: `min-h-screen`, `pt-24` for nav offset
- Background: `tertiary` (#2e6085) with abstract digital/network overlay
- Headline: Fraunces 7xl–9xl, white, tight tracking, ink-bleed
- Subheadline: Outfit, light, relaxed leading, max-w-2xl
- Headline copy: "Engineering the Next Paradigm." (tagline as H1)
- Subline copy: Adapt from mockup — reference Paradigm's positioning (see §4)
- CTA buttons: cyan + white ghost pattern from mockup
- Optional quote block with left border accent
- Tag/chip: Space Grotesk uppercase label (e.g., "Jamaica · Caribbean · North America")

**Step 2.4 — Redo `src/components/ServiceCard.astro`**
- Flat card: white background, no shadow, no border-radius
- Number label: Space Grotesk, uppercase, `opacity-40`
- Headline: Fraunces italic on hover
- Body: Outfit, relaxed leading
- Tags: cyan `secondary-fixed` chips
- Hover: background shifts to `tertiary`, text inverts to white (see §Design System)
- 3-card grid layout matching the mockup's Core Paradigms section

**Step 2.5 — Redo `src/components/Button.astro`**
- Variants: `primary`, `secondary`, `ghost`
- Primary: `primary` bg → `secondary` on hover, 0px radius
- Secondary: transparent + `secondary` ghost border (20% opacity)
- Ghost: text only with animated underline
- All: uppercase Space Grotesk label, wide tracking
- Include icon slot (Material Symbols Outlined, arrow_forward pattern)

**Step 2.6 — Redo `src/components/ContactForm.astro`**
- Underline-only inputs (not box/border styles)
- Focus: `primary` color underline, 2px weight
- Labels: Space Grotesk uppercase
- Submit: primary button
- Error: `error` color, 0px radius maintain

### Phase 3: Pages

**Step 3.1 — `src/pages/index.astro`**
Full redesign, using mockup section structure:
1. **Hero** (full-viewport) → use new Hero component
2. **Professional highlight** → single feature section: Paradigm's founder/proposition with Caribbean professional photo + quote overlay. Hal to provide photo and bio direction.
3. **3 Pillars** → Digital Transformation, AI/IT Consulting, Managed Services (top 3 services from spec interview). Use 3-card ServiceCard layout.
4. **Bento grid** → 4 cards: Elements product showcase, testimonials/stats, blog/news teaser, team/event highlight
5. **Newsletter CTA** → primary bg section with email capture form
6. Footer

**Step 3.2 — `src/pages/services.astro`**
- Grid of all services: Digital Transformation, AI/IT Consulting, Managed Services, plus individual Elements
- Each service: full card with description, tags, CTA

**Step 3.3 — `src/pages/about.astro`**
- Replace with brand-forward about page
- Founder spotlight: photo + narrative
- Mission: "Engineering the Next Paradigm"
- Stats strip: 84% connectivity growth, etc. — adapt from mockup
- Team or values section (placeholder until Hal provides)

**Step 3.4 — `src/pages/contact.astro`**
- Use new ContactForm component
- Split layout: form + contact info (email, location: Kingston Jamaica, social links)

**Step 3.5 — `src/pages/landings/element.astro`**
- Landing page for Elements product line
- Hero: product-focused headline, cyan accent
- Features grid: all 5 Elements (Em, Zt, Dp, Bc, Cl)
- Pricing teaser / CTA

**Step 3.6 — `src/pages/landings/packaged-ai.astro`**
- Landing page for Packaged AI offering
- Hero: AI-focused, highlight Caribbean innovation angle
- Features + CTA

**Step 3.7 — `src/pages/privacy.astro`** and **`src/pages/terms.astro`**
- Restyle with new design system (typography, spacing, surface colors)
- Content remains largely the same

**Step 3.8 — `src/pages/404.astro`**
- On-brand 404 with Fraunces headline, friendly message, home CTA

### Phase 4: Copy Direction

**Hal to provide/edit** — placeholder text is marked throughout:

| Section | Placeholder | Direction |
|---|---|---|
| Hero headline | "The Digital Infrastructure of the Diaspora" | Adapt to Paradigm's mission — Caribbean tech sovereignty |
| Hero subline | "Architecting the future..." | Adapt: Managed IT for Caribbean + diaspora businesses |
| Professional highlight | "Bridging latency between vision and execution" | Paradigm founder story, Caribbean tech journey |
| 3 Pillars | DeFi / Blockchain references | Replace with Digital Transformation, AI/IT Consulting, MSP |
| Stats | 84% connectivity, 12.5 TB | Replace with real or projected Paradigm metrics |
| Newsletter | "Receive technical editorial briefs" | "Get IT insights and exclusive offers" |
| Footer tagline | "Built for the Caribbean Diaspora" | "Engineering the Next Paradigm" |
| About page | Full narrative | Hal to write or approve founder story |

Use Stitch's "Technical Editorial" tone as inspiration: confident, authoritative, precise — not salesy.

### Phase 5: Assets

**Step 5.1 — Copy brand assets to `public/assets/`**
```bash
mkdir -p public/assets/logos public/assets/photos
# Logos: ~/Riki/Paradigm-Corp-Identity/Assets/logo/
#  - "Paradigm IT Services Logo 1.svg" — single-line SVG, primary use
#  - "invoice_logo_1_400_transparent.png" — white/light logo for dark nav backgrounds
#  - "brand_logo_v1_300.png" / "brand_logo_v3_300.png" — PNG variants
# Photography: await Google Drive permission resolution (see DECISIONS.md OPEN item)
#  For hero overlay: abstract tech/network imagery — use Stitch's mockup image or approve stock
```
Assets already available in lab instance at `~/lab/paradigm-website/public/assets/` (check first).
Logo selection: DECISIONS.md not locked — flag for Hal decision before Phase 2.

**Step 5.2 — Favicon**
- Use the "P" mark from the logo SVG
- Convert to favicon.svg in `public/assets/`
- Reference in BaseLayout

**Step 5.3 — Sitemap + robots.txt**
- Update to reflect all pages: /, /services, /about, /contact, /landings/element, /landings/packaged-ai, /privacy, /terms

---

## Deliverables

- [ ] `tailwind.config.mjs` — full design system tokens
- [ ] `src/styles/global.css` — font imports, ink-bleed, no rounded corners
- [ ] `src/layouts/BaseLayout.astro` — updated fonts + body bg
- [ ] `src/components/Header.astro` — glass dark nav, Paradigm logo
- [ ] `src/components/Footer.astro` — tonal separation, 4-column grid
- [ ] `src/components/Hero.astro` — full-viewport, ink-bleed headline
- [ ] `src/components/ServiceCard.astro` — flat cards, hover color-shift
- [ ] `src/components/Button.astro` — primary/secondary/ghost variants
- [ ] `src/components/ContactForm.astro` — underline inputs
- [ ] `src/pages/index.astro` — full redesign with 6 sections
- [ ] `src/pages/services.astro`, `about.astro`, `contact.astro`
- [ ] `src/pages/landings/element.astro`, `packaged-ai.astro`
- [ ] `src/pages/privacy.astro`, `terms.astro`, `404.astro`
- [ ] `public/assets/` — logos + photography copied
- [ ] `dist/` — `bun run build` produces clean build
- [ ] QA — visual check of all pages for design system consistency

---

## Notes

- **No rounded corners anywhere** — this is a hard constraint from the design system
- **No 1px borders** — use background color shifts for separation, ghost-border fallback only at 15% opacity
- **Images**: load from `public/assets/` not external URLs
- **Build**: `cd ~/lab/paradigm-website && bun run build`
- **Dev server**: `bun run dev` for live preview during development
- **Copy**: placeholder text marked with `<!-- TODO: Hal -->` comments for review
- **Open**: Elements catalog full list, founder bio, team photos — flag these as blocking
