## 2025-02-18 - DOM Query Caching in Event Listeners
**Learning:** Found a `mousemove` event listener that was querying the DOM (`querySelectorAll`) on every execution (throttled to 30ms). This creates unnecessary overhead on the main thread during animations.
**Action:** Always cache DOM elements outside of high-frequency event listeners (mousemove, scroll, resize) to prevent repeated DOM traversals.

## 2026-01-27 - Compositor-Only Cursor Animation
**Learning:** Animating `top`/`left` properties triggers Layout on every frame. Switching to `transform: translate3d` moves this to the Compositor thread. However, when JS drives the transform, CSS transitions/animations on `transform` (like scale on hover) conflict. Move the scale logic into the JS loop using manual interpolation (Lerp) to combine both into a single transform string.
**Action:** Use `transform` for all position animations and manage secondary transforms (scale/rotate) within the same JS loop.

## 2026-02-19 - Layout Thrashing in Mouse Listeners
**Learning:** Accessing `window.innerWidth` and `window.innerHeight` inside a `mousemove` handler (even throttled) forces synchronous layout recalculations (reflows) if the DOM is dirty. This is a common performance bottleneck in animation loops.
**Action:** Cache window dimensions and media query results in variables and update them via `resize` and `change` listeners, rather than querying them in the animation loop.
