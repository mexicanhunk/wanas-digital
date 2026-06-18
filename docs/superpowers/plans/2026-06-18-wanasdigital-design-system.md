# WanasDigital Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `wanas-ui`, a 14-component React/TypeScript library from WanasDigital's brand, then sync it to Claude Design.

**Architecture:** Single CSS file (`wanas.css`) defines all `--wd-*` tokens and component classes. Components are stateless TSX files that apply className strings. tsup bundles to `dist/index.js` + `dist/index.d.ts`; CSS is copied to `dist/wanas.css` by a postbuild step.

**Tech Stack:** React 18, TypeScript 5, tsup, Vitest, @testing-library/react, jsdom

## Global Constraints

- All CSS custom properties prefixed `--wd-` (no exceptions — avoids collision with live site)
- All CSS class names prefixed `wd-` (no exceptions)
- Package name: `wanas-ui` (unscoped, local-only, never published to npm)
- React and react-dom are peer deps — never bundled
- No CSS-in-JS, no CSS modules — className strings only
- No Storybook, no dark mode, no form components
- `dist/` is gitignored
- Working directory for all commands: `~/WanasDigital/design-system/`
- Brand source of truth: `~/Documents/Alex's Personal Doc's/WanasDigital/wanas-digital-homepage.html`

---

## File Map

| File | Responsibility |
|---|---|
| `package.json` | deps, scripts |
| `tsconfig.json` | TypeScript config |
| `tsup.config.ts` | bundle config |
| `vitest.config.ts` | test config |
| `src/test-setup.ts` | jest-dom matchers |
| `src/styles/wanas.css` | ALL tokens + ALL component classes |
| `src/components/Button/{Button.tsx,Button.test.tsx,index.ts}` | pill button |
| `src/components/Badge/{Badge.tsx,Badge.test.tsx,index.ts}` | label pill |
| `src/components/Eyebrow/{Eyebrow.tsx,Eyebrow.test.tsx,index.ts}` | uppercase section label |
| `src/components/Card/{Card.tsx,Card.test.tsx,index.ts}` | generic content card |
| `src/components/Panel/{Panel.tsx,Panel.test.tsx,index.ts}` | larger featured card |
| `src/components/Price/{Price.tsx,Price.test.tsx,index.ts}` | price + strikethrough |
| `src/components/TrustBar/{TrustBar.tsx,TrustBar.test.tsx,index.ts}` | horizontal trust signals |
| `src/components/SectionHeader/{SectionHeader.tsx,SectionHeader.test.tsx,index.ts}` | eyebrow+h2+lead |
| `src/components/ProductCard/{ProductCard.tsx,ProductCard.test.tsx,index.ts}` | shop product tile |
| `src/components/FAQItem/{FAQItem.tsx,FAQItem.test.tsx,index.ts}` | single FAQ card |
| `src/components/Hero/{Hero.tsx,Hero.test.tsx,index.ts}` | page hero section |
| `src/components/CTABand/{CTABand.tsx,CTABand.test.tsx,index.ts}` | dark CTA strip |
| `src/components/Navbar/{Navbar.tsx,Navbar.test.tsx,index.ts}` | sticky frosted nav |
| `src/components/Footer/{Footer.tsx,Footer.test.tsx,index.ts}` | page footer |
| `src/index.ts` | barrel re-export of all components + types |
| `.gitignore` | excludes `dist/`, `node_modules/` |

---

### Task 1: Scaffold Package

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsup.config.ts`
- Create: `vitest.config.ts`
- Create: `src/test-setup.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces: npm scripts `build`, `test`, `dev`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "wanas-ui",
  "version": "1.0.0",
  "description": "WanasDigital React component library",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./dist/wanas.css": "./dist/wanas.css"
  },
  "scripts": {
    "build": "tsup && cp src/styles/wanas.css dist/wanas.css",
    "dev": "tsup --watch",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "jsdom": "^25.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tsup": "^8.3.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.tsx", "**/*.test.ts"]
}
```

- [ ] **Step 3: Create `tsup.config.ts`**

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
});
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
  },
});
```

- [ ] **Step 5: Create `src/test-setup.ts`**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 6: Create `.gitignore`**

```
dist/
node_modules/
.ds-build-meta.json
ds-bundle/
.sync-diff.json
```

- [ ] **Step 7: Create stub `src/index.ts` so install succeeds**

```ts
// populated in Task 9
export {};
```

- [ ] **Step 8: Create `src/styles/` directory and empty placeholder**

```bash
mkdir -p src/styles src/components
touch src/styles/wanas.css
```

