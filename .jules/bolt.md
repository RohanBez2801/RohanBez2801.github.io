## 2025-02-18 - DOM Query Caching in Event Listeners
**Learning:** Found a `mousemove` event listener that was querying the DOM (`querySelectorAll`) on every execution (throttled to 30ms). This creates unnecessary overhead on the main thread during animations.
**Action:** Always cache DOM elements outside of high-frequency event listeners (mousemove, scroll, resize) to prevent repeated DOM traversals.

## 2025-02-18 - Layout Thrashing in Parallax Effects
**Learning:** The glass card parallax effect called `getBoundingClientRect()` inside every `mousemove` event. This forces the browser to recalculate layout (reflow) on every frame of the mouse movement, which is a major performance bottleneck.
**Action:** Cache the element's dimensions and position on `mouseenter` (or outside the loop if static), and use these cached values in the `mousemove` handler. Use `e.pageX` relative to document position to handle scrolling correctly.
