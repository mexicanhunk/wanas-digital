# design-sync notes

## Known render warns

- `[FONT_MISSING] "Satoshi", "Boska"` — false positive. `src/styles/wanas.css` loads both via `@import url("https://api.fontshare.com/v2/css?...")`, a real remote font host. The validator's remote-host regex only recognizes `fonts.googleapis`/`fonts.gstatic`/`use.typekit`/`fonts.bunny`, so fontshare.com isn't whitelisted and it downgrades to a warning instead of `[FONT_REMOTE]`. Confirmed with user 2026-06-20 — accepted as-is, fonts load at runtime from fontshare's CDN. No local woff2 needed.

## Re-sync risks

- If `api.fontshare.com` ever goes away or the @import is removed from `wanas.css`, Satoshi/Boska will silently fall back to system fonts in every rendered design — nothing will flag this since it's accepted as a known warn.
