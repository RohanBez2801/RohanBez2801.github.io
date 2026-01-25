## 2025-10-26 - Visual Polish vs. Semantic Structure
**Learning:** Portfolio sites often prioritize advanced visual effects (glassmorphism, neon) while neglecting basic semantic HTML structure for navigation.
**Action:** Always check the "hamburger" menu on portfolio sites first—it's the most common accessibility failure point.

## 2025-01-25 - Skip Link Implementation Details
**Learning:** For a "Skip to content" link to work reliably, the target container (e.g., `<main>`) must have `tabindex="-1"` to programmatically receive focus. Additionally, JS smooth-scroll scripts often hijack these links, breaking the focus transfer.
**Action:** When adding skip links, always ensure the target has `tabindex="-1"` and explicitly exclude the skip link class from any global smooth-scroll event listeners.
