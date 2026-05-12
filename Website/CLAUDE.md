# CLAUDE.md — Calma Men's Massage, Salon & Spa Website

> Single source of truth for building the Calma website. Treat this file as the contract: when in doubt, defer to what's written here. Update it when scope changes — don't let reality drift away from the plan silently.

---

## 0. Premise & Non-Goals

### What this site is
A **bilingual (AR / EN) brand storefront** for Calma Men's Massage, Salon & Spa in Al-Seef, Bahrain. Its single business job is to **convert visitors into bookings on Fresha or WhatsApp inquiries**, and to make the brand feel as premium online as it does in person.

### What this site is NOT — anti-scope
Push back if asked to add any of these without a strong reason:

- ❌ **Not a booking system.** Fresha already handles 75 services, staff, payments, and 1,390+ reviews. Every "Book" CTA on this site links out to Fresha.
- ❌ **Not an e-commerce store.** They upsell Thalgo and other products in-house, not online.
- ❌ **Not a blog.** Low ROI for a local service business; high maintenance burden. Skip unless an SEO strategy specifically justifies it later.
- ❌ **Not a login/account system.** No profiles, no wishlists, no saved appointments — Fresha owns that data.
- ❌ **Not a newsletter funnel.** WhatsApp and Instagram are the real engagement channels.
- ❌ **Not a fake-testimonials carousel.** Link to the real Fresha review page; do not cherry-pick or fabricate.
- ❌ **Not a chat widget (Intercom, Crisp, etc.).** WhatsApp is already the live channel — don't fragment it.

### Definition of done
- Loads in under **2.0s on 4G** in Bahrain. LCP ≤ 2.5s, CLS < 0.1, INP < 200ms.
- Works perfectly in **Arabic (RTL)** and **English (LTR)** — both fully translated, both fully laid out, no half-states or English-only fallback strings.
- Every primary CTA goes to **Fresha**, **WhatsApp**, or **Google Maps**. Nothing else.
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Renders correctly on iPhone SE (375px wide) up through 1920px desktop.

---

## 1. Business Facts (verify before changing)

| Item | Value |
|---|---|
| Name (EN) | Calma Men's Massage, Salon & Spa |
| Name (AR) | كالما |
| Tagline (EN) | Find Peace Within |
| Tagline (AR) | صفاء واسترخاء |
| Positioning | Spanish-inspired men's wellness sanctuary |
| Location | Building 2131, Road 3640, Al-Seef 436, Bahrain |
| Fresha | https://www.fresha.com/a/calma-massage-spa-seef-road-3627-nyt1nacu |
| WhatsApp | https://wa.me/97366677745 |
| Maps | https://maps.app.goo.gl/pMESauvQZ3H1NGZX6 |
| Salon hours | 10:00 AM – 10:00 PM, daily |
| Spa & Massage hours | 10:00 AM – 12:00 AM (midnight), daily |
| Currency | BHD (Bahraini Dinar) |
| Social proof | 4.9★ on Fresha, 1,390+ reviews |

---

## 2. Brand & Design Tokens

> These tokens **are** the brand. Don't invent new colors, fonts, or shadows without writing them into this file first.

### 2.1 Color palette

```css
:root {
  /* Primary — Calma teal-sage (NOT olive). Pulled from logo + brand assets. */
  --calma-deep:     #3D5C5C;  /* Logo background, primary brand */
  --calma-mid:      #4A6B68;  /* Hover states, accents */
  --calma-soft:     #7A9591;  /* Secondary text, dividers */

  /* Warm neutrals — wood, cream, sand */
  --warm-cream:     #F5F0E8;  /* Page backgrounds, menu paper */
  --warm-stone:     #E8DFD0;  /* Cards, soft sections */
  --warm-wood:      #8B6F47;  /* Wood accents (sparingly) */
  --warm-walnut:    #5C4632;  /* Deep wood, sparingly */

  /* Text */
  --text-primary:   #2A3A3A;  /* Body on light background */
  --text-muted:     #5E6E6C;
  --text-inverse:   #F5F0E8;  /* Text on dark background */

  /* Functional */
  --gold-accent:    #B89968;  /* Hairlines, dividers, ONE premium touch per view */
  --whatsapp-green: #25D366;  /* Only for the WhatsApp icon */
}
```

