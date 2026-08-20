# design-sync notes

## Fonts

`src/styles/wanas.css` now loads Fraunces + Inter via Google Fonts
(`fonts.googleapis.com`), which the render validator whitelists directly —
no more `[FONT_MISSING]` warning. (Previously loaded Satoshi/Boska from
Fontshare, which the validator's remote-host regex didn't recognize; that
warning no longer applies since the 2026-08-20 palette/type refresh away
from Fontshare fonts.)

## Product images

`ProductCard` now accepts an optional `image: { src, alt }` prop
(`.wd-product-card__media`, 4:3, object-fit: cover, rounded top corners).
Preview cards (`Default`, `NoBadge`) reference placeholder paths under
`/products/*.jpg` — swap for real generated/uploaded product art before
next design-sync. `NoImage` preview shows the graceful fallback when a
product has no art yet.
