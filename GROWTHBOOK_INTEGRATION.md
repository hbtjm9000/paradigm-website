# GrowthBook Integration Plan

## Overview

GrowthBook is an open-source feature flag and A/B testing platform. Integrating it into serviceparadigm.com enables:
- **Controlled experiments** (A/B/n tests) on UI variants, copy, CTAs
- **Feature flags** for gradual rollouts, kill switches, environment gating
- **Analytics-driven decisions** with statistical significance tracking
- **No redeploy** for flag changes — toggle via GrowthBook UI

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     serviceparadigm.com                         │
├─────────────────────────────────────────────────────────────────┤
│  Astro (SSR/SSG)           Vue 3 Components (client:load)       │
│  - Root layout             - ContactForm.vue                    │
│  - Header.astro            - Newsletter.vue                     │
│  - Pages                   - Client-side experiments            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ GrowthBook JS SDK
                              │ (fetch SDK context)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GrowthBook Cloud / Self-hosted               │
│  - Feature Flags (logoVariant, ctaText, pricingTier)            │
│  - Experiments (A/B test definitions)                           │
│  - Analytics (conversion tracking, MDE, significance)           │
│  - Audience Targeting (URL, device, geo, custom attributes)     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Webhook / API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Google Apps Script / GA4                     │
│  - Form submission events                                       │
│  - Custom conversion events                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: SDK Installation & Context Setup ✅ COMPLETE

**Status:** COMPLETED (2026-05-01)
**Commit:** `df8e0d2`

### Completed Tasks

#### 1.1 Install GrowthBook JS SDK ✅
```bash
bun add @growthbook/growthbook@1.6.5
```

#### 1.2 Create GrowthBook Context Provider ✅
**File:** `src/lib/growthbook.ts` (created)

```typescript
import { GrowthBook } from '@growthbook/growthbook';
import type { WidenPrimitives } from '@growthbook/growthbook';

export const growthbook = new GrowthBook({
  apiHost: import.meta.env.PUBLIC_GROWTHBOOK_API_HOST || 'https://cdn.growthbook.io',
  clientKey: import.meta.env.PUBLIC_GROWTHBOOK_CLIENT_KEY,
  enableDevMode: import.meta.env.DEV,
  trackingCallback: (experiment, result) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'experiment_viewed', {
        experiment_id: experiment.key,
        variation_id: result.variationId,
      });
    }
  },
});

// Initialize on client-side only
if (typeof window !== 'undefined') {
  growthbook
    .loadFeatures()
    .then(() => console.log('[GrowthBook] Features loaded'))
    .catch(err => console.error('[GrowthBook] Load failed:', err));
}

export function getFeatureValue<V = string>(key: string, defaultValue: V): WidenPrimitives<V> {
  return growthbook.getFeatureValue(key, defaultValue);
}

export function isFeatureOn(key: string): boolean {
  return growthbook.isOn(key);
}

export function isFeatureOff(key: string): boolean {
  return growthbook.isOff(key);
}
```

#### 1.3 Environment Variables ✅
**File:** `.env.example` (committed)
**File:** `.env` (local, gitignored)

```env
PUBLIC_GROWTHBOOK_API_HOST=https://cdn.growthbook.io
PUBLIC_GROWTHBOOK_CLIENT_KEY=your_client_key_from_growthbook
```

#### 1.4 BaseLayout Integration ✅
**File:** `src/layouts/BaseLayout.astro`
- Added GrowthBook CDN script in `<head>` with `defer` attribute

#### 1.5 TypeScript Declarations ✅
**File:** `src/vue-shims.d.ts`
- Added `ImportMetaEnv` interface for environment variables
- Added `Window.gtag` declaration for Google Analytics

#### 1.6 Unit Tests ✅
**File:** `tests/unit/growthbook.test.ts` (7 tests)
- All tests passing (18/18 total suite)

### Verification Gates
```
lint       ✓  (0 errors)
typecheck  ✓  (0 errors)
test       ✓  (18/18 passed)
build      ✓  (11 pages in 3.71s)
push       ✓  (df8e0d2)
```

---

## Phase 2: GrowthBook Account & First Feature Flag

**Status:** PENDING — requires user action

### 2.1 Create GrowthBook Account
1. Go to https://growthbook.io
2. Sign up (free tier available)
3. Create new project: `serviceparadigm.com`
4. Note the **Client Key** (looks like: `sdk-abc123xyz...`)

### 2.2 Configure Environment
```bash
# Edit .env (not committed)
PUBLIC_GROWTHBOOK_CLIENT_KEY=sdk-your_actual_key_here
```

### 2.3 Create First Feature Flag: `logo-variant-test`

**GrowthBook UI steps:**
1. Navigate to **Features** → **New Feature**
2. Feature ID: `logo-variant-test`
3. Feature type: **String**
4. Default value: `mono-white`
5. Add variations:
   | Variation | Value | Weight |
   |-----------|-------|--------|
   | Control (A) | `mono-white` | 50% |
   | Variant (B) | `colored` | 25% |
   | Variant (C) | `mono-teal` | 25% |
