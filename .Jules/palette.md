## 2025-10-26 - Visual Polish vs. Semantic Structure
**Learning:** Portfolio sites often prioritize advanced visual effects (glassmorphism, neon) while neglecting basic semantic HTML structure for navigation.
**Action:** Always check the "hamburger" menu on portfolio sites first—it's the most common accessibility failure point.

## 2025-10-27 - Performance and Accessibility Interplay
**Learning:** Hiding animated elements via CSS for `prefers-reduced-motion` leaves JS animation loops running, wasting battery and CPU.
**Action:** Pair CSS overrides with `window.matchMedia` checks in JS to completely stop `requestAnimationFrame` loops and event listeners.