**Color discipline:**
- Hero and footer sit on `--calma-deep`. Body sections sit on `--warm-cream`.
- Wood tones live in *photography*, not as flat color blocks. Don't make a `#8B6F47` background — let the real wood in the photos carry that.
- Gold is for hairlines and at most one premium touch per viewport. **Never as a button fill.**
- Test all combinations against WCAG AA contrast. Cream text on deep teal passes; mid-teal on cream barely passes — use deep teal for any body text on cream.

### 2.2 Typography

The marketing pieces use a high-contrast modern serif for display ("Find Peace Within", "Deep Cleanse Skin Renewed"). Match that energy.

- **Display / Headings:** `Cormorant Garamond` (Latin) paired with `Noto Naskh Arabic` (Arabic). Both via Google Fonts. Self-host the woff2 files for performance.
- **Body / UI:** `Inter` (Latin) paired with `IBM Plex Sans Arabic` (Arabic).
- Load only the weights actually used: 400 + 600 for body, 400 + 500 for display.

**Type scale (mobile-first, fluid):**
```css
--text-h1: clamp(2.5rem, 6vw, 4.5rem);
--text-h2: clamp(1.875rem, 4vw, 3rem);
--text-h3: clamp(1.25rem, 2.5vw, 1.75rem);
--text-body-lg: 1.0625rem;
--text-body: 1rem;
--text-small: 0.875rem;
--text-eyebrow: 0.75rem; /* uppercase, +0.14em tracking */
```

- Line-height: **1.6 body, 1.15 display**. Arabic body **1.8** (descenders need room).
- Letter-spacing: display gets `-0.01em`. Eyebrows uppercase get `+0.14em`.
- Arabic does **not** get italic or uppercase — both are nonsense in Arabic typography. Build that exclusion into the eyebrow component.

### 2.3 Spacing & rhythm

8px base scale: `4, 8, 16, 24, 32, 48, 64, 96, 128`.

Section vertical padding: **64px mobile / 96–128px desktop**. Be generous with whitespace — this is wellness, not Black Friday.

Max content width: `1200px`. Reading-width paragraphs: `65ch`.

### 2.4 Radii, borders, shadows

- Cards: `border-radius: 16px`.
- Buttons: `border-radius: 999px` (pill).
- Images: `8–24px` depending on context.
- Mimic the **arched** motif from their interiors (mirrors, alcoves) in section dividers or featured image frames.
- Shadows: soft and warm, never harsh. Default: `0 8px 32px -8px rgba(61, 92, 92, 0.18)`.

### 2.5 Motion

- Default: **300–400ms**, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Page transitions: **fade only**. No slide-ins, no parallax-on-scroll showpieces.
- Hover lifts on cards: `translateY(-4px)` + shadow.
- **Honor `prefers-reduced-motion: reduce`** — disable all non-essential animation.

---

## 3. Bilingual / RTL Architecture

This has to be designed in from day one, not bolted on.

- **Two locale routes:** `/` (English, default) and `/ar/` (Arabic). No runtime client-side language switching that re-renders strings — separate static pages per locale.
- `<html dir="ltr" lang="en">` for English, `<html dir="rtl" lang="ar">` for Arabic.
- **Use CSS logical properties everywhere.** `margin-inline-start` not `margin-left`, `padding-inline-end` not `padding-right`, `inset-inline-start` not `left`. If you find yourself writing physical properties, stop.
- Icons that have inherent direction (arrows, chevrons) get `transform: scaleX(-1)` in RTL via `[dir="rtl"] .icon-directional`.
- Numbers (prices, durations, phone) stay in Latin digits in both locales — Bahraini consumers read both, and Latin digits in BHD prices are standard.
- The Calma word-mark logo has both an Arabic and a Latin lockup; use the matching one per locale.
- Translation strings live in `/src/i18n/en.json` and `/src/i18n/ar.json`. Single source per locale, no inline translations in components.
- Language toggle in the header swaps the URL: `/services` ⇄ `/ar/services`. Persist user choice via cookie so repeat visitors land in their preferred locale.

