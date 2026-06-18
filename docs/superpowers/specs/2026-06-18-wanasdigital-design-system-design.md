# WanasDigital Design System — Spec

**Date**: 2026-06-18  
**Stack**: React 18 + TypeScript + tsup + CSS custom properties  
**Target**: `~/WanasDigital/design-system/` → sync to Claude Design via `/design-sync`

---

## Overview

A typed React component library extracted from the WanasDigital homepage HTML. Ships as an npm package (`@wanas/ui`) consumed locally. Primary purpose: sync to Claude Design so the design agent builds on-brand WanasDigital screens from real components.

Source of truth for all tokens, shapes, and component API: the live homepage at `Documents/Alex's Personal Doc's/WanasDigital/wanas-digital-homepage.html`.

---

## Architecture

```
~/WanasDigital/design-system/
├── package.json              # name: wanas-ui, version: 1.0.0
├── tsup.config.ts            # ESM bundle + .d.ts declarations
├── tsconfig.json
├── src/
│   ├── index.ts              # barrel: all components + types
│   ├── styles/
│   │   └── wanas.css         # token variables + all component classes
│   └── components/
│       ├── Button/
│       │   ├── Button.tsx
│       │   └── index.ts
│       ├── Badge/
│       ├── Card/
│       ├── Panel/
│       ├── Eyebrow/
│       ├── Price/
│       ├── ProductCard/
│       ├── SectionHeader/
│       ├── TrustBar/
│       ├── Hero/
│       ├── CTABand/
│       ├── FAQItem/
│       ├── Navbar/
│       └── Footer/
├── dist/                     # gitignored, built output
│   ├── index.js              # ESM bundle
│   ├── index.d.ts            # TypeScript declarations (for design-sync)
│   └── wanas.css             # copied from src/styles/wanas.css
└── .design-sync/             # design-sync config (created during sync)
```

**14 components total.** No internal state except `Navbar` (mobile menu toggle).

---

## Token System

All tokens prefixed `--wd-` to avoid collision with the live site.

### Colors

| Token | Value | Usage |
|---|---|---|
| `--wd-bg` | `#f7f6f2` | Page background (cream) |
| `--wd-surface` | `#f9f8f5` | Card / panel background |
| `--wd-surface-2` | `#edeae5` | Slightly darker surface |
| `--wd-text` | `#28251d` | Primary text (warm near-black) |
| `--wd-muted` | `#6f6c66` | Secondary / muted text |
| `--wd-primary` | `#01696f` | Teal — buttons, badges, links |
| `--wd-primary-hover` | `#0c4e54` | Teal hover state |
| `--wd-border` | `rgba(40,37,29,0.12)` | Card / nav borders |
| `--wd-danger` | `#dc2626` | Sale / discount badges |
| `--wd-amazon` | `#ff9900` | Affiliate / Amazon badges |
| `--wd-amber` | `#f59e0b` | Star ratings, logo accent |

### Typography

| Token | Value | Usage |
|---|---|---|
| `--wd-font-sans` | `"Satoshi", sans-serif` | Body, UI text |
| `--wd-font-serif` | `"Boska", serif` | Headings h1/h2/h3 |
| `--wd-font-logo` | `"Cantarell", sans-serif` | Logo wordmark only |

Fonts loaded from Fontshare CDN. The `Navbar` component injects the `<link>` tag if not already present.

### Shape & Shadow

| Token | Value |
|---|---|
| `--wd-radius` | `16px` |
| `--wd-radius-lg` | `24px` |
| `--wd-radius-xl` | `28px` |
| `--wd-radius-pill` | `999px` |
| `--wd-shadow` | `0 12px 30px rgba(0,0,0,0.08)` |
| `--wd-shadow-lg` | `0 16px 40px rgba(0,0,0,0.12)` |
| `--wd-max-w` | `1120px` |

---

## CSS Strategy

Single `src/styles/wanas.css` file:
1. Defines all `--wd-*` CSS custom properties on `:root`
2. Contains all component class names (`.wd-btn`, `.wd-card`, etc.)
3. Copied to `dist/wanas.css` by tsup

Consumers do `import 'wanas-ui/dist/wanas.css'` once at app root. Components apply `className` strings — no CSS-in-JS, no CSS modules. This mirrors the homepage's existing approach and keeps the bundle pure JS.

---

## Component API

