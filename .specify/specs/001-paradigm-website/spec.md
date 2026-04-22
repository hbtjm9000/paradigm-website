# Paradigm IT Services Website — Specification

**Project:** Paradigm IT Services Website Rebuild  
**Location:** Kingston, Jamaica  
**Date:** 2026-04-21  
**Status:** Draft v1.0 — Pending Stakeholder Validation  

---

## 1. Overview

### 1.1 Project Summary

Rebuild Paradigm IT Services' web presence to effectively market IT services to Caribbean SME owners, tech professionals, and diaspora. The site must convey technical competence, Caribbean roots, and forward-thinking innovation aligned with the tagline "Engineering the Next Paradigm."

### 1.2 Business Context

| Element | Details |
|---------|---------|
| Company | Paradigm IT Services |
| Location | Kingston, Jamaica |
| Tagline | Engineering the Next Paradigm |
| Primary Domain | serviceparadigm.com (marketing) |
| Infrastructure Domain | paradigm.com.jm (SaaS/apps: clientportal, quotations, api) |
| Existing Assets | Logo SVG variants (1, 6, 7) |

### 1.3 Brand Guidelines

| Element | Specification |
|---------|---------------|
| Primary Color | #0D9488 (cyan/teal) |
| Secondary Color | #1E3A5F (navy) |
| Typography | Google Fonts (Roboto) |
| Logo | SVG variants 1, 6, 7 |

---

## 2. Target Audience

| Persona | Description | Needs |
|---------|-------------|-------|
| Caribbean SME Owner | Local/regional business owners seeking tech solutions | Understandable value prop, local credibility, clear pricing/process |
| Tech Professional | Developers, IT staff seeking partnership/opportunities | Technical depth, modern stack, career opportunities |
| Diaspora | Jamaicans abroad seeking local tech partners | Trust signals, cultural connection, remote-friendly processes |

---

## 3. User Stories

### 3.1 Primary Users

```
AS A Caribbean SME owner
I WANT to understand what Paradigm IT can do for my business
SO THAT I can decide if they're the right partner for my technology needs

AS A Caribbean SME owner
I WANT to easily contact Paradigm IT for a consultation
SO THAT I can start a conversation about my project

AS A tech professional
I WANT to learn about Paradigm IT's expertise and culture
SO THAT I can evaluate potential collaboration or employment

AS A diaspora stakeholder
I WANT to see that Paradigm IT understands Caribbean business context
SO THAT I can trust them as a regional partner
```

### 3.2 Journey Scenarios

**Scenario 1: Discovery**
- User searches "Jamaica IT services" or "Caribbean SME tech support"
- Lands on homepage, immediately understands value proposition
- Navigates to Services page for details
- Clicks CTA to request consultation

**Scenario 2: Research**
- User finds Paradigm IT via referral or search
- Visits About page to build trust
- Reviews Services for specific offerings
- Submits contact form with project inquiry

**Scenario 3: Return Visit**
- User returns after initial contact
- Can easily find contact information again
- May explore any new content/case studies

---

## 4. Requirements

### 4.1 Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| F-01 | Display company information and value proposition | Must | Tagline prominently featured |
| F-02 | Showcase top 3 services | Must | Digital Transformation, Consulting (AI+IT), Managed Services (SLA-backed) |
| F-03 | MD-based CMS with edge compute | Must | Custom frontmatter tags, blog-capable, git-based publishing |
| F-03a | Pre-qualification form + CEO meeting booking | Must | Fields: Name, Email, Phone, Business Phase, "Biggest Impact" |
| F-03b | Landing pages (2+) | Must | Packaged AI, Element (Digital Presence starter) |
| F-04 | Publishing workflow | Must | Remote git → Staging → Production, CDN caching |
| F-04a | Mobile-responsive design | Must | All pages |
| F-04b | Fast page load times | Must | Core Web Vitals compliant |
| F-06 | Accessibility compliance | Must | WCAG 2.1 AA |
| F-07 | Social media links | Should | LinkedIn, relevant platforms |
| F-08 | Team/About section | Should | Build trust and connection |
| F-09 | Location information | Should | Kingston, Jamaica prominently shown |
| F-10 | Blog/News section | Could | Not in v1 scope |
| F-11 | Calendar booking integration | Could | For consultation scheduling |
| F-12 | Analytics/tracking | Must | Page views, basic events |

### 4.2 Non-Functional Requirements

| Category | Target |
|----------|--------|
| Performance | LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| Accessibility | WCAG 2.1 AA |
| Browser Support | Modern browsers (Chrome, Firefox, Safari, Edge) |
| Mobile Support | iOS Safari, Chrome Mobile, responsive |
| Security | HTTPS, form spam protection |
| Analytics | Full feature set (GA4) |
| Experimentation | GrowthBook for feature flags |

### 4.3 Technical Constraints

| Constraint | Description |
|------------|-------------|
| Existing Code | Two stale Astro builds available (likely scrap) |
| Logo Assets | SVG variants 1, 6, 7 ready for use |
| Domains | serviceparadigm.com, paradigm.com.jm |
| Fonts | Google Fonts (Roboto) only |

---

## 5. Page Structure

### 5.1 Site Map (v1)

