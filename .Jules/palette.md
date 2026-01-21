## 2025-10-26 - Visual Polish vs. Semantic Structure
**Learning:** Portfolio sites often prioritize advanced visual effects (glassmorphism, neon) while neglecting basic semantic HTML structure for navigation.
**Action:** Always check the "hamburger" menu on portfolio sites first—it's the most common accessibility failure point.

## 2025-10-27 - Smooth Scroll Hijacking
**Learning:** Custom smooth scrolling scripts (common in portfolios) often break accessibility features like "Skip to Content" links by intercepting the click and preventing default focus management.
**Action:** Always exclude skip links from global smooth scroll selectors (e.g., `a[href^="#"]:not(.skip-link)`) or ensure the script explicitly handles focus.
