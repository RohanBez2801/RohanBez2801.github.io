## 2025-05-19 - Active Navigation with Center-Line Intersection
**Learning:** Standard `threshold` based IntersectionObserver fails for sections taller than the viewport or when multiple sections are partially visible. Using `rootMargin: '-50% 0px -50% 0px'` creates a precise "center-line" trigger that reliably identifies the active section regardless of height.
**Action:** Use center-line intersection for all scroll-spy/active-state features in single-page layouts.
