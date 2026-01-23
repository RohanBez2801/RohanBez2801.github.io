## 2025-10-26 - Visual Polish vs. Semantic Structure
**Learning:** Portfolio sites often prioritize advanced visual effects (glassmorphism, neon) while neglecting basic semantic HTML structure for navigation.
**Action:** Always check the "hamburger" menu on portfolio sites first—it's the most common accessibility failure point.

## 2025-10-26 - Accessibility in Smooth Scrolling
**Learning:** Custom smooth scroll implementations often hijack all anchor links, breaking focus management for accessibility features like skip links.
**Action:** When adding skip links, always check for and exclude them from global smooth scroll event listeners.
