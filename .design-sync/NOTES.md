# design-sync notes

## Fonts

`src/styles/wanas.css` now loads Fraunces + Inter via Google Fonts
(`fonts.googleapis.com`), which the render validator whitelists directly —
no more `[FONT_MISSING]` warning. (Previously loaded Satoshi/Boska from
Fontshare, which the validator's remote-host regex didn't recognize; that
warning no longer applies since the 2026-08-20 palette/type refresh away
from Fontshare fonts.)

## Product images

`ProductCard` accepts an optional `image: { src, alt }` prop
(`.wd-product-card__media`, rounded top corners, `object-fit: cover`).

Four product covers were generated in Canva (on-brand via the connected
brand kit), exported as PNG, and committed to `src/assets/products/`:
`ai-prompt-playbook.png`, `ai-foundations-course.png`,
`amazon-desk-setup.png`, `notion-template-pack.png`.

Three of the four exported at their design's native portrait ratio
(636×900) rather than the requested 4:3 box — Canva's poster canvas kept
its own aspect ratio regardless of the requested export dimensions. Rather
than force a 4:3 crop that would cut into the cover titles, the media slot
was changed from `aspect-ratio: 4/3` to `3/4` to match.

Preview cards (`Default`, `NoBadge`, `AmazonPick`, `TemplatePack`) reference
these images via `/products/*.png` — that path assumes they're copied into
the consuming site's public asset folder at that route. The source files
live in this repo under `src/assets/products/` and were also handed to the
user directly, since the live site isn't hosted from this repo.