- [ ] **Step 9: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors. Ignore peer dep warnings about react (they're in devDependencies here).

- [ ] **Step 10: Verify test runner works**

```bash
npm test
```

Expected: `No test files found` or 0 tests passed — NOT a crash. If you see `vitest: command not found`, run `npm install` again.

- [ ] **Step 11: Commit**

```bash
git add WanasDigital/design-system/
git commit -m "feat(wanas-ui): scaffold package with tsup + vitest"
```

---

### Task 2: Token CSS

**Files:**
- Create: `src/styles/wanas.css`

**Interfaces:**
- Produces: all `--wd-*` CSS custom properties on `:root`; all `wd-*` class names used by Tasks 3–8

- [ ] **Step 1: Write `src/styles/wanas.css`**

```css
/* Fonts — loaded via CSS @import so design-sync picks them up */
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@500,700&display=swap');

/* ---- Tokens ---- */
:root {
  /* Colors */
  --wd-bg:             #f7f6f2;
  --wd-surface:        #f9f8f5;
  --wd-surface-2:      #edeae5;
  --wd-text:           #28251d;
  --wd-muted:          #6f6c66;
  --wd-primary:        #01696f;
  --wd-primary-hover:  #0c4e54;
  --wd-border:         rgba(40, 37, 29, 0.12);
  --wd-danger:         #dc2626;
  --wd-amazon:         #ff9900;
  --wd-amber:          #f59e0b;

  /* Typography */
  --wd-font-sans:  "Satoshi", sans-serif;
  --wd-font-serif: "Boska", serif;
  --wd-font-logo:  "Cantarell", sans-serif;

  /* Shape */
  --wd-radius:      16px;
  --wd-radius-lg:   24px;
  --wd-radius-xl:   28px;
  --wd-radius-pill: 999px;
  --wd-shadow:      0 12px 30px rgba(0, 0, 0, 0.08);
  --wd-shadow-lg:   0 16px 40px rgba(0, 0, 0, 0.12);
  --wd-max-w:       1120px;
}

/* ---- Layout helpers ---- */
.wd-container {
  max-width: var(--wd-max-w);
  margin: 0 auto;
  padding: 0 20px;
}

.wd-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.wd-muted {
  color: var(--wd-muted);
}

.wd-lead {
  font-size: 1.15rem;
  max-width: 60ch;
  color: var(--wd-muted);
  margin-bottom: 28px;
  font-family: var(--wd-font-sans);
  line-height: 1.6;
}

/* ---- Button ---- */
.wd-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--wd-radius-pill);
  font-weight: 700;
  font-family: var(--wd-font-sans);
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: background 0.15s ease, box-shadow 0.15s ease;
  line-height: 1;
}

.wd-btn--primary {
  background: var(--wd-primary);
  color: #fff;
}

.wd-btn--primary:hover {
  background: var(--wd-primary-hover);
}

.wd-btn--secondary {
  background: var(--wd-surface);
  border: 1px solid var(--wd-border);
  color: var(--wd-text);
}

.wd-btn--secondary:hover {
  background: var(--wd-surface-2);
}

.wd-btn--sm { padding: 8px 14px;  font-size: 0.85rem; }
.wd-btn--md { padding: 14px 20px; font-size: 1rem;    }
.wd-btn--lg { padding: 18px 28px; font-size: 1.1rem;  }

/* ---- Badge ---- */
.wd-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 3px 10px;
  border-radius: 50px;
  text-transform: uppercase;
  font-family: var(--wd-font-sans);
}

.wd-badge--default,
.wd-badge--new,
.wd-badge--course,
.wd-badge--ebook { background: var(--wd-primary); color: #fff; }
.wd-badge--sale  { background: var(--wd-danger);  color: #fff; }
.wd-badge--amazon { background: var(--wd-amazon); color: #fff; }

/* ---- Eyebrow ---- */
.wd-eyebrow {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--wd-primary);
  font-weight: 700;
  margin-bottom: 16px;
  font-family: var(--wd-font-sans);
}

/* ---- Card ---- */
.wd-card {
  background: var(--wd-surface);
  border: 1px solid var(--wd-border);
  border-radius: var(--wd-radius);
  padding: 28px;
  box-shadow: var(--wd-shadow);
}

/* ---- Panel ---- */
.wd-panel {
  background: var(--wd-surface);
  border: 1px solid var(--wd-border);
  border-radius: var(--wd-radius-lg);
  padding: 34px;
  box-shadow: var(--wd-shadow);
}

/* ---- Price ---- */
.wd-price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--wd-primary);
  margin: 10px 0 18px;
  font-family: var(--wd-font-sans);
}

.wd-price__old {
  text-decoration: line-through;
  color: var(--wd-muted);
  font-weight: 400;
  font-size: 0.9rem;
  margin-left: 6px;
}

/* ---- TrustBar ---- */
.wd-trust-bar {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  color: var(--wd-muted);
  font-size: 0.95rem;
  font-family: var(--wd-font-sans);
}

/* ---- SectionHeader ---- */
.wd-section-header {
  margin-bottom: 32px;
}

.wd-section-header h2 {
  font-family: var(--wd-font-serif);
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
  margin-bottom: 14px;
  color: var(--wd-text);
}

/* ---- ProductCard ---- */
.wd-product-card {
  background: var(--wd-surface);
  border: 1px solid var(--wd-border);
  border-radius: var(--wd-radius);
  overflow: hidden;
  box-shadow: var(--wd-shadow);
  transition: transform 0.2s, box-shadow 0.2s;
}

.wd-product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--wd-shadow-lg);
}

.wd-product-card__body {
  padding: 20px;
}

.wd-product-card__body h3 {
  font-family: var(--wd-font-serif);
  font-size: 1.15rem;
  margin-bottom: 6px;
  color: var(--wd-text);
}

.wd-product-card__rating {
  color: var(--wd-amber);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.wd-product-card__rating span {
  color: var(--wd-muted);
  font-family: var(--wd-font-sans);
}

/* ---- FAQItem ---- */
.wd-faq-item {
  background: var(--wd-surface);
  border: 1px solid var(--wd-border);
  border-radius: var(--wd-radius);
  padding: 22px;
}

.wd-faq-item h3 {
  font-family: var(--wd-font-serif);
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--wd-text);
}

.wd-faq-item p {
  color: var(--wd-muted);
  font-family: var(--wd-font-sans);
  line-height: 1.6;
}

/* ---- Hero ---- */
.wd-hero {
  padding: 96px 0 72px;
}

.wd-hero h1 {
  font-family: var(--wd-font-serif);
  font-size: clamp(2.8rem, 6vw, 5rem);
  line-height: 1.05;
  max-width: 10ch;
  margin-bottom: 18px;
  color: var(--wd-text);
}

/* ---- CTABand ---- */
.wd-cta-band {
  background: var(--wd-text);
  color: #f9f8f4;
  border-radius: var(--wd-radius-xl);
  padding: 42px;
}

.wd-cta-band h2 {
  font-family: var(--wd-font-serif);
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
  color: #f9f8f4;
  margin-bottom: 12px;
}

.wd-cta-band p {
  color: rgba(249, 248, 244, 0.78);
  margin-bottom: 22px;
  font-family: var(--wd-font-sans);
  line-height: 1.6;
}

/* ---- Navbar ---- */
.wd-navbar {
  position: sticky;
  top: 0;
  background: rgba(247, 246, 242, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--wd-border);
  z-index: 10;
}

.wd-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  gap: 16px;
}

.wd-logo {
  font-family: var(--wd-font-serif);
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--wd-text);
  text-decoration: none;
}

.wd-nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.wd-nav-links a {
  text-decoration: none;
  color: var(--wd-text);
  font-family: var(--wd-font-sans);
  font-size: 1rem;
}

.wd-cart-count {
  background: var(--wd-primary);
  color: #fff;
  border-radius: var(--wd-radius-pill);
  padding: 1px 7px;
  font-size: 0.75rem;
  font-weight: 700;
}

/* ---- Footer ---- */
.wd-footer {
  padding: 36px 0 60px;
  color: var(--wd-muted);
  font-family: var(--wd-font-sans);
}

.wd-footer-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  border-top: 1px solid var(--wd-border);
  padding-top: 24px;
}

.wd-footer-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.wd-footer-links a {
  text-decoration: none;
  color: var(--wd-muted);
}

/* ---- Responsive ---- */
@media (max-width: 860px) {
  .wd-nav {
    align-items: flex-start;
    flex-direction: column;
  }
}
```

- [ ] **Step 2: Verify CSS is valid (no syntax errors)**

```bash
node -e "const fs = require('fs'); const css = fs.readFileSync('src/styles/wanas.css','utf8'); console.log('CSS bytes:', css.length); console.log('Token count:', (css.match(/--wd-/g)||[]).length);"
```

Expected: `CSS bytes:` some number, `Token count: 37` or higher (11 colors + typography + shape tokens, each appearing multiple times).

- [ ] **Step 3: Commit**

```bash
git add WanasDigital/design-system/src/styles/wanas.css
git commit -m "feat(wanas-ui): add token CSS with all wd-* classes"
```

---

### Task 3: Primitive Components — Button, Badge, Eyebrow

**Files:**
- Create: `src/components/Button/Button.tsx`
- Create: `src/components/Button/Button.test.tsx`
- Create: `src/components/Button/index.ts`
- Create: `src/components/Badge/Badge.tsx`
- Create: `src/components/Badge/Badge.test.tsx`
- Create: `src/components/Badge/index.ts`
- Create: `src/components/Eyebrow/Eyebrow.tsx`
- Create: `src/components/Eyebrow/Eyebrow.test.tsx`
- Create: `src/components/Eyebrow/index.ts`

**Interfaces:**
- Produces: `Button`, `ButtonProps`; `Badge`, `BadgeProps`; `Eyebrow`, `EyebrowProps`
- Consumed by: ProductCard (Badge, Button), SectionHeader (Eyebrow), Hero (Button, Eyebrow), CTABand (Button), Navbar (Button)

- [ ] **Step 1: Write failing tests for Button**

```tsx
// src/components/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('defaults to primary variant and md size', () => {
    render(<Button>Go</Button>);
    const el = screen.getByRole('button');
    expect(el).toHaveClass('wd-btn--primary');
    expect(el).toHaveClass('wd-btn--md');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByRole('button')).toHaveClass('wd-btn--secondary');
  });

  it('renders as anchor when href provided', () => {
    render(<Button href="/shop">Shop</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/shop');
    expect(link).toHaveClass('wd-btn');
  });

  it('calls onClick', () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Buy</Button>);
    screen.getByRole('button').click();
    expect(handler).toHaveBeenCalledOnce();
  });

  it('applies sm size class', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('wd-btn--sm');
  });
});
```

- [ ] **Step 2: Run — verify FAIL**

```bash
npm test -- --reporter=verbose 2>&1 | head -30
```

Expected: `Cannot find module './Button'` or similar — test file exists but component does not.

- [ ] **Step 3: Write `Button.tsx`**

```tsx
// src/components/Button/Button.tsx
import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  const cls = ['wd-btn', `wd-btn--${variant}`, `wd-btn--${size}`, className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return <a href={href} className={cls}>{children}</a>;
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Write `Button/index.ts`**

```ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

- [ ] **Step 5: Write failing tests for Badge**

```tsx
// src/components/Badge/Badge.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>NEW</Badge>);
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('defaults to default variant', () => {
    render(<Badge>TEST</Badge>);
    expect(screen.getByText('TEST')).toHaveClass('wd-badge--default');
  });

  it('applies sale variant', () => {
    render(<Badge variant="sale">SALE</Badge>);
    expect(screen.getByText('SALE')).toHaveClass('wd-badge--sale');
  });

  it('applies amazon variant', () => {
    render(<Badge variant="amazon">AMAZON PICK</Badge>);
    expect(screen.getByText('AMAZON PICK')).toHaveClass('wd-badge--amazon');
  });
});
```

- [ ] **Step 6: Write `Badge.tsx`**

```tsx
// src/components/Badge/Badge.tsx
import React from 'react';

export interface BadgeProps {
  variant?: 'default' | 'sale' | 'amazon' | 'course' | 'ebook' | 'new';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span className={`wd-badge wd-badge--${variant}`}>{children}</span>
  );
}
```

- [ ] **Step 7: Write `Badge/index.ts`**

```ts
export { Badge } from './Badge';
export type { BadgeProps } from './Badge';
```

- [ ] **Step 8: Write failing tests for Eyebrow**

```tsx
// src/components/Eyebrow/Eyebrow.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Eyebrow } from './Eyebrow';

describe('Eyebrow', () => {
  it('renders children', () => {
    render(<Eyebrow>Start Here</Eyebrow>);
    expect(screen.getByText('Start Here')).toBeInTheDocument();
  });

  it('has wd-eyebrow class', () => {
    render(<Eyebrow>Label</Eyebrow>);
    expect(screen.getByText('Label')).toHaveClass('wd-eyebrow');
  });
});
```

- [ ] **Step 9: Write `Eyebrow.tsx`**

```tsx
// src/components/Eyebrow/Eyebrow.tsx
import React from 'react';

export interface EyebrowProps {
  children: React.ReactNode;
}

export function Eyebrow({ children }: EyebrowProps) {
  return <div className="wd-eyebrow">{children}</div>;
}
```

- [ ] **Step 10: Write `Eyebrow/index.ts`**

```ts
export { Eyebrow } from './Eyebrow';
export type { EyebrowProps } from './Eyebrow';
```

- [ ] **Step 11: Run tests — verify all pass**

```bash
npm test
```

Expected: `6 tests passed` (Button) + `4 tests passed` (Badge) + `2 tests passed` (Eyebrow) = 12 tests, 0 failures.

- [ ] **Step 12: Commit**

```bash
git add WanasDigital/design-system/src/components/Button \
        WanasDigital/design-system/src/components/Badge \
        WanasDigital/design-system/src/components/Eyebrow
git commit -m "feat(wanas-ui): add Button, Badge, Eyebrow components"
```

---

### Task 4: Container + Data Components — Card, Panel, Price, TrustBar

**Files:**
- Create: `src/components/Card/{Card.tsx,Card.test.tsx,index.ts}`
- Create: `src/components/Panel/{Panel.tsx,Panel.test.tsx,index.ts}`
- Create: `src/components/Price/{Price.tsx,Price.test.tsx,index.ts}`
- Create: `src/components/TrustBar/{TrustBar.tsx,TrustBar.test.tsx,index.ts}`

**Interfaces:**
- Produces: `Card`, `CardProps`; `Panel`, `PanelProps`; `Price`, `PriceProps`; `TrustBar`, `TrustBarProps`
- Consumed by: ProductCard (Price), Hero (TrustBar), SectionHeader (none directly)

- [ ] **Step 1: Write and run failing tests for all four**

```tsx
// src/components/Card/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Content</p></Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has wd-card class', () => {
    const { container } = render(<Card>X</Card>);
    expect(container.firstChild).toHaveClass('wd-card');
  });

  it('accepts extra className', () => {
    const { container } = render(<Card className="custom">X</Card>);
    expect(container.firstChild).toHaveClass('wd-card', 'custom');
  });
});
```

```tsx
// src/components/Panel/Panel.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Panel } from './Panel';

describe('Panel', () => {
  it('renders children', () => {
    render(<Panel><p>Featured</p></Panel>);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('has wd-panel class', () => {
    const { container } = render(<Panel>X</Panel>);
    expect(container.firstChild).toHaveClass('wd-panel');
  });
});
```

```tsx
// src/components/Price/Price.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Price } from './Price';

describe('Price', () => {
  it('renders value', () => {
    render(<Price value="$49" />);
    expect(screen.getByText('$49')).toBeInTheDocument();
  });

  it('renders oldValue with strikethrough class', () => {
    render(<Price value="$49" oldValue="$99" />);
    expect(screen.getByText('$99')).toHaveClass('wd-price__old');
  });

  it('does not render oldValue when not provided', () => {
    render(<Price value="$29" />);
    expect(screen.queryByText('wd-price__old')).not.toBeInTheDocument();
  });
});
```

```tsx
// src/components/TrustBar/TrustBar.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TrustBar } from './TrustBar';

describe('TrustBar', () => {
  it('renders all items', () => {
    render(<TrustBar items={['Instant Download', 'Secure Payment', 'Auto Email']} />);
    expect(screen.getByText('Instant Download')).toBeInTheDocument();
    expect(screen.getByText('Secure Payment')).toBeInTheDocument();
    expect(screen.getByText('Auto Email')).toBeInTheDocument();
  });

  it('has wd-trust-bar class', () => {
    const { container } = render(<TrustBar items={['A']} />);
    expect(container.firstChild).toHaveClass('wd-trust-bar');
  });
});
```

Run: `npm test` — expected: ALL new tests FAIL (components don't exist yet).

- [ ] **Step 2: Write `Card.tsx`**

```tsx
// src/components/Card/Card.tsx
import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={['wd-card', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Write `Card/index.ts`**

```ts
export { Card } from './Card';
export type { CardProps } from './Card';
```

- [ ] **Step 4: Write `Panel.tsx`**

```tsx
// src/components/Panel/Panel.tsx
import React from 'react';

export interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className = '' }: PanelProps) {
  return (
    <div className={['wd-panel', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Write `Panel/index.ts`**

```ts
export { Panel } from './Panel';
export type { PanelProps } from './Panel';
```

- [ ] **Step 6: Write `Price.tsx`**

```tsx
// src/components/Price/Price.tsx
import React from 'react';

export interface PriceProps {
  value: string;
  oldValue?: string;
}

export function Price({ value, oldValue }: PriceProps) {
  return (
    <div className="wd-price">
      {value}
      {oldValue && <span className="wd-price__old">{oldValue}</span>}
    </div>
  );
}
```

- [ ] **Step 7: Write `Price/index.ts`**

```ts
export { Price } from './Price';
export type { PriceProps } from './Price';
```

- [ ] **Step 8: Write `TrustBar.tsx`**

```tsx
// src/components/TrustBar/TrustBar.tsx
import React from 'react';

export interface TrustBarProps {
  items: string[];
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <div className="wd-trust-bar">
      {items.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  );
}
```

- [ ] **Step 9: Write `TrustBar/index.ts`**

```ts
export { TrustBar } from './TrustBar';
export type { TrustBarProps } from './TrustBar';
```

- [ ] **Step 10: Run tests — verify all pass**

```bash
npm test
```

Expected: all 21 tests pass (12 from Task 3 + 3 + 2 + 3 + 2 = 9 new = 21 total).

- [ ] **Step 11: Commit**

```bash
git add WanasDigital/design-system/src/components/Card \
        WanasDigital/design-system/src/components/Panel \
        WanasDigital/design-system/src/components/Price \
        WanasDigital/design-system/src/components/TrustBar
git commit -m "feat(wanas-ui): add Card, Panel, Price, TrustBar"
```

---

### Task 5: Composite Components — SectionHeader, ProductCard, FAQItem

**Files:**
- Create: `src/components/SectionHeader/{SectionHeader.tsx,SectionHeader.test.tsx,index.ts}`
- Create: `src/components/ProductCard/{ProductCard.tsx,ProductCard.test.tsx,index.ts}`
- Create: `src/components/FAQItem/{FAQItem.tsx,FAQItem.test.tsx,index.ts}`

**Interfaces:**
- Consumes: `Eyebrow` from `../Eyebrow`; `Badge`, `BadgeProps` from `../Badge`; `Price`, `PriceProps` from `../Price`; `Button` from `../Button`
- Produces: `SectionHeader`, `SectionHeaderProps`; `ProductCard`, `ProductCardProps`; `FAQItem`, `FAQItemProps`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/SectionHeader/SectionHeader.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders heading', () => {
    render(<SectionHeader heading="Choose your path" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Choose your path');
  });

  it('renders eyebrow when provided', () => {
    render(<SectionHeader eyebrow="Start Here" heading="Title" />);
    expect(screen.getByText('Start Here')).toHaveClass('wd-eyebrow');
  });

  it('does not render eyebrow when omitted', () => {
    render(<SectionHeader heading="Title" />);
    expect(screen.queryByClass?.('wd-eyebrow')).not.toBeInTheDocument();
  });

  it('renders lead text when provided', () => {
    render(<SectionHeader heading="Title" lead="Learn more here." />);
    expect(screen.getByText('Learn more here.')).toBeInTheDocument();
  });
});
```

```tsx
// src/components/ProductCard/ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';

const baseProps = {
  title: '30-Day AI Playbook',
  price: { value: '$49', oldValue: '$99' },
  description: 'Master AI in 30 days.',
  cta: { label: 'Buy Now' },
};

describe('ProductCard', () => {
  it('renders title', () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByText('30-Day AI Playbook')).toBeInTheDocument();
  });

  it('renders price', () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByText('$49')).toBeInTheDocument();
    expect(screen.getByText('$99')).toHaveClass('wd-price__old');
  });

  it('renders description', () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByText('Master AI in 30 days.')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<ProductCard {...baseProps} badge={{ label: 'BESTSELLER' }} />);
    expect(screen.getByText('BESTSELLER')).toHaveClass('wd-badge');
  });

  it('renders CTA button', () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByRole('button', { name: 'Buy Now' })).toBeInTheDocument();
  });

  it('renders CTA as link when href provided', () => {
    render(<ProductCard {...baseProps} cta={{ label: 'Buy', href: '/shop' }} />);
    expect(screen.getByRole('link', { name: 'Buy' })).toHaveAttribute('href', '/shop');
  });
});
```

```tsx
// src/components/FAQItem/FAQItem.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FAQItem } from './FAQItem';

