## 2025-05-18 - Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers/meta tags.
**Learning:** Static sites often neglect CSP, relying on the hosting provider, but adding a meta tag provides a defense-in-depth layer against XSS, especially when using third-party CDNs (Tailwind, Fonts).
**Prevention:** Always include a strict CSP meta tag in `index.html` for static sites.

## 2025-05-23 - CSP Unsafe-Inline Removal
**Vulnerability:** The Content Security Policy (CSP) `style-src` directive included `'unsafe-inline'`, which weakens protection against XSS by allowing malicious inline styles.
**Learning:** Even simple utility styles like `animation-delay` can force the use of `'unsafe-inline'`. Moving these to CSS classes allows for a strict CSP without sacrificing functionality.
**Prevention:** Avoid inline `style` attributes entirely. Use utility classes for dynamic styling where possible, or specific CSS-in-JS solutions that don't rely on unsafe inline styles.