### `Button`
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'   // default: 'primary'
  size?: 'sm' | 'md' | 'lg'           // default: 'md'
  href?: string                        // renders <a> if set
  onClick?: () => void
  children: React.ReactNode
  className?: string
}
```
Renders pill shape. Primary: teal bg + white text. Secondary: surface bg + border.

### `Badge`
```tsx
interface BadgeProps {
  variant?: 'default' | 'sale' | 'amazon' | 'course' | 'ebook' | 'new'
  children: React.ReactNode
}
```
Small uppercase pill label. `sale` → red. `amazon` → orange. Others → teal.

### `Eyebrow`
```tsx
interface EyebrowProps { children: React.ReactNode }
```
Uppercase teal label with wide letter-spacing. Used above section headings.

### `Card`
```tsx
interface CardProps {
  children: React.ReactNode
  className?: string
}
```
Surface background, border, `--wd-radius`, shadow. Generic container.

### `Panel`
```tsx
interface PanelProps {
  children: React.ReactNode
  className?: string
}
```
Like Card but larger padding (34px) and `--wd-radius-lg`. Used for featured content blocks.

### `Price`
```tsx
interface PriceProps {
  value: string       // e.g. "$49"
  oldValue?: string   // renders strikethrough, e.g. "$99"
}
```

### `ProductCard`
```tsx
interface ProductCardProps {
  badge?: { variant?: BadgeProps['variant']; label: string }
  title: string
  price: PriceProps
  description: string
  cta: { label: string; href?: string; onClick?: () => void }
  rating?: { value: number; count?: number }
}
```
Includes hover lift animation (`translateY(-4px)`). Renders rating stars if `rating` provided.

### `SectionHeader`
```tsx
interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  lead?: string
}
```
Eyebrow + h2 + lead paragraph stacked vertically.

### `TrustBar`
```tsx
interface TrustBarProps {
  items: string[]   // e.g. ["Instant Download", "Secure Payment"]
}
```
Flex row of muted text trust signals.

### `Hero`
```tsx
interface HeroProps {
  eyebrow?: string
  heading: string
  lead?: string
  primaryCta: { label: string; href?: string; onClick?: () => void }
  secondaryCta?: { label: string; href?: string; onClick?: () => void }
  trustItems?: string[]
}
```
Full hero section. Eyebrow + h1 + lead + action buttons + TrustBar.

### `CTABand`
```tsx
interface CTABandProps {
  heading: string
  body?: string
  cta: { label: string; href?: string; onClick?: () => void }
}
```
Dark (`--wd-text`) rounded band for section-level calls to action.

### `FAQItem`
```tsx
interface FAQItemProps {
  question: string
  answer: string
}
```
Single FAQ card. Surface bg, border, rounded.

### `Navbar`
```tsx
interface NavbarProps {
  links: { label: string; href: string }[]
  cartCount?: number
  onCartClick?: () => void
  onSignIn?: () => void
}
```
Sticky frosted-glass header. Injects Fontshare `<link>` if absent. Mobile: stacks vertically below 860px.

### `Footer`
```tsx
interface FooterProps {
  links?: { label: string; href: string }[]
  copyright?: string   // default: "© {year} Wanas Digital"
}
```
Flex row with border-top, muted text.

---

## Build & Toolchain

**Package name**: `wanas-ui` (unscoped, local-only — not published to npm registry)  
**Local install** (from another project): `npm install ../design-system` or use directly from `~/WanasDigital/design-system/`  
**Runtime deps**: `react`, `react-dom` (peer deps — not bundled)  
**Dev deps**: `typescript`, `tsup`, `@types/react`, `@types/react-dom`

```ts
// tsup.config.ts
export default {
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
}
```

```json
// package.json scripts
"build": "tsup && cp src/styles/wanas.css dist/wanas.css",
"dev": "tsup --watch"
```

`npm run build` runs tsup (JS + `.d.ts`) then copies the CSS. `dist/` is gitignored.

`dist/` is gitignored. Built before running `/design-sync`.

---

## Design-Sync Integration

Shape: **package** (no Storybook).  
After build, run `/design-sync` from `~/WanasDigital/design-system/`.  
Config saved to `.design-sync/config.json`.  
The skill's converter (`package-build.mjs`) bundles `dist/index.js` + `dist/wanas.css` into the Claude Design project format.

---

## Out of Scope

- Storybook (can be added later for richer previews)
- Dark mode
- Animation library
- Form components (inputs, selects) — no forms in the current homepage
- i18n