6. Save feature

### 2.4 Wire Flag to Header Component

**File:** `src/components/Header.astro`

```astro
---
import { getFeatureValue } from '../lib/growthbook';

interface Props {
  logoVariant?: 'colored' | 'mono-white' | 'mono-teal' | 'grayscale';
}

const { logoVariant: propVariant = 'mono-white' } = Astro.props;
const gbVariant = getFeatureValue('logo-variant-test', propVariant);
const logoVariant = gbVariant;
---

<a href="/" class="flex items-center">
  <img
    src={`/images/paradigm-logo-header-${logoVariant}.png`}
    alt="Paradigm IT Services"
    width="200"
    height="45"
    class="h-10 w-auto object-contain"
  />
</a>
```

### 2.5 Verification
```bash
bun run build
bun run preview
# Visit site multiple times — logo should vary per GrowthBook assignment
```

---

## Phase 3: Analytics Integration

**Status:** PENDING — depends on Phase 2

### 3.1 Google Analytics 4 Setup
If GA4 is not already configured:
1. Create GA4 property for serviceparadigm.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add GA4 script to `BaseLayout.astro`

### 3.2 Custom Event Tracking
**File:** `src/lib/growthbook.ts` (already has trackingCallback)

The existing `trackingCallback` fires `experiment_viewed` events to GA4. Additional events to consider:
- `form_submitted` (ContactForm, Newsletter)
- `cta_clicked` (hero CTA, service cards)
- `page_view` (if not already tracked)

### 3.3 GrowthBook → GA4 Integration
In GrowthBook UI:
1. Go to **Settings** → **Integrations**
2. Add **Google Analytics 4**
3. Enter Measurement ID
4. Enable experiment tracking

---

## Phase 4: Experiment Analysis & Iteration

**Status:** PENDING — depends on Phase 3

### 4.1 Define Success Metrics
For `logo-variant-test`:
- **Primary:** Click-through rate on hero CTA
- **Secondary:** Time on page, bounce rate
- **Guardrail:** No degradation in Lighthouse performance score

### 4.2 Statistical Significance
GrowthBook automatically calculates:
- P-value
- Confidence intervals
- Probability to beat control
- Recommended sample size

### 4.3 Decision Framework
| Result | Action |
|--------|--------|
| Variant B wins (p < 0.05) | Make `colored` the new default |
| No significant difference | Keep `mono-white`, test another variable |
| Variant C wins (p < 0.05) | Make `mono-teal` the new default |

---

## Future Experiment Ideas

### UI/UX Tests
- `hero-cta-text`: "Get Started" vs "Book Consultation" vs "Talk to Us"
- `newsletter-position`: Above footer vs inline after hero
- `service-card-layout`: 3-column grid vs stacked cards
- `footer-links`: 2-column vs 4-column

### Content Tests
- `tagline-variant`: "Engineering the Next Paradigm" vs alternate copy
- `about-cta`: Different CTAs on /about/ page
- `pricing-display`: JMD vs USD currency

### Feature Rollouts
- `dark-mode-toggle`: Gradual rollout of dark theme option
- `chat-widget`: Beta test live chat for subset of visitors
- `new-landing-page`: A/B test new landing page design

---

## Troubleshooting

### GrowthBook not loading features
**Symptom:** Console shows `[GrowthBook] Load failed: ...`
**Fix:**
1. Verify `PUBLIC_GROWTHBOOK_CLIENT_KEY` is set in `.env`
2. Check browser network tab for 401/403 on `cdn.growthbook.io`
3. Ensure feature flags are published (not draft) in GrowthBook UI

### Features always return default
**Symptom:** `getFeatureValue()` always returns default value
**Fix:**
1. Verify feature flag exists in GrowthBook with exact key
2. Check feature is enabled (not archived)
3. Verify audience targeting rules don't exclude current visitor

### TypeScript errors on import.meta.env
**Symptom:** `Property 'env' does not exist on type 'ImportMeta'`
**Fix:** Ensure `src/vue-shims.d.ts` contains the `ImportMetaEnv` interface declaration

---

## Reference Files

| File | Purpose |
|------|---------|
| `src/lib/growthbook.ts` | SDK singleton + helper functions |
| `src/layouts/BaseLayout.astro` | CDN script injection |
| `src/vue-shims.d.ts` | TypeScript declarations |
| `.env.example` | Environment variable template |
| `.env` | Local environment (gitignored) |
| `tests/unit/growthbook.test.ts` | Unit tests |
| `GROWTHBOOK_INTEGRATION.md` | This plan |

---

## Quick Reference Commands

```bash
# View current GrowthBook config
cat src/lib/growthbook.ts

# Check environment variables
cat .env.example

# Run tests
bun run test

# Build and preview
bun run build && bun run preview

# Check git status
git status
```

---

**Last Updated:** 2026-05-01
**Phase 1 Commit:** df8e0d2
**Next Action:** Phase 2 — Create GrowthBook account and configure client key
