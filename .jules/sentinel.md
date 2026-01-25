## 2025-05-18 - Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers/meta tags.
**Learning:** Static sites often neglect CSP, relying on the hosting provider, but adding a meta tag provides a defense-in-depth layer against XSS, especially when using third-party CDNs (Tailwind, Fonts).
**Prevention:** Always include a strict CSP meta tag in `index.html` for static sites.

## 2025-05-18 - Subresource Integrity (SRI)
**Vulnerability:** Third-party CSS loaded via `@import` lacks integrity checks, allowing potential supply chain attacks if the CDN is compromised.
**Learning:** `@import` in CSS cannot use SRI. Moving to `<link>` tags in HTML allows verification of file content.
**Prevention:** Always use `<link>` tags with `integrity` attributes for third-party assets.
