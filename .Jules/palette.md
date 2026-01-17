## 2025-10-26 - Visual Polish vs. Semantic Structure
**Learning:** Portfolio sites often prioritize advanced visual effects (glassmorphism, neon) while neglecting basic semantic HTML structure for navigation.
**Action:** Always check the "hamburger" menu on portfolio sites first—it's the most common accessibility failure point.

## 2026-01-17 - Smooth Scroll vs. Accessibility
**Learning:** Global smooth-scroll scripts often hijack local anchor links, breaking the focus-shift required for 'Skip to Content' links to work properly.
**Action:** Always exclude skip links from global smooth-scroll selectors (e.g. `:not(.skip-link)`) and ensure the target container has `tabindex="-1"`.
