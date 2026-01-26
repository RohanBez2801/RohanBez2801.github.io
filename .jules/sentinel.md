## 2025-05-18 - Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers/meta tags.
**Learning:** Static sites often neglect CSP, relying on the hosting provider, but adding a meta tag provides a defense-in-depth layer against XSS, especially when using third-party CDNs (Tailwind, Fonts).
**Prevention:** Always include a strict CSP meta tag in `index.html` for static sites.

## 2026-01-26 - SRI and Referrer Policy
**Vulnerability:** Missing Subresource Integrity (SRI) for external CSS and missing Referrer Policy.
**Learning:** Using `@import` for external resources bypasses SRI checks. Adding a strict Referrer Policy prevents leaking sensitive URL parameters to external sites.
**Prevention:** Prefer `<link>` with `integrity` attribute over `@import`. Always define a Referrer Policy.
