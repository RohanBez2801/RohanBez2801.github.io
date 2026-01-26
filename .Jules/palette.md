## 2025-10-26 - Visual Polish vs. Semantic Structure
**Learning:** Portfolio sites often prioritize advanced visual effects (glassmorphism, neon) while neglecting basic semantic HTML structure for navigation.
**Action:** Always check the "hamburger" menu on portfolio sites first—it's the most common accessibility failure point.

## 2025-10-26 - Smooth Scroll vs. Skip Links
**Learning:** Global smooth-scroll scripts (`a[href^="#"]`) often hijack "Skip to Content" links, preventing them from properly moving keyboard focus to the main content.
**Action:** Always exclude skip links (e.g., via class check) from smooth scrolling scripts to preserve default browser behavior for accessibility.
