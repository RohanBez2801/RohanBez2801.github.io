## 2025-05-18 - Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers/meta tags.
**Learning:** Static sites often neglect CSP, relying on the hosting provider, but adding a meta tag provides a defense-in-depth layer against XSS, especially when using third-party CDNs (Tailwind, Fonts).
**Prevention:** Always include a strict CSP meta tag in `index.html` for static sites.

## 2025-05-18 - CSP and Inline Styles
**Vulnerability:** 'unsafe-inline' in style-src directive weakens CSP protection against XSS.
**Learning:** Even decorative inline styles (like `animation-delay`) require 'unsafe-inline'. Refactoring them to utility classes allows for a much stricter CSP. CSSOM manipulations (like `element.style.prop = val`) are compatible with strict CSP, allowing complex JS animations without `unsafe-inline` or `setAttribute('style', ...)`.
**Prevention:** Avoid inline `style="..."` attributes entirely. Use utility classes for static styles and CSSOM properties for dynamic values.
