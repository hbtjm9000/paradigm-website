# Experiment Log — Paradigm IT Services

## Active Experiments

### hero-copy-test (2026-05-03 — Active)

**Hypothesis:** Direct, plain-language headline (v3) will outperform abstract "future of tech" messaging (v1). Editorial style (v2) may appeal to brand-conscious visitors.

**Variants:**
| Variant | Label | Headline | CTA Text | Assignment |
|---------|-------|-----------|----------|-------------|
| v1-baseline | Engineering the Next Paradigm | The Digital Infrastructure of Tomorrow. | Start Your Transformation | 33.33% |
| v2-editorial | Editorial Precision | Your Technology, Editorialized. | Read the Method | 33.33% |
| v3-direct | Direct Engineering | Technology That Works. | Start Now | 33.34% |

**Success Metrics:**
- Contact form submissions (primary)
- Time on page (secondary)
- Scroll depth to Services section (secondary)

**Tracking:**
- Exposure: `experiment_viewed` event (console + GA4)
- Conversion: `form_submitted`, `cta_click` events
- Persistence: localStorage (`exp:hero-copy-test`)

**Results:**

| Variant | Impressions | Conversions | Rate | Notes |
|---------|-------------|-------------|------|-------|
| v1-baseline | — | — | — | Control: abstract "future" language |
| v2-editorial | — | — | — | Editorial tone, "Read the Method" |
| v3-direct | — | — | — | Plain language, "Start Now" |

**Decision:** _Pending data (minimum 100 impressions per variant recommended for significance)_

---

## Completed Experiments

_(None yet)_

---

## Notes

- Variants stored in: `src/content/hero/variants.json`
- Experiment config: `src/content/hero/metadata.json`
- Composable: `src/composables/useExperiment.ts`
- Client component: `src/components/HeroClient.vue`
- Persistence: `localStorage` key `exp:hero-copy-test`
- GA4 events: `experiment_viewed`, `form_submitted`, `cta_click`

**To calculate significance manually:**
Use Evan Miller's A/B test calculator: https://www.evanmiller.org/ab-testing/sample-size.html
