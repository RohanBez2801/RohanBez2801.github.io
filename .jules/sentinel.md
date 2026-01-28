## 2025-05-18 - Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers/meta tags.
**Learning:** Static sites often neglect CSP, relying on the hosting provider, but adding a meta tag provides a defense-in-depth layer against XSS, especially when using third-party CDNs (Tailwind, Fonts).
**Prevention:** Always include a strict CSP meta tag in `index.html` for static sites.

## 2025-05-18 - CSS @import and SRI
**Vulnerability:** Loading third-party CSS via `@import` prevents the use of Subresource Integrity (SRI), leaving the site vulnerable if the CDN is compromised.
**Learning:** `link` tags with `integrity` attributes are the only way to ensure the authenticity of external resources. `@import` is opaque to the browser's integrity checks.
**Prevention:** Always use `<link>` tags for external CSS and include the SRI hash.

## 2025-05-18 - Strict CSP: Removing unsafe-inline
**Vulnerability:** `style-src 'unsafe-inline'` permits any inline style, making it harder to prevent XSS attacks that deface the site or use overlaid elements for phishing.
**Learning:** Browsers distinguish between `style="..."` attributes (blocked without `unsafe-inline`) and `element.style.prop = ...` assignments in JavaScript (allowed even without `unsafe-inline`). This means we can tighten CSP by moving static inline styles to CSS classes while keeping JS animations.
**Prevention:** Replace all `style="..."` attributes with utility classes and remove `'unsafe-inline'` from the CSP `style-src` directive.