**RTL-specific gotchas to test:**
- Flexbox `row` reverses automatically — but `gap` and `justify-content: start` need verification.
- Carousels/sliders: swipe direction reverses.
- Form inputs: cursor and placeholder align inline-start.
- Any decorative motif (arches, dividers): make sure it's symmetric or has an RTL variant.

---

## 4. Information Architecture

Single-page long-scroll site with anchored sections. Visitors want to: see the place, see the services, see the price, book. **Five clicks max from landing to booking.**

```
/                              English landing (long-scroll)
├── #hero                      Brand promise + primary CTA
├── #experience                The space, the ethos
├── #services                  Tabbed: Massage / Spa / Salon
├── #signature                 Featured: Cupping, Moroccan Bath, Hot Stone
├── #team                      Therapist/barber grid (link to Fresha)
├── #visit                     Hours, map, address, contact
└── footer                     Social, links, legal

/ar                            Arabic mirror, RTL, same structure
```

Do **not** pre-build per-service deep-dive pages. Add `/services/[slug]` only when search-volume data proves specific service queries are worth ranking for.

---

## 5. Page Specs — Section by Section

### 5.1 Global header
- Sticky on scroll. Adds backdrop-blur + subtle cream tint once past hero.
- Left: Calma circular logo. White variant on dark hero; teal variant on light sections.
- Center (desktop): nav anchors — Experience · Services · Team · Visit.
- Right: language toggle `EN | عربي` + **Book Now** pill button (filled teal, cream text) → Fresha.
- Mobile: hamburger drawer slides from `inline-end`. Drawer contains nav + Book Now + WhatsApp.

