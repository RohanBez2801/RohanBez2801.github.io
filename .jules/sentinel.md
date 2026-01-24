## 2025-05-18 - Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers/meta tags.
**Learning:** Static sites often neglect CSP, relying on the hosting provider, but adding a meta tag provides a defense-in-depth layer against XSS, especially when using third-party CDNs (Tailwind, Fonts).
**Prevention:** Always include a strict CSP meta tag in `index.html` for static sites.

## 2025-05-20 - Subresource Integrity & Referrer Policy
**Vulnerability:** Missing SRI on CDN resources and missing Referrer Policy.
**Learning:** Loading CSS via `@import` inside a stylesheet prevents the use of Subresource Integrity (SRI), leaving the site vulnerable if the CDN is compromised. Moving it to an HTML `<link>` tag allows for integrity checks. Also, static sites defaults to sending full referrer URLs, which can leak path information.
**Prevention:** Use `<link>` tags with `integrity` attributes for all CDN resources. Set a strict Referrer Policy (e.g., `strict-origin-when-cross-origin`) via meta tag.
