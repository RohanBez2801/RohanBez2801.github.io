## 2025-02-18 - DOM Query Caching in Event Listeners
**Learning:** Found a `mousemove` event listener that was querying the DOM (`querySelectorAll`) on every execution (throttled to 30ms). This creates unnecessary overhead on the main thread during animations.
**Action:** Always cache DOM elements outside of high-frequency event listeners (mousemove, scroll, resize) to prevent repeated DOM traversals.

## 2026-01-27 - Compositor-Only Cursor Animation
**Learning:** Animating `top`/`left` properties triggers Layout on every frame. Switching to `transform: translate3d` moves this to the Compositor thread. However, when JS drives the transform, CSS transitions/animations on `transform` (like scale on hover) conflict. Move the scale logic into the JS loop using manual interpolation (Lerp) to combine both into a single transform string.
**Action:** Use `transform` for all position animations and manage secondary transforms (scale/rotate) within the same JS loop.

## 2025-05-21 - Decoupling Input from Rendering
**Learning:** Using `Date.now()` inside `mousemove` handlers to throttle animations still executes logic on the main thread during high-frequency input events. Using `requestAnimationFrame` to decouple input storage from visual updates ensures smoother animations aligned with the display refresh rate and prevents layout thrashing by allowing safe reads of cached dimensions.
**Action:** Replace `Date.now()` throttles in mouse/scroll handlers with a `requestAnimationFrame` loop that reads from cached input coordinates.
