# Spiritual Connect — Design Brief

## Direction
Spiritual Connect — comprehensive Vedic platform: Aarti/Chalisa/Mantra/Stotra libraries, astrology calculators, AI Krishna chat, Gita reader, blog with audio, Life Reports, 369 Book shop. Saffron/gold/cream palette, ornate sacred aesthetic.

## Tone
Spiritual maximalism — reverent, immersive, intentional. Every surface layered: ornamental borders, warm accents, temple architecture echoed. No ghost text; all zones have visible hierarchy.

## Differentiation
Sacred geometry integration (Lo Shu Grid, Lagna charts, Panchang calendar), planet-specific color coding, audio accessibility on all content (TTS + uploaded files), real-time Dasha timeline visualization, Devanagari/Gurmukhi script support.

## Color Palette (OKLCH)

| Token | Light (L C H) | Dark (L C H) | Role |
|-------|---------------|--------------|------|
| Saffron (Primary) | 0.68 0.2 48 | 0.72 0.18 55 | Dominant spiritual accent, success badges |
| Gold (Accent) | 0.78 0.14 75 | 0.78 0.14 75 | Luxury highlights, button accents, borders |
| Maroon (Foreground) | 0.35 0.12 25 | — | Deep text, titles, typography hierarchy |
| Cream (Background) | 0.97 0.015 85 | 0.14 0.04 28 | Light/dark mode base |
| Muted | 0.93 0.02 75 | 0.22 0.05 28 | Cards, section backgrounds |
| Success/Yoga | 0.65 0.16 140 | — | Beneficial yogas, green badges |
| Caution/Dosha | 0.55 0.22 25 | — | Malefic doshas, warnings |

## Typography
- **Display:** Cinzel (Greek geometric serif, luxury sacred temples, 28–48px headings)
- **Body:** Lato (warm, readable, contemporary, 14–20px)
- **Devanagari:** Noto Sans Devanagari (Hindi content, sacred scripts, 16–20px)
- **Sacred:** Tiro Devanagari Sanskrit (shloka/verses, 22px, line-height 2.0)

## Elevation & Depth
| Layer | Background | Border | Shadow | Use |
|-------|------------|--------|--------|-----|
| Base | `bg-background` | none | none | Page, no decoration |
| Card | `bg-card` ornamental-border | gold 40% + inner shadow | `shadow-spiritual` | Content library, results |
| Elevated | `bg-card` + gold gradient | gold 30% | `shadow-spiritual` + lift | Modal, featured section |
| Interactive | saffron/gold gradient | gold 50% | gold glow on hover | Buttons, speakers |
| Chart | `--chart-bg` with grid | `--grid-lines` 2px | none | Lagna, Navamsa, D9 |

## Structural Zones
| Zone | Background | Border | Treatment | Content |
|------|------------|--------|-----------|----------|
| Header | `bg-card` ornamental-border-b | gold 30% | Sticky, logo + lang toggle | Logo, nav, language picker |
| Hero Banner | maroon → deep-maroon gradient | none | Full-width overlay | Title, subtitle, CTA |
| Sidebar/Filter | `bg-muted/30` | `border-border` | Collapse mobile; saffron accent | Calendar, faith filter, category |
| Main Content | `bg-background` | none | Grid; alternating `bg-muted/20` | Content library, card grid |
| Dashboard | `bg-card` grid | `border-border` cells | Form top, chart grids below | Birth form, calculator |
| Blog Article | Image (300px), `.blog-card` | gold left-border | Audio player footer, speed controls | Article preview, TTS + upload |
| Gita Verse | `.gita-verse-card` gold-left-4 | `border-border` | 4-layer text stack | Sanskrit, transliteration, Hindi, English |
| 12-Feature Grid | `.feature-grid-12` 2×3 → 4×3 | `.temple-card` borders | Icon circle saffron 10%, hover lift | 12 features: Aarti, Chalisa, etc. |
| Life Report | `.life-report-hero` maroon bg | — | Form inputs saffron border, Stripe CTA | Birth form, testimonials, FAQ |
| Footer | `bg-muted/50` border-t | gold 20% | Right-aligned | Copyright, links, socials |

## Component Patterns
- **Buttons:** `.btn-spiritual` (saffron gradient) for actions, `.btn-gold` (gold gradient) for CTAs. Speaker: circle 40px, gold 10% bg, hover lift + glow.
- **Cards:** `.temple-card` (all content), `.blog-card` (articles), `.gita-verse-card` (verses), `.report-card` (forms). All: ornamental-border, hover lift + shadow-spiritual.
- **Badges/Pills:** Inline-flex, px-3 py-1, rounded-full, text-xs. Success (green 0.65 0.16 140), caution (saffron 0.68 0.2 48), warning (maroon 0.35 0.12 25).
- **Audio Player:** `.audio-player-bar` with play/pause, flex progress bar, speed buttons (0.75x/1x/1.5x active: saffron), time display.
- **Report Forms:** `.report-input` with saffron border 30%, focus glow saffron 10%, rounded-lg.
- **Testimonials:** `.testimonial-card` center-aligned, avatar (12px round), name (maroon bold), ratings (gold), quote (italic muted).

## Motion & Interaction
- **Hover:** All cards lift 2px + shadow-spiritual 200ms ease-out.
- **Speaker:** Pulsing ring `pulse-audio` on play, stops on pause.
- **Chart Reveal:** `.chart-fade` (0.4s scale-up + fade) on data load.
- **Score Reveal:** `.score-reveal` (0.6s scale-out) for AstroScore.
- **Dasha Timeline:** Current entry gold dot + subtle pulsing border.
- **Language Toggle:** Smooth color transition 200ms.
- **Audio Progress:** Drag to seek, click to jump.

## Spacing & Rhythm
- **Density:** Mobile 4px units, 16px gaps. Desktop: 24px gaps main sections, 12px nested.
- **Padding:** Cards 16px (md) → 24px (lg). Headers 12px vert. Buttons 12px vert, 16px horiz.
- **Line Height:** Body 1.6. Devanagari 1.8. Shloka 2.0 (dense sacred text).

## Responsive Design
- **Mobile (< 640px):** 1-col, 16px padding, 12px gaps, stacked compare columns.
- **Tablet (640–1024px):** 2-col product grid, 2×3 feature grid, charts 300px.
- **Desktop (> 1024px):** 3-col products, 4×3 feature grid, full compare side-by-side, charts 400px.

## Dark Mode
Backgrounds darker by ~30L (0.97 → 0.14, 0.99 → 0.18). Text lightened (0.18 → 0.94). Accent colors lifted slightly in saturation for contrast. Borders brighter (0.28 vs 0.85 light).

## Constraints
- ✓ Only saffron/gold/maroon/cream. No purple, teal, generic blues.
- ✓ Max 2–3 fonts per category (Cinzel display, Lato body, Devanagari scripts).
- ✓ Speaker buttons on all content (results, verses, articles). Audio auto-loop until stop.
- ✓ All charts SVG, responsive via `preserveAspectRatio="xMidYMid meet"`.
- ✓ Every section: visible background treatment (no ghost text).
- ✓ Hindi/English toggle persistent in localStorage.
- ✓ Ornamental borders on all elevated surfaces—gold 40% + inner shadow.

## New Sections (Gita Upgrade)
**Gita Layout:** Full 18-chapter grid. Each verse: Sanskrit (22pt Cinzel), transliteration (14pt italic), Hindi (16pt Devanagari bold saffron), English (14pt Lato). Stacked in `.gita-verse-card` (gold left-border 4px). Verse search + chapter nav top. Audio per verse (TTS or uploaded).

**12-Feature Card Grid (Homepage):** "One App. Complete Vedic Guidance" 3×4 grid. Each `.feature-card`: icon circle (saffron 10%), title (maroon Cinzel), description (Lato). Inherits `.temple-card` ornamental-border.

**Blog Audio Player:** Article cards with featured image (300px), title (maroon Cinzel), preview (muted Lato, 2-line clamp), `.audio-player-bar` footer. Speed buttons: 0.75x/1x/1.5x (active saffron). TTS + uploaded files both supported.

**Life Reports Pages (10 types):** Form section (birth date/name/gender, saffron borders), result cards, ₹499 Stripe button. Testimonials strip (4 `.testimonial-card`). FAQ accordion. Page hero: `.life-report-hero` (maroon gradient, cream text).

**369 Book Product Page:** Hero image (400px), title (maroon Cinzel 28pt), price (₹96 gold bold 24pt), description (Lato), Stripe button (gold gradient), reviews grid, related carousel.

**Krishna AI Chat:** Message history (user: cream bg + saffron text, Krishna: `.gita-verse-card` gold-border). Quick topic buttons (10 Gita topics). Chat input + send button (gold).

**Panchang Feature (Calendar):** 5 zones: (1) Controls—city/date/region, (2) Daily summary (20+ fields), (3) Monthly grid (7×6), (4) 8 collapsibles (Choghadiya/Hora/Lagna/etc.), (5) Festival strip. Choghadiya color-coded (green/yellow/red). Regional tabs (11 terminologies).

## Signature Detail
Ornamental borders on all cards — gold 40% border + inner shadow creates "framed sacred object" feel. Echoes temple architecture, manuscript illumination. Differentiates from flat modern; reinforces spiritual aesthetic.