### 5.2 Hero
- Full viewport, capped at 900px tall. 90vh on mobile.
- Background: one of the strongest interior shots — recommended: the massage room with the copper ceiling sculpture, OR the dark-lit treatment room ("Find Peace Within" asset).
- Overlay: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(61,92,92,0.55) 100%)`.
- Headline: *Find Peace Within.* / *صفاء واسترخاء.*
- Sub: one sentence — "Men's massage, salon & spa in Al-Seef. Spanish-inspired calm, expertly delivered."
- Primary CTA: **Book on Fresha** (filled pill).
- Secondary CTA: **WhatsApp Us** (outlined pill, WhatsApp icon).
- Trust strip beneath CTAs: `⭐ 4.9 · 1,390+ reviews · Open until midnight`.
- Hero image MUST be priority-loaded (`<link rel="preload" as="image">`).

### 5.3 Experience / About
- Two-column desktop, stacked mobile.
- Left: short paragraph (≤60 words) on the Spanish-inspired ethos and men-only sanctuary positioning.
- Right: 2×2 image grid — barber chair, massage room, treatment products tray, reception/exterior.
- Cream background. No CTA. This section is atmosphere, not action.

### 5.4 Services — the most important section
Treat it like a fine-restaurant menu.

- Tabs (desktop) / accordion (mobile): **Massage · Spa · Salon**.
- Each row: Arabic name · English name · duration · price in BHD, separated by a hairline divider in `--gold-accent` at 30% opacity.
- Background: `--warm-cream` with very subtle paper texture (1–2% noise overlay).
- Sticky-on-mobile mini CTA bar at the bottom of the viewport while this section is in view: **Book Now** + **WhatsApp**.

**Full service data — source into `src/data/services.json`:**

#### Massage
| AR | EN | Durations | Prices (BHD) |
|---|---|---|---|
| المساج السويدي | Swedish Massage | 30 / 60 / 90 min | 12.1 / 19.8 / 27.5 |
| المساج العميق | Deep Tissue Massage | 60 / 90 min | 22 / 29.7 |
| المساج التايلندي | Thai Massage | 60 / 90 min | 19.8 / 27.5 |
| مساج الشياتسو | Shiatsu Massage | 60 / 90 min | 19.8 / 27.5 |
| المساج الرياضي | Sport Massage | 60 / 90 min | 22 / 29.7 |
| مساج الأكواب الهوائية | Air Cupping Massage | 30 min | 13.2 |
| مساج الأحجار الساخنة | Hot Stone Massage | 90 min | 33 |
| مساج القدمين | Foot Massage | 30 / 60 min | 12.1 / 16.5 |
| مساج الظهر | Back Massage | 30 min | 12.1 |
| مساج الظهر والرأس | Back & Head Massage | 45 min | 16.5 |

#### Spa
| AR | EN | Duration | Price (BHD) |
|---|---|---|---|
| الحمام المغربي | Moroccan Bath | 60 min | 16.5 |
| حمام البخار | Steam Bath | 15 min | 5.5 |
| الاستحمام | Shower | 15 min | 1.5 |
| مانيكير | Manicure | 30 min | 8.25 |
| باديكير | Pedicure | 30 min | 8.25 |
| مانيكير و باديكير | Manicure & Pedicure (excl. foot care) | 60 min | 15.4 |
| سبا القدم | Foot Spa (foot care) | 60 min | 15.4 |

#### Salon
| AR | EN | Duration | Price (BHD) |
|---|---|---|---|
| قص الشعر | Hair Cut | 30 min | 5.5 |
| تحديد اللحية | Shaving | 30 min | 3.85 |
| قص الشعر مع تحديد اللحية | Hair Cut & Shaving | 60 min | 8.8 |
| تسريحة الشعر | Hair Style | 30 min | 3.85 |
| قص الشعر للأطفال | Kids Hair Cut (4–8 yrs) | 30 min | 3.85 |
| شمع الوجه / خيط | Face Waxing / Threading | 30 min | 3.85 |
| صبغ الشعر | Hair Color | 45 min | 8.8 |
| صبغ اللحية | Beard Color | 30 min | 4.4 |
| تنظيف الوجه | Basic Facial Cleaning | 30 min | 5.5 |
| تنظيف الوجه العميق | Deep Facial Cleaning | 45 min | 11 |
| علاج القشرة | Dandruff Treatment | 30 min | 6.6 |
| علاج الكيراتين | Keratin Treatment | 120 min | from 33 |

Each row gets a small **Book** link → Fresha (deep-link to that specific service if Fresha supports it; otherwise to the venue page).

### 5.5 Signature treatments
Three cards highlighting hero services. Recommended picks based on what their own marketing emphasizes:
1. **Dry Cupping** (الحجامة الجافة)
2. **Sport Massage / Recovery**
3. **Thalgo Marine Facial**

Each card: one strong photo, name AR + EN, one-line benefit, "Learn more" anchors to that row in Services.

The cupping marketing piece is in Arabic specifically — *"هل جرّبت الحجامة الجافة لآلامك؟"* — preserve that voice in the AR locale. Don't water it down.

### 5.6 Team
Grid of therapists/barbers with name + role. Initial set from Fresha:

- **Sofien** — Barber (5.0)
- **Med Amine** — Barber (5.0)
- **Aymen** — Barber (5.0)
- **Eugene** — Therapist (4.9)
- **Nheil** — Therapist (4.8)
- **Bon** — Therapist (4.8)
- **Nasief** — Therapist (4.8)
- **Mikel** — Therapist (4.9)

"See full team" link → Fresha team page. Don't write fake bios. Confirm photo rights with the client before publishing.

### 5.7 Visit
- Two columns desktop.
- Left: hours table + address + WhatsApp click-to-chat + amenities ("Wheelchair accessible · Parking available · Showers · Lockers · Bath towels").
- Right: embedded Google Map iframe. Below map: **Get Directions** button → Google Maps deep link.
- Trust strip repeated at the bottom: rating, review count.

### 5.8 Footer
- Dark teal background.
- Three columns: Calma (logo + tagline), Quick Links, Connect (Instagram, WhatsApp, Fresha).
- Bottom bar: `© 2026 Calma Massage & Spa. All rights reserved.` + privacy link.

---

## 6. Tech Stack

**Primary recommendation: Astro + Tailwind CSS.**

Reasoning:
- **Astro** ships zero JavaScript by default — perfect for a brochure site. Built-in i18n routing. Excellent image optimization via `<Image />`. Component-based but compiles to static HTML.
- **Tailwind** with a custom theme matching the tokens in §2. Use the `rtl:` variant for any RTL-specific overrides.
- No runtime framework needed. If a section grows interactive later, drop in a React/Svelte/Vue island just for that.

**Alternatives considered and rejected:**
- **Next.js** — overkill for a static brochure. SSR/RSC adds complexity with no payoff.
- **Plain HTML/CSS/JS** — fine, but you lose i18n routing, image optimization, and component reuse. Maintenance cost climbs over time.
- **WordPress** — fastest "non-dev" path, but slow, plugin-bloated, and constant security maintenance. Reject.

**Other choices:**
- **Hosting:** Cloudflare Pages (free tier, edge-cached globally including a Middle East POP — fast in Bahrain). Vercel is a fine alternative.
- **Domain:** confirm with client. Likely `calma.bh` if available.
- **Images:** Astro's built-in `<Image />` → AVIF + WebP with JPG fallback.
- **Forms (if ever needed):** Don't add forms. Use WhatsApp.
- **Analytics:** Plausible or Cloudflare Web Analytics. **Not** Google Analytics — privacy-friendly, no cookie banner needed, faster.
- **Maps:** Static Google Maps iframe (free, no API key needed for embed-only). Lazy-load it.
- **No tracking pixels.** No Meta Pixel, no TikTok Pixel. If client insists later, gate them behind explicit consent.

---

## 7. File / Repo Structure

```
calma-site/
├── CLAUDE.md                     ← this file
├── README.md                     ← short onboarding for any new dev
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg              ← 1200x630 for social sharing
│   └── fonts/                    ← self-hosted woff2 files
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ExperienceSection.astro
│   │   ├── ServicesSection.astro
│   │   ├── ServiceTable.astro
│   │   ├── SignatureCard.astro
│   │   ├── TeamGrid.astro
│   │   ├── VisitSection.astro
│   │   ├── LanguageToggle.astro
│   │   ├── BookButton.astro      ← single source of truth for the Fresha link
│   │   └── WhatsAppButton.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro           ← English home
│   │   ├── ar/
│   │   │   └── index.astro       ← Arabic home
│   │   └── privacy.astro
│   ├── data/
│   │   ├── services.json         ← single source for service menu
│   │   └── team.json
│   ├── i18n/
│   │   ├── en.json
│   │   └── ar.json
│   ├── styles/
│   │   └── global.css            ← tokens + base styles
│   └── assets/
│       └── images/               ← processed via Astro <Image />
└── .github/
    └── workflows/
        └── deploy.yml            ← optional, for CF Pages deploy
