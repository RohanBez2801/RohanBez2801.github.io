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

## 2025-05-18 - CSP Upgrade Insecure Requests
**Vulnerability:** Mixed content warnings or insecure resource loading if the site is served over HTTPS but requests HTTP resources.
**Learning:** The `upgrade-insecure-requests` directive in CSP automatically upgrades insecure HTTP requests to HTTPS before fetching. This is a powerful "set and forget" security enhancement for modern sites, especially when relative paths or user-generated content might accidentally use HTTP.
**Prevention:** Include `upgrade-insecure-requests;` in the CSP.

## 2025-05-18 - CSP Connect-Src Regression Risks
**Vulnerability:** Overly strict `connect-src 'none'` can silently break legitimate site features (like analytics, hot-reloading, or future enhancements) if not carefully audited.
**Learning:** While `connect-src 'none'` is secure for a purely static site, it imposes a maintenance burden and regression risk for future changes. `connect-src 'self'` is a balanced default for static sites that might evolve.
**Prevention:** Default to `connect-src 'self'` unless strict prohibition of all network requests is a specific requirement.

## 2026-02-01 - Monolithic Event Listener Risks
**Vulnerability:** A "Logic Bomb" availability issue where an early `return` inside a monolithic `DOMContentLoaded` listener caused subsequent, unrelated features (like accessibility controls) to fail silently under specific conditions (reduced motion).
**Learning:** Monolithic initialization functions are fragile. Guard clauses for specific features should only exit the scope of that feature, not the entire initialization block.
**Prevention:** Scope feature-specific logic in functions or explicit blocks. Avoid top-level `return` in the main entry point unless the entire application should stop.

## 2026-02-02 - External Link Security
**Vulnerability:** Reverse Tabnabbing & Referrer Leakage. Opening external links (like WhatsApp) without `noopener` allows the target page to access `window.opener` in older browsers, potentially enabling phishing redirects. Missing `noreferrer` leaks the source URL.
**Learning:** Even "trusted" external sites (like `wa.me`) can behave unexpectedly or track users via Referrer headers. Explicitly setting `rel="noopener noreferrer"` provides a robust defense and privacy enhancement.
**Prevention:** Always use `rel="noopener noreferrer"` when using `target="_blank"`. Update `aria-label` to indicate the new tab behavior for accessibility.
