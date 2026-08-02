# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`wanas-ui` — a typed React component library (14 components) extracted from the WanasDigital homepage HTML. It's consumed locally (never published to npm) and its primary purpose is to be built and synced to Claude Design via the `/design-sync` skill so the design agent builds on-brand WanasDigital screens from real components.

Source of truth for tokens, shapes, and component APIs is the live homepage HTML (`wanas-digital-homepage.html`, outside this repo) — components here are a faithful port of that markup/CSS, not an independent design.

## Commands

```bash
npm install          # deps aren't vendored; install before build/test
npm run build         # tsup (ESM + .d.ts) then copies src/styles/wanas.css -> dist/wanas.css
npm run dev            # tsup --watch
npm test                # vitest run (all tests, once)
npm run test:watch       # vitest watch mode
```

Run a single test file: `npx vitest run src/components/Button/Button.test.tsx`
Run tests matching a name: `npx vitest run -t "renders secondary variant"`

There is no lint script configured. `dist/` is gitignored and must be rebuilt before running `/design-sync`.

## Architecture

- **`src/styles/wanas.css`** is the single source of styling truth: it defines every `--wd-*` CSS custom property (colors, typography, radii, shadows) on `:root` and every component's class rules (`.wd-btn`, `.wd-card`, etc.). Components never use CSS-in-JS or CSS modules — they only apply class-name strings built from props (e.g. `wd-btn wd-btn--primary wd-btn--md`). When changing a component's visual style, edit this file, not inline styles.
- **`src/components/<Name>/`** each contains `<Name>.tsx`, `<Name>.test.tsx`, and a barrel `index.ts` re-exporting the component and its `Props` type. `src/index.ts` is the top-level barrel that re-exports every component + type — any new component must be added there or it isn't part of the public package API.
- Components are stateless function components except **`Navbar`**, which uses `useEffect` to inject a Fontshare `<link>` tag into `document.head` if one isn't already present (guards `typeof document !== "undefined"`). This is the only component with side effects/internal state.
- Composite components build on primitives via plain prop drilling, not context: `ProductCard` composes `Badge` + `Price` + `Button`; `Hero` composes `Eyebrow` + `TrustBar` + `Button`; `Navbar` composes `Button`. Prop shapes for nested pieces reuse the child's exported prop type, e.g. `ProductCardProps.badge` is typed against `BadgeProps["variant"]`, and CTA-like props are consistently `{ label: string; href?: string; onClick?: () => void }` (renders `<a>` if `href` is set, `<button>` otherwise).
- **Tokens** (`--wd-*` prefix, no exceptions) and **class names** (`wd-*` prefix, no exceptions) are prefixed to avoid colliding with the live WanasDigital site's own CSS when embedded on the same page.
- `react`/`react-dom` are peer dependencies and are marked `external` in `tsup.config.ts` — never bundle them.
- `.design-sync/` holds the design-sync skill's config (`config.json`, shape: `"package"`) and generated component previews (`.design-sync/previews/*.tsx`) used to render each component in Claude Design; these preview files import from `"wanas-ui"` (the built package), not relative source paths. `.design-sync/NOTES.md` documents a known false-positive font warning (Fontshare isn't in the sync validator's allowed remote-font-host list) — accepted as-is, not a bug to fix.
- `docs/superpowers/` contains the original spec and implementation plan for this library — useful background on intended component APIs and constraints (e.g. no Storybook, no dark mode, no form components, no i18n — all explicitly out of scope) if extending the library.

## Conventions

- New components follow the existing folder pattern exactly: `Component.tsx` (function component + exported `ComponentProps` interface), `Component.test.tsx` (vitest + @testing-library/react, asserting rendered text/roles/classes), `index.ts` barrel — then add the export pair to `src/index.ts`.
- Any CTA-shaped prop should follow the established `{ label: string; href?: string; onClick?: () => void }` shape for consistency with `Button`'s dual anchor/button rendering.
- Add corresponding classes to `src/styles/wanas.css` under a `/* ---- ComponentName ---- */` section, using existing `--wd-*` tokens rather than introducing new hard-coded values.
