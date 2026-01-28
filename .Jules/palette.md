## 2025-10-26 - Visual Polish vs. Semantic Structure
**Learning:** Portfolio sites often prioritize advanced visual effects (glassmorphism, neon) while neglecting basic semantic HTML structure for navigation.
**Action:** Always check the "hamburger" menu on portfolio sites first—it's the most common accessibility failure point.

## 2025-10-27 - Accessible Hidden Elements in Tailwind v2 CDN
**Learning:** Tailwind v2 CDN build lacks default `focus` variants for `inset` utilities, making off-screen positioning transitions difficult without custom config.
**Action:** Use `opacity-0 pointer-events-none focus:opacity-100 focus:pointer-events-auto` for "Skip to Content" links to ensure visibility on focus in static builds.

## 2025-10-27 - The Cursor Trap in Reduced Motion
**Learning:** Using `* { cursor: auto !important }` to override custom cursors in reduced-motion modes inadvertently removes pointer affordances from links and buttons if not paired with specific overrides.
**Action:** Always restore `cursor: pointer` for interactive elements (`a`, `button`, inputs) when resetting global cursors for accessibility.
