## 2025-02-18 - DOM Query Caching in Event Listeners
**Learning:** Found a `mousemove` event listener that was querying the DOM (`querySelectorAll`) on every execution (throttled to 30ms). This creates unnecessary overhead on the main thread during animations.
**Action:** Always cache DOM elements outside of high-frequency event listeners (mousemove, scroll, resize) to prevent repeated DOM traversals.

## 2025-02-18 - Hardware Acceleration for Custom Cursors
**Learning:** Animating `top` and `left` properties for a custom cursor triggers Layout and Paint on every frame, causing high main-thread CPU usage.
**Action:** Use `transform: translate3d(x, y, 0)` for position updates. This isolates the change to the Composite step, reducing main-thread work and leveraging the GPU.
