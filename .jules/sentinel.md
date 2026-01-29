## 2025-05-18 - Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers/meta tags.
**Learning:** Static sites often neglect CSP, relying on the hosting provider, but adding a meta tag provides a defense-in-depth layer against XSS, especially when using third-party CDNs (Tailwind, Fonts).
**Prevention:** Always include a strict CSP meta tag in `index.html` for static sites.

## 2025-05-18 - CSS @import and SRI
**Vulnerability:** Loading third-party CSS via `@import` prevents the use of Subresource Integrity (SRI), leaving the site vulnerable if the CDN is compromised.
**Learning:** `link` tags with `integrity` attributes are the only way to ensure the authenticity of external resources. `@import` is opaque to the browser's integrity checks.
**Prevention:** Always use `<link>` tags for external CSS and include the SRI hash.

## 2025-05-18 - Removing unsafe-inline from CSP
**Vulnerability:** `style-src 'unsafe-inline'` weakens CSP by allowing inline styles, which can be vectors for CSS injection attacks.
**Learning:** Refactoring inline styles (e.g., `style="z-index: 10001"`) into utility classes in `style.css` allows for a stricter CSP without breaking functionality.
**Prevention:** Avoid `style="..."` attributes; use utility classes and remove `'unsafe-inline'` from CSP.