```

**Important:** `BookButton` and `WhatsAppButton` are the only places the Fresha URL and WhatsApp number appear in code. If Fresha URLs or phone numbers change, you change them in one file. This discipline matters — otherwise stale URLs scatter across the codebase six months in.

---

## 8. Performance Budget

| Metric | Target | Hard ceiling |
|---|---|---|
| LCP | < 2.0s | 2.5s |
| CLS | < 0.05 | 0.1 |
| INP | < 150ms | 200ms |
| Total page weight (initial load) | < 800 KB | 1.2 MB |
| JS bundle | < 30 KB | 80 KB |
| Hero image | < 200 KB AVIF | 350 KB |
| Fonts | 2 families × 2 weights, woff2, subsetted | — |

**Rules:**
- All non-hero images: `loading="lazy"` + `decoding="async"`.
- Hero image: preloaded.
- No third-party scripts except a single privacy-friendly analytics tag and the Google Maps embed iframe (lazy-loaded — don't load it until user scrolls near the Visit section).
- Fonts: `font-display: swap`. Subset Arabic and Latin separately.

---

## 9. Accessibility

This is wellness — the site should welcome everyone, including users with disabilities.

- All interactive elements reachable by keyboard. Visible `:focus-visible` rings — don't remove them.
- All images have meaningful `alt` text in both locales. Decorative images get `alt=""`.
- Color contrast meets WCAG AA: 4.5:1 body text, 3:1 large text.
- Hamburger menu, language toggle, and tabs have proper ARIA attributes.
- Language toggle uses `<a hreflang="ar">` and `<a hreflang="en">` — not just visual cues.
- Skip-to-content link at the top of the DOM, hidden until focused.
- Tested with VoiceOver (iOS Safari) and TalkBack (Android Chrome) in both locales before launch.

---

## 10. SEO

The site has to be findable, not just beautiful.

**On-page:**
- `<title>` per page, ≤60 chars, includes "Men's Spa Al-Seef Bahrain" or similar.
- `<meta name="description">` ≤155 chars, both locales.
- Open Graph + Twitter Card tags. OG image: a strong interior shot with the logo overlaid, 1200×630.
- `<link rel="alternate" hreflang="en">` and `hreflang="ar"` on every page.
- Schema.org **LocalBusiness** + **HealthAndBeautyBusiness** JSON-LD with: name, address, geo coords, opening hours, telephone, priceRange, aggregateRating (pulled from Fresha — keep updated manually), image, sameAs (Instagram, Fresha).
- Semantic HTML: one `<h1>` per page, proper heading hierarchy, `<nav>`, `<main>`, `<section>`, `<article>` where appropriate.

**Off-page (note for client, not code):**
- Google Business Profile must be claimed and complete — this drives more local traffic than the website itself.
- Consistent NAP (name, address, phone) across Google, Fresha, Instagram, and the website.
- Encourage Google reviews alongside Fresha — diversifies the trust signal.

**Sitemap:** Auto-generated via `@astrojs/sitemap`. Submit to Google Search Console.
**Robots.txt:** Allow all.

---

## 11. Image Asset Inventory

Provided assets (rename to descriptive filenames, store in `src/assets/images/`):

| Original | Suggested filename | Use |
|---|---|---|
| IMG_3907.jpg | `salon-haircut-back.jpg` | Salon section |
| IMG_3906.jpg | `salon-haircut-side.jpg` | Salon section / Team |
| IMG_3904.jpg | `treatment-cupping.jpg` | Signature: Cupping |
| IMG_3903.jpg | `treatment-facial-thalgo.jpg` | Signature: Facial |
| IMG_3902.jpg | `treatment-deep-cleanse-steam.jpg` | Signature: Deep Cleanse |
| IMG_3901.jpg | `treatment-recovery-leg-massage.jpg` | Signature: Sport |
| IMG_3899.jpg | `room-massage-dim.jpg` | Hero option |
| IMG_3898.jpg | `room-massage-copper.jpg` | **Recommended hero** |
| IMG_3897.jpg | `room-treatment-find-peace.jpg` | Experience grid |
| IMG_3896.jpg | `treatment-head-massage.jpg` | Experience grid |
| IMG_3894.jpg | `product-thalgo-tray.jpg` | Experience grid |
| IMG_3893.jpg | `treatment-headwrap.jpg` | Signature: Clear Your Head |
| 3307623D-...PNG | `logo-circle-teal.png` | Logo (request SVG) |

**Action items before launch:**
- Convert the logo to SVG (request from client, or vectorize cleanly).
- Re-export each image as AVIF + WebP at 3 sizes (mobile, tablet, desktop).
- Strip EXIF data (privacy + file size).
- The marketing posters with embedded text (e.g. "Find Peace Within" baked into the JPG) should **not** be used as-is on the website — that text won't be translatable and won't be selectable or searchable. Use the *clean* underlying photo and overlay text in HTML/CSS instead.

---

## 12. Phased Build Plan

**Phase 1 — Foundation (Day 1–2)**
- Astro + Tailwind scaffold, tokens wired in, fonts loaded.
- Base layout, header, footer, language toggle working between `/` and `/ar/`.
- BookButton and WhatsAppButton components — single source of truth.

**Phase 2 — Content sections (Day 3–5)**
- Hero with priority-loaded image.
- Experience section with image grid.
- Services section with full menu data from `services.json`, tabs, prices.
- Visit section with map embed.

**Phase 3 — Polish & extras (Day 6–7)**
- Signature treatments section.
- Team grid.
- Privacy page.
- SEO meta + schema JSON-LD.
- OG images.

**Phase 4 — QA (Day 8)**
- Lighthouse audit on every page in both locales.
- Manual RTL pass — test every section in Arabic, look for layout breaks.
- Real-device test: iPhone SE, mid-range Android, iPad, desktop.
- Screen reader pass with VoiceOver.
- Link audit — every CTA goes where it should.

**Phase 5 — Launch (Day 9)**
- Deploy to Cloudflare Pages.
- Point domain.
- Submit sitemap to Google Search Console.
- Verify Schema in Rich Results Test.
- Set up Plausible / Cloudflare Web Analytics.

Total: roughly **9 working days** for one developer. Adjust to real availability.

---

## 13. Things to Push Back On

If the client asks for any of the following during the build, push back politely and refer to this file:

| Request | Counter |
|---|---|
| "Add an online booking form" | Fresha handles this. A second booking surface creates support and data-sync headaches. |
| "Add a blog" | Low ROI for a local business. Hours required to produce monthly content exceed the SEO uplift unless tied to a real content strategy. Revisit in 6 months with data. |
| "Add a chatbot" | WhatsApp is already the live channel. A chatbot fragments inquiries and creates a worse experience than a real human responding on WhatsApp. |
| "Add testimonials we wrote ourselves" | Risks looking fake. Link to the real Fresha 4.9★ reviews — stronger social proof and more credible. |
| "Make the hero text glow / pulse / animate" | Wellness is calm. Motion should be quiet. Going showy undermines the positioning. |
| "Show prices only after they enter their email" | Friction kills conversion. Show prices openly — they're competitive and build confidence. |
| "Add a loyalty program section" | Fresha already runs loyalty. Don't duplicate. Link from Visit section if needed. |
| "Add a gift voucher purchase flow" | If genuinely needed, link to Fresha vouchers — don't build a separate Stripe flow. |

---

## 14. Open Questions for Client

Resolve these before or during Phase 1:

1. **Domain name** — is `calma.bh` available and registered? If not, what's the URL?
2. **Logo as SVG** — can they provide vector files? PNG-only is acceptable but suboptimal.
3. **Photography rights** — are all images cleared for web use, including team member photos?
4. **Instagram handle** — confirm the exact URL for the social link.
5. **Privacy policy** — do they have one drafted, or should one be templated?
6. **Default locale** — should the root `/` default to English or Arabic? (Recommendation: Arabic, given local market. English speakers will toggle.)
7. **Analytics access** — who owns the Plausible / Google Search Console account?
8. **Future content updates** — who edits the site? If the client wants to self-edit, consider a headless CMS like Sanity (free tier) or Decap CMS. If a developer handles updates, skip the CMS.

---

## 15. Reference Links

- Fresha venue: https://www.fresha.com/a/calma-massage-spa-seef-road-3627-nyt1nacu
- WhatsApp: https://wa.me/97366677745
- Google Maps: https://maps.app.goo.gl/pMESauvQZ3H1NGZX6
- Astro docs: https://docs.astro.build
- Tailwind RTL: https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support
- WCAG quick reference: https://www.w3.org/WAI/WCAG21/quickref/
- LocalBusiness schema: https://schema.org/LocalBusiness

---

*Last updated: keep this date current when you edit. If you change scope, edit this file in the same commit. No silent drift.*       *SVG logo is now in brand_assets @CALMA_logo.svg*