# Spiritual Connect — Design Brief

## Overview
Sacred, immersive astrology platform with Vedic/numerological analysis. Saffron + gold + cream palette. Ornate, spiritual aesthetic with warm tones. Calculator-driven dashboards, chart visualizations, comparison views, and AI-powered insights.

## Design Direction
**Tone:** Spiritual maximalism — reverent, warm, immersive. Every surface intentional: no ghost text. Ornate borders, subtle gradients, layered depth.
**Differentiation:** Sacred geometry integration (Lo Shu Grid, Lagna charts), planet-specific color coding, real-time data recalculation UI, audio accessibility throughout.

## Color Palette (OKLCH)

| Semantic | Light L C H | Dark L C H | Purpose |
|----------|-------------|-----------|---------|
| Saffron (Primary) | 0.68 0.2 48 | 0.72 0.18 55 | Dominant Hindu/spiritual accent |
| Gold (Accent) | 0.78 0.14 75 | 0.78 0.14 75 | Luxury, interactive highlights, buttons |
| Maroon (Foreground) | 0.35 0.12 25 | — | Deep text, typography hierarchy |
| Cream (Background) | 0.97 0.015 85 | 0.14 0.04 28 | Light mode base; dark mode base |
| Chakra 1–5 | 0.65 0.2 30, 0.68 0.2 48, 0.78 0.14 75, 0.62 0.16 120, 0.55 0.18 200 | Adjusted | Dasha visualization, planets |
| Success/Yoga | 0.65 0.16 140 | — | Beneficial yogas, green badges |
| Caution/Dosha | 0.55 0.22 25 | — | Malefic doshas, warnings |

## Typography
- **Display:** Cinzel (Greek geometric serif, luxury sacred temples)
- **Body:** Lato (warm, readable, contemporary)
- **Devanagari:** Noto Sans Devanagari (Hindi content, sacred scripts)
- **Scale:** 14px base → 16px → 20px → 28px → 36px (calculator results) → 48px (hero)

## Elevation & Depth
| Layer | Background | Border | Shadow | Use |
|-------|------------|--------|--------|-----|
| Base | `bg-background` | none | none | Page background, no decoration |
| Card | `bg-card` with ornamental-border | `border-border` + gold 40% | `shadow-spiritual` | Aarti, Chalisa, mantra details |
| Elevated | `bg-card` with gold gradient overlay | gold 30% | `shadow-spiritual` + lift | Modal, popover, featured section |
| Interactive | `bg-primary` or gold gradient | gold 50% | gold glow on hover | Buttons, speaker buttons, interactive elements |
| Chart | `--chart-bg` with grid lines | `--grid-lines` 2px | none | Lagna chart, Navamsa, D9, Ashtakvarga grids |

## Structural Zones

| Zone | Background | Border | Treatment | Content |
|------|------------|--------|-----------|---------|
| Header | `bg-card` ornamental-border-b | gold 30% | Sticky, logo + language toggle + search | Logo, navigation, language selector, voice search |
| Hero Banner | `bg-gradient` (maroon → deep maroon) | none | Full-width overlay on temple image | Title, subtitle, "Enter Birth Data" CTA |
| Sidebar/Filter | `bg-muted/30` | `border-border` | Collapse on mobile; ornate accent-left | Calendar, faith selector, category filters |
| Main Content | `bg-background` | none | Grid layout, alternating `bg-muted/20` rows | Searchable content library, cards in grid |
| Dashboard Section | `bg-card` grid | `border-border` between cells | Input form top, chart grids, result cards below | Birth data form, Mulank/Bhagyank, Lo Shu Grid, Lagna chart |
| Calculator Result | `.calculator-result-card` | `border-border` | Gradient bg, speaker button top-right, gold accents | Result value, label, detail, audio button |
| Chart Grid | `.chart-grid` | dashed 2px `--grid-lines` | SVG overlay for house numbers, planets | Lagna houses, Navamsa, Divisional charts, planet positions |
| Comparison View | 2-column grid `.comparison-row` | `border-border` between columns | Left/right symmetry, subtle highlight on active | Two birth data sets side-by-side |
| Product Card | `.product-card` rounded-lg | `border-border` | Image top, specs/details, price/CTA footer | Product image, specs table, price, Add to Cart |
| Logo Creator | `.canvas-container` dashed border | `--grid-lines` 2px dashed | Toolbar above, canvas below, export buttons | Canvas for symbol placement, alignment indicators |
| Timeline (Dasha) | `.dasha-timeline` with left border | `--grid-lines` 2px left | Dot-and-line, current entry glows | Mahadasha periods, antardasha sub-entries |
| Footer | `bg-muted/50` border-t | gold 20% | Right-aligned | Copyright, links, social icons |

## Component Patterns
- **Buttons:** Two tiers — `.btn-spiritual` (saffron gradient) for actions, `.btn-gold` (gold gradient) for CTAs. Speaker buttons: circle 40px, gold background 10%, hover lift + glow.
- **Badges/Pills:** Inline-flex with px-3 py-1, rounded-full, text-xs. Three semantic colors: success (green), caution (yellow/saffron), warning (red/maroon).
- **Cards:** Always `ornamental-border` (gold 40% border + inner shadow), rounded-lg, hover lift + shadow increase.
- **Data Tables:** `planet-table` with muted header row, alternating hover, right-align numbers.
- **Grids:** Chart grids 3×3 or 4×3 aspect-square cells, dashed border, SVG overlays for labels.
- **Speaker Buttons:** Circle shape, fixed position (top-right on result cards), gold color, play animation on active.

## Motion & Interaction
- **Hover:** All cards lift 2px + shadow increase 200ms ease-out.
- **Speaker Button:** Pulsing ring `pulse-audio` animation on play, stops on pause.
- **Chart Reveal:** `.chart-fade` (0.4s scale-up + fade) when data loads.
- **Score Reveal:** `.score-reveal` (0.6s scale-out from center) for AstroScore.
- **Dasha Timeline:** Current entry glows with gold dot + subtle pulsing border.
- **Toggle:** Language toggle (Hindi/English) smooth color transition 200ms.

## Spacing & Rhythm
- **Density:** Mobile (4px base unit) → 16px gaps. Desktop: 24px gaps on main sections, 12px on nested items.
- **Padding:** Cards 16px (md) → 24px (lg). Headers 12px (vertical). Buttons 12px (vertical), 16px (horizontal).
- **Line Height:** Body 1.6. Devanagari 1.8. Shloka 2.0 (dense sacred text).

## Key Features & Styling
- **19 AI Question Cards:** Locked-state with grayscale, blurred preview. Unlock button (saffron gradient). Speaker button per card.
- **Lo Shu Grid:** 3×3 grid, each cell 80px+. Present numbers: success-yoga color, glowing border. Missing: opacity 40%.
- **Lagna Chart:** North Indian 12-house square, planets in houses (SVG), color-coded by planet type.
- **Navamsa (D9):** Same layout as Lagna, separate visualization.
- **Dasha Timeline:** Vertical left-border line, dot at each entry, current entry highlighted with gold dot + glow.
- **Ashtakvarga Table:** 12 sign columns, rows per planet, cells 40px square. Color graded: high (green 20%), medium (saffron 20%), low (red 20%).
- **Product Pages:** Hero image + specs grid (label/value pairs) + price (gold text, large) + Add to Cart (gold gradient button) + Stripe checkout.
- **Logo Creator:** 400px canvas, toolbar with symbol/shape buttons above, numerology/astrology alignment panel below, export PNG/SVG.
- **Name Selection Tool:** Card-based suggestions, each with name (saffron bold), compatibility score (green badge), missing number impact (red pill).
- **Horoscope Comparison:** Two-column layout, input forms side-by-side, result sections aligned for direct comparison.

## Responsive Design
- **Mobile (< 640px):** Single column, 16px padding, 12px gaps, stacked comparison columns.
- **Tablet (640–1024px):** 2-column grid for product cards, charts 300px, cards wrap.
- **Desktop (> 1024px):** 3-column product grid, full comparison side-by-side, charts 400px.

## Dark Mode
Backgrounds darker by ~30L (0.97 → 0.14, 0.99 → 0.18). Text lightened (0.18 → 0.94). Accent colors lifted slightly in saturation for contrast. Borders slightly brighter (0.28 vs 0.85 in light mode).

## Constraints
- ✓ No purple gradients. Only saffron/gold/maroon/cream.
- ✓ Max 2–3 fonts per category (display + body + mono).
- ✓ Speaker buttons only on calculator results, not global audio player.
- ✓ All charts use SVG, not raster. Responsive scaling via `preserveAspectRatio="xMidYMid meet"`.
- ✓ Every section has a visible background treatment (no ghost text).
- ✓ Audio speaker buttons loop until explicit stop; no auto-play.
- ✓ Hindi/English toggle persists in localStorage.

## Signature Detail
**Ornamental borders** on all cards and elevated surfaces — gold inner shadow + border combo creates a "framed sacred object" feel. Echoes temple architecture and manuscript illumination. Differentiates from flat modern design and reinforces spiritual aesthetic.