describe('FAQItem', () => {
  it('renders question as heading', () => {
    render(<FAQItem question="Is it instant?" answer="Yes, download right away." />);
    expect(screen.getByText('Is it instant?')).toBeInTheDocument();
  });

  it('renders answer text', () => {
    render(<FAQItem question="Q" answer="Yes, download right away." />);
    expect(screen.getByText('Yes, download right away.')).toBeInTheDocument();
  });

  it('has wd-faq-item class', () => {
    const { container } = render(<FAQItem question="Q" answer="A" />);
    expect(container.firstChild).toHaveClass('wd-faq-item');
  });
});
```

Run `npm test` — expected: new tests FAIL.

- [ ] **Step 2: Write `SectionHeader.tsx`**

```tsx
// src/components/SectionHeader/SectionHeader.tsx
import React from 'react';
import { Eyebrow } from '../Eyebrow';

export interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  lead?: string;
}

export function SectionHeader({ eyebrow, heading, lead }: SectionHeaderProps) {
  return (
    <div className="wd-section-header">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{heading}</h2>
      {lead && <p className="wd-lead">{lead}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Write `SectionHeader/index.ts`**

```ts
export { SectionHeader } from './SectionHeader';
export type { SectionHeaderProps } from './SectionHeader';
```

- [ ] **Step 4: Write `ProductCard.tsx`**

```tsx
// src/components/ProductCard/ProductCard.tsx
import React from 'react';
import { Badge } from '../Badge';
import type { BadgeProps } from '../Badge';
import { Price } from '../Price';
import type { PriceProps } from '../Price';
import { Button } from '../Button';

export interface ProductCardProps {
  badge?: { variant?: BadgeProps['variant']; label: string };
  title: string;
  price: PriceProps;
  description: string;
  cta: { label: string; href?: string; onClick?: () => void };
  rating?: { value: number; count?: number };
}

export function ProductCard({
  badge,
  title,
  price,
  description,
  cta,
  rating,
}: ProductCardProps) {
  return (
    <div className="wd-product-card">
      <div className="wd-product-card__body">
        {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
        <h3>{title}</h3>
        <Price value={price.value} oldValue={price.oldValue} />
        {rating && (
          <div className="wd-product-card__rating">
            {'⭐'.repeat(Math.round(rating.value))}
            {rating.count != null && (
              <span> ({rating.value}/5 · {rating.count} reviews)</span>
            )}
          </div>
        )}
        <p className="wd-muted">{description}</p>
        <Button href={cta.href} onClick={cta.onClick}>{cta.label}</Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Write `ProductCard/index.ts`**

```ts
export { ProductCard } from './ProductCard';
export type { ProductCardProps } from './ProductCard';
```

- [ ] **Step 6: Write `FAQItem.tsx`**

```tsx
// src/components/FAQItem/FAQItem.tsx
import React from 'react';

export interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="wd-faq-item">
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  );
}
```

- [ ] **Step 7: Write `FAQItem/index.ts`**

```ts
export { FAQItem } from './FAQItem';
export type { FAQItemProps } from './FAQItem';
```

- [ ] **Step 8: Run tests — verify all pass**

```bash
npm test
```

Expected: all tests pass. Total ~34 tests. If the `queryByClass` line in SectionHeader test causes an error, replace it with:
```tsx
it('does not render eyebrow when omitted', () => {
  const { container } = render(<SectionHeader heading="Title" />);
  expect(container.querySelector('.wd-eyebrow')).not.toBeInTheDocument();
});
```

- [ ] **Step 9: Commit**

```bash
git add WanasDigital/design-system/src/components/SectionHeader \
        WanasDigital/design-system/src/components/ProductCard \
        WanasDigital/design-system/src/components/FAQItem
git commit -m "feat(wanas-ui): add SectionHeader, ProductCard, FAQItem"
```

---

### Task 6: Section Components — Hero, CTABand

**Files:**
- Create: `src/components/Hero/{Hero.tsx,Hero.test.tsx,index.ts}`
- Create: `src/components/CTABand/{CTABand.tsx,CTABand.test.tsx,index.ts}`

**Interfaces:**
- Consumes: `Eyebrow` from `../Eyebrow`; `Button` from `../Button`; `TrustBar` from `../TrustBar`
- Produces: `Hero`, `HeroProps`; `CTABand`, `CTABandProps`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/Hero/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  const base = {
    heading: 'Master AI faster.',
    primaryCta: { label: 'Shop Now', href: '#shop' },
  };

  it('renders heading as h1', () => {
    render(<Hero {...base} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Master AI faster.');
  });

  it('renders primary CTA', () => {
    render(<Hero {...base} />);
    expect(screen.getByRole('link', { name: 'Shop Now' })).toHaveAttribute('href', '#shop');
  });

  it('renders secondary CTA when provided', () => {
    render(<Hero {...base} secondaryCta={{ label: 'Book a Call', href: '#coaching' }} />);
    expect(screen.getByRole('link', { name: 'Book a Call' })).toBeInTheDocument();
  });

  it('renders eyebrow when provided', () => {
    render(<Hero {...base} eyebrow="Premium Store" />);
    expect(screen.getByText('Premium Store')).toHaveClass('wd-eyebrow');
  });

  it('renders trust items when provided', () => {
    render(<Hero {...base} trustItems={['Instant Download', 'Secure']} />);
    expect(screen.getByText('Instant Download')).toBeInTheDocument();
  });
});
```

```tsx
// src/components/CTABand/CTABand.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CTABand } from './CTABand';

describe('CTABand', () => {
  it('renders heading', () => {
    render(<CTABand heading="Ready to start?" cta={{ label: 'Get Access' }} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Ready to start?');
  });

  it('renders CTA button', () => {
    render(<CTABand heading="Go" cta={{ label: 'Get Access' }} />);
    expect(screen.getByRole('button', { name: 'Get Access' })).toBeInTheDocument();
  });

  it('renders body when provided', () => {
    render(<CTABand heading="Go" body="No coding required." cta={{ label: 'Start' }} />);
    expect(screen.getByText('No coding required.')).toBeInTheDocument();
  });

  it('has wd-cta-band class', () => {
    const { container } = render(<CTABand heading="Go" cta={{ label: 'Go' }} />);
    expect(container.firstChild).toHaveClass('wd-cta-band');
  });
});
```

Run `npm test` — expected: Hero + CTABand tests FAIL.

- [ ] **Step 2: Write `Hero.tsx`**

```tsx
// src/components/Hero/Hero.tsx
import React from 'react';
import { Eyebrow } from '../Eyebrow';
import { Button } from '../Button';
import { TrustBar } from '../TrustBar';

export interface HeroProps {
  eyebrow?: string;
  heading: string;
  lead?: string;
  primaryCta: { label: string; href?: string; onClick?: () => void };
  secondaryCta?: { label: string; href?: string; onClick?: () => void };
  trustItems?: string[];
}

export function Hero({
  eyebrow,
  heading,
  lead,
  primaryCta,
  secondaryCta,
  trustItems,
}: HeroProps) {
  return (
    <section className="wd-hero">
      <div className="wd-container">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1>{heading}</h1>
        {lead && <p className="wd-lead">{lead}</p>}
        <div className="wd-actions">
          <Button href={primaryCta.href} onClick={primaryCta.onClick}>
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              variant="secondary"
              href={secondaryCta.href}
              onClick={secondaryCta.onClick}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
        {trustItems && <TrustBar items={trustItems} />}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `Hero/index.ts`**

```ts
export { Hero } from './Hero';
export type { HeroProps } from './Hero';
```

- [ ] **Step 4: Write `CTABand.tsx`**

```tsx
// src/components/CTABand/CTABand.tsx
import React from 'react';
import { Button } from '../Button';

export interface CTABandProps {
  heading: string;
  body?: string;
  cta: { label: string; href?: string; onClick?: () => void };
}

export function CTABand({ heading, body, cta }: CTABandProps) {
  return (
    <div className="wd-cta-band">
      <h2>{heading}</h2>
      {body && <p>{body}</p>}
      <Button href={cta.href} onClick={cta.onClick}>{cta.label}</Button>
    </div>
  );
}
```

- [ ] **Step 5: Write `CTABand/index.ts`**

```ts
export { CTABand } from './CTABand';
export type { CTABandProps } from './CTABand';
```

- [ ] **Step 6: Run tests — all pass**

```bash
npm test
```

Expected: ~43 tests pass, 0 failures.

- [ ] **Step 7: Commit**

```bash
git add WanasDigital/design-system/src/components/Hero \
        WanasDigital/design-system/src/components/CTABand
git commit -m "feat(wanas-ui): add Hero, CTABand section components"
```

---

### Task 7: Navigation + Footer — Navbar, Footer

**Files:**
- Create: `src/components/Navbar/{Navbar.tsx,Navbar.test.tsx,index.ts}`
- Create: `src/components/Footer/{Footer.tsx,Footer.test.tsx,index.ts}`

**Interfaces:**
- Consumes: `Button` from `../Button`
- Produces: `Navbar`, `NavbarProps`; `Footer`, `FooterProps`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/Navbar/Navbar.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
];

describe('Navbar', () => {
  it('renders logo text', () => {
    render(<Navbar links={links} />);
    expect(screen.getByText('Wanas Digital')).toBeInTheDocument();
  });

  it('renders all nav links', () => {
    render(<Navbar links={links} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#home');
    expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute('href', '#shop');
  });

  it('shows cart count when > 0', () => {
    render(<Navbar links={links} cartCount={3} />);
    expect(screen.getByText('3')).toHaveClass('wd-cart-count');
  });

  it('hides cart count badge when 0', () => {
    render(<Navbar links={links} cartCount={0} />);
    expect(screen.queryByClass?.('wd-cart-count')).not.toBeInTheDocument();
  });

  it('calls onCartClick', () => {
    const fn = vi.fn();
    render(<Navbar links={links} onCartClick={fn} />);
    screen.getByRole('button', { name: /cart/i }).click();
    expect(fn).toHaveBeenCalledOnce();
  });
});
```

```tsx
// src/components/Footer/Footer.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders default copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/Wanas Digital/)).toBeInTheDocument();
  });

  it('renders custom copyright', () => {
    render(<Footer copyright="© 2026 My Brand" />);
    expect(screen.getByText('© 2026 My Brand')).toBeInTheDocument();
  });

  it('renders links when provided', () => {
    render(<Footer links={[{ label: 'Privacy', href: '/privacy' }]} />);
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy');
  });

  it('has wd-footer class', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toHaveClass('wd-footer');
  });
});
```

Run `npm test` — Navbar + Footer tests FAIL.

- [ ] **Step 2: Write `Navbar.tsx`**

```tsx
// src/components/Navbar/Navbar.tsx
import React, { useEffect } from 'react';
import { Button } from '../Button';

export interface NavbarProps {
  links: { label: string; href: string }[];
  cartCount?: number;
  onCartClick?: () => void;
  onSignIn?: () => void;
}

export function Navbar({ links, cartCount, onCartClick, onSignIn }: NavbarProps) {
  useEffect(() => {
    if (typeof document !== 'undefined' &&
        !document.querySelector('link[href*="fontshare"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=boska@500,700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <header className="wd-navbar">
      <div className="wd-container wd-nav">
        <div className="wd-logo">Wanas Digital</div>
        <nav className="wd-nav-links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          {onSignIn && (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onSignIn(); }}
            >
              Sign In
            </a>
          )}
          <Button variant="secondary" onClick={onCartClick}>
            🛒 Cart
            {cartCount != null && cartCount > 0 && (
              <span className="wd-cart-count">{cartCount}</span>
            )}
          </Button>
          <Button href="#shop">Shop Now</Button>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Write `Navbar/index.ts`**

```ts
export { Navbar } from './Navbar';
export type { NavbarProps } from './Navbar';
```

- [ ] **Step 4: Write `Footer.tsx`**

```tsx
// src/components/Footer/Footer.tsx
import React from 'react';

export interface FooterProps {
  links?: { label: string; href: string }[];
  copyright?: string;
}

export function Footer({ links, copyright }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="wd-footer">
      <div className="wd-container">
        <div className="wd-footer-row">
          <span>{copyright ?? `© ${year} Wanas Digital`}</span>
          {links && links.length > 0 && (
            <div className="wd-footer-links">
              {links.map((link) => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Write `Footer/index.ts`**

```ts
export { Footer } from './Footer';
export type { FooterProps } from './Footer';
```

- [ ] **Step 6: Run tests — all pass**

```bash
npm test
```

Expected: ~52 tests, 0 failures. If `queryByClass` in Navbar test throws, replace:
```tsx
it('hides cart count badge when 0', () => {
  const { container } = render(<Navbar links={links} cartCount={0} />);
  expect(container.querySelector('.wd-cart-count')).not.toBeInTheDocument();
});
```

- [ ] **Step 7: Commit**

```bash
git add WanasDigital/design-system/src/components/Navbar \
        WanasDigital/design-system/src/components/Footer
git commit -m "feat(wanas-ui): add Navbar, Footer"
```

---

### Task 8: Barrel Export + Build Verification

**Files:**
- Modify: `src/index.ts`

**Interfaces:**
- Produces: single entrypoint re-exporting all 14 components + types; `dist/index.js`, `dist/index.d.ts`, `dist/wanas.css`

- [ ] **Step 1: Write `src/index.ts`**

```ts
// src/index.ts
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

export { Eyebrow } from './components/Eyebrow';
export type { EyebrowProps } from './components/Eyebrow';

export { Card } from './components/Card';
export type { CardProps } from './components/Card';

export { Panel } from './components/Panel';
export type { PanelProps } from './components/Panel';

export { Price } from './components/Price';
export type { PriceProps } from './components/Price';

export { TrustBar } from './components/TrustBar';
export type { TrustBarProps } from './components/TrustBar';

export { SectionHeader } from './components/SectionHeader';
export type { SectionHeaderProps } from './components/SectionHeader';

export { ProductCard } from './components/ProductCard';
export type { ProductCardProps } from './components/ProductCard';

export { FAQItem } from './components/FAQItem';
export type { FAQItemProps } from './components/FAQItem';

export { Hero } from './components/Hero';
export type { HeroProps } from './components/Hero';

export { CTABand } from './components/CTABand';
export type { CTABandProps } from './components/CTABand';

export { Navbar } from './components/Navbar';
export type { NavbarProps } from './components/Navbar';

export { Footer } from './components/Footer';
export type { FooterProps } from './components/Footer';
```

- [ ] **Step 2: Run full test suite one final time**

```bash
npm test
```

Expected: all tests pass, 0 failures.

- [ ] **Step 3: Build the package**

```bash
npm run build
```

Expected output ends with something like:
```
ESM  dist/index.js  ...KB
DTS  dist/index.d.ts
```
Then `cp src/styles/wanas.css dist/wanas.css` copies the CSS.

- [ ] **Step 4: Verify dist contents**

```bash
ls dist/
```

Expected: `index.js`, `index.d.ts`, `wanas.css` all present.

- [ ] **Step 5: Verify declarations include all 14 components**

```bash
grep "^export" dist/index.d.ts | wc -l
```

Expected: 28 lines (14 component exports + 14 type exports).

- [ ] **Step 6: Verify bundle is valid ESM**

```bash
node -e "import('./WanasDigital/design-system/dist/index.js').then(m => console.log('Exports:', Object.keys(m).join(', ')))" 2>&1 || node --input-type=module <<'EOF'
import m from '/home/alex/WanasDigital/design-system/dist/index.js';
console.log('ok');
EOF
```

If the import fails with "Cannot use import in non-module", run instead:
```bash
node -e "const fs = require('fs'); const js = fs.readFileSync('dist/index.js','utf8'); console.log('Bundle size:', js.length, 'bytes'); console.log('Has Button:', js.includes('wd-btn')); console.log('Has ProductCard:', js.includes('wd-product-card'));" 2>&1
```

Expected: Bundle size > 2000 bytes, both `Has Button: true` and `Has ProductCard: true`.

- [ ] **Step 7: Commit**

```bash
git add WanasDigital/design-system/src/index.ts
git commit -m "feat(wanas-ui): barrel export + verified build"
```

---

### Task 9: Run /design-sync

**Files:**
- Creates: `.design-sync/config.json` (by the skill)
- Creates: `ds-bundle/` (by the skill)

**Interfaces:**
- Consumes: `dist/index.js`, `dist/index.d.ts`, `dist/wanas.css` from Task 8
- Produces: WanasDigital design system project in Claude Design at `https://claude.ai/design/p/<projectId>`

- [ ] **Step 1: Ensure dist is up to date**

```bash
cd ~/WanasDigital/design-system && npm run build
```

Expected: build succeeds, `dist/wanas.css` present.

- [ ] **Step 2: Run /design-sync from the design-system directory**

In Claude Code, from `~/WanasDigital/design-system/`:

```
/design-sync
```

The skill will:
1. Detect no existing config → first-time sync
2. Ask to create a new Claude Design project (name it "WanasDigital Design System")
3. Detect shape: **package** (no `.storybook/` present)
4. Run the converter (`package-build.mjs`) on the `dist/`
5. Ask for one-time upload approval
6. Upload components to Claude Design as they're verified

- [ ] **Step 3: Commit the design-sync config**

After the sync completes, the skill will have created `.design-sync/config.json`:

```bash
git add WanasDigital/design-system/.design-sync/
git commit -m "feat(wanas-ui): add design-sync config for Claude Design project"
```

---

## Self-Review Notes

- All 14 components from the spec have tasks: ✓
- All component APIs match the spec signatures: ✓
- CSS class names used in components (`wd-btn--primary`, `wd-card`, etc.) all defined in `wanas.css` Task 2: ✓
- `ProductCard` imports `Badge`, `Price`, `Button` — all defined before Task 5: ✓
- `Hero` imports `Eyebrow`, `Button`, `TrustBar` — all defined before Task 6: ✓
- `CTABand` imports `Button` — defined before Task 6: ✓
- `Navbar` imports `Button` — defined before Task 7: ✓
- `SectionHeader` imports `Eyebrow` — defined before Task 5: ✓
- Font loading: `@import` in `wanas.css` handles it for design-sync; Navbar also injects via JS for runtime use: ✓
- `dist/` excluded from git via `.gitignore`: ✓
- Package name `wanas-ui` used consistently (no `@wanas/ui`): ✓