```
Home
├── Header (Logo, Navigation)
├── Hero Section (Tagline, Primary CTA)
├── Services Overview (Top 3 featured)
├── About Teaser
├── Social Proof / Trust Signals
├── Footer (Contact, Social, Legal)
│
├── Services
│   ├── Service Card 1
│   ├── Service Card 2
│   ├── Service Card 3
│   └── Service Card N
│
├── About
│   ├── Company Story
│   ├── Team Section (optional)
│   ├── Caribbean Focus
│   └── Values/Mission
│
└── Contact
    ├── Contact Form
    ├── Location (Kingston, Jamaica)
    └── Alternative Contact Methods
```

### 5.2 Page Specifications

#### Home Page
- **Hero**: Full-width, tagline "Engineering the Next Paradigm", primary CTA (Request Consultation)
- **Services Preview**: 3 featured services with brief descriptions
- **Trust Signals**: Client count, years in business, Caribbean focus mention
- **About Teaser**: Brief intro with link to About page
- **CTA Section**: Final push to contact

#### Services Page
- **Header**: "What We Do" or similar
- **Service Cards**: Icon, title, description, optional "Learn More" links
- **Process Section**: How they work (optional)

#### About Page
- **Company Story**: Founded, mission, vision
- **Caribbean Focus**: Explicit mention of Jamaican/Caribbean expertise
- **Team Section**: Photos + bios (if applicable)
- **Values**: Core principles

#### Contact Page
- **Primary CTA**: "Book a Meeting with Our CEO"
- **Form Fields**: Name, Email, Phone, Business Phase, "What would have the biggest impact for your business"
- **Intent**: Pre-qualification + consultation booking
- **Integration**: Form → Email (to be determined: manual scheduling or calendar embed)
- **Location Info**: Kingston, Jamaica address (or general)
- **Alternative Contact**: Email, phone, social links
- **Map Embed**: Optional Google Maps

### 5.3 Shared Components

| Component | Description |
|-----------|-------------|
| Header | Logo, Navigation (Home, Services, About, Contact), Mobile menu |
| Footer | Copyright, Quick links, Social icons, Contact info |
| Buttons | Primary (teal #0D9488), Secondary (navy #1E3A5F) |
| Forms | Styled inputs, validation feedback |
| Icons | Consistent icon set for services/features |

---

### 6. Tech Stack Recommendation

#### 6.1 Architecture: Astro + Custom MD-based CMS

| Component | Choice | Rationale |
|-----------|--------|----------|
| Static Site Generator | Astro | Fast, content-focused, SEO-optimized |
| Styling | Tailwind CSS | Rapid development, brand color system |
| CMS | Custom MD-based (edge compute) | Frontmatter + custom tags, git-backed |
| Publishing | Git workflow | Remote git → Staging → Production |
| Hosting | Edge compute/workers | Cloudflare Workers or similar |
| Booking | Google Workspace calendar | Existing, embedded in CTA |

#### 6.2 CMS Requirements

- MD files with YAML frontmatter
- Custom tags for content markup
- Blog post support
- Git-based version control
- Edge rendering for dynamic content

**Recommendation:** Astro for site rendering; OpenCode builds the custom MD CMS

---

## 7. Open Questions for Plan Phase — RESOLVED

| # | Question | Answer | Impact |
|---|----------|-------|--------|
| 1 | Which domain is primary for launch? | serviceparadigm.com (marketing) | DNS |
| 2 | What are the top 3 services to feature? | Digital Transformation, Consulting (AI+IT), Managed Services (SLA) | Content |
| 3 | Primary CTA? | Book a meeting with CEO (pre-qual form) | Conversion |
| 4 | Tech stack? | Astro + Custom MD CMS + Edge compute/workers | Architecture |
| 5 | Blog/news in v1? | Yes — via CMS (MD-based) | Scope |
| 6 | Analytics/tracking? | GA4 + GrowthBook | Full feature set |
| 7 | Launch timeline? | May 1st, 2026 | Milestone |
| 7a | Landing pages? | 2+ required (Packaged AI, Element) | v1 scope |
| 8 | Content ownership? | AI copywriting + second AI critique | Process defined |
| 9 | Social proof? | Anonymized past projects until portfolio builds | Social proof |
| 10 | Reference sites? | claude.com/product/cowork, paper.design | Design direction |

---

## 8. Assumptions & Risks

### 8.1 Assumptions

1. **Domain**: serviceparadigm.com will be primary; paradigm.com.jm redirects
2. **Stack**: Astro with Tailwind CSS (pending confirmation)
3. **Scope**: v1 includes Home, Services, About, Contact pages only
4. **Content**: Stakeholder will provide final copy for all pages
5. **Integration**: Contact form with email delivery only (no complex CRM)
6. **Launch**: Static site with form handling (no database)

### 8.2 Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Content delays | Medium | Build with placeholder content, allow copy updates |
| Domain decision | Low | Have both options ready for launch |
| Scope creep | Medium | Lock v1 scope, defer features to v2 |
| Brand guideline changes | Low | Reference constitution, require approval for changes |

---

## 9. Next Steps

1. **Stakeholder Review**: Validate this spec with Paradigm IT decision-maker
2. **Clarification Session**: Address all TBD items in Section 7
3. **Plan Phase**: Use `/speckit.plan` to define architecture and tech decisions
4. **Task Generation**: Use `/speckit.tasks` to create actionable work items
5. **Design Phase**: Create wireframes/mockups based on approved spec
6. **Development**: Implement per agreed scope

---

**Document Status:** Draft  
**Review Required:** Yes — Stakeholder validation needed  
**Last Updated:** 2026-04-21
