## 2025-05-18 - Content Security Policy
**Vulnerability:** Missing Content Security Policy (CSP) headers/meta tags.
**Learning:** Static sites often neglect CSP, relying on the hosting provider, but adding a meta tag provides a defense-in-depth layer against XSS, especially when using third-party CDNs (Tailwind, Fonts).
**Prevention:** Always include a strict CSP meta tag in `index.html` for static sites.

## 2025-05-18 - CSP and Inline Styles
**Vulnerability:** Using `style-src 'unsafe-inline'` in CSP allows XSS via style attribute injection.
**Learning:** Even simple animations (like `animation-delay`) often lead to `unsafe-inline` usage. Replacing them with CSS utility classes allows for a much stricter CSP, blocking a significant XSS vector.
**Prevention:** Audit all `style="..."` attributes, replace with classes, and remove `'unsafe-inline'` from `style-src`.
