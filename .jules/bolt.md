## 2025-02-18 - DOM Query Caching in Event Listeners
**Learning:** Found a `mousemove` event listener that was querying the DOM (`querySelectorAll`) on every execution (throttled to 30ms). This creates unnecessary overhead on the main thread during animations.
**Action:** Always cache DOM elements outside of high-frequency event listeners (mousemove, scroll, resize) to prevent repeated DOM traversals.

## 2025-10-24 - Layout Thrashing in Parallax Effects
**Learning:** The parallax effect on `.glass-card` was calling `getBoundingClientRect()` on every `mousemove` event. This caused forced synchronous layouts (thrashing) because the same handler was also modifying `transform` styles.
**Action:** Cache element dimensions (converting to document-relative coordinates using `pageX` and `scrollX`) on `mouseenter` to avoid reading layout properties during the animation loop.
