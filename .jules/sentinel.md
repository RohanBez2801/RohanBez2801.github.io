## 2026-01-17 - Content Security Policy (CSP) Implementation
**Vulnerability:** Lack of Content Security Policy (CSP).
**Learning:** Static sites without a CSP are vulnerable to XSS if they allow unrestricted script/style sources. Even simple sites should define a boundary.
**Prevention:** Added a strict CSP meta tag in `index.html` allowing only 'self', Google Fonts, and jsDelivr (Tailwind). Blocked object-src.
