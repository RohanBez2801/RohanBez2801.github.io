## 2026-02-05 - Robust Scroll Spy Implementation
**Learning:** Using `IntersectionObserver` with a `rootMargin` that collapses the intersection area to a central line (e.g., `'-45% 0px -45% 0px'`) is highly effective for "Scroll Spy" navigation highlighting. However, it requires explicit handling of the `!isIntersecting` state to ensure active classes are removed when scrolling to unobserved areas.
**Action:** Always include an `else` block or explicit cleanup logic in `IntersectionObserver` callbacks for navigation state.

## 2026-02-05 - Semantic Active States
**Learning:** Relying solely on Tailwind utility classes (like `text-cyan-400`) for dynamically toggled states can be unreliable if the build pipeline or CDN integration is opaque.
**Action:** For critical active states, define a semantic class (e.g., `.active-nav`) in the custom CSS. This ensures consistent styling and specificity, and allows for easier maintenance (e.g., adding `text-shadow` or `aria-current` toggling).
