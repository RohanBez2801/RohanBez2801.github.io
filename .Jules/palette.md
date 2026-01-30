## 2025-10-26 - Visual Polish vs. Semantic Structure
**Learning:** Portfolio sites often prioritize advanced visual effects (glassmorphism, neon) while neglecting basic semantic HTML structure for navigation.
**Action:** Always check the "hamburger" menu on portfolio sites first—it's the most common accessibility failure point.

## 2025-10-27 - Accessible Hidden Elements in Tailwind v2 CDN
**Learning:** Tailwind v2 CDN build lacks default `focus` variants for `inset` utilities, making off-screen positioning transitions difficult without custom config.
**Action:** Use `opacity-0 pointer-events-none focus:opacity-100 focus:pointer-events-auto` for "Skip to Content" links to ensure visibility on focus in static builds.

## 2025-10-28 - Performance of Scroll Listeners with Animations
**Learning:** When adding scroll-triggered UI elements (like Back to Top buttons) to a page with heavy custom cursor/parallax animations, using `requestAnimationFrame` is critical to prevent layout thrashing and maintain smooth frame rates.
**Action:** Always wrap scroll event handlers in a `requestAnimationFrame` loop or throttle function when other animations are present.

## 2025-05-18 - [Custom Cursor Accessibility]
**Learning:** Hiding the default cursor with `cursor: none` is an accessibility barrier if not scoped to users who have no motion preference, as custom cursors can be disorienting or unusable for some.
**Action:** Always wrap custom cursor styles and logic in `@media (prefers-reduced-motion: no-preference)` and `if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)`.
