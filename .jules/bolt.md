## 2025-02-18 - DOM Query Caching in Event Listeners
**Learning:** Found a `mousemove` event listener that was querying the DOM (`querySelectorAll`) on every execution (throttled to 30ms). This creates unnecessary overhead on the main thread during animations.
**Action:** Always cache DOM elements outside of high-frequency event listeners (mousemove, scroll, resize) to prevent repeated DOM traversals.

## 2025-02-18 - Transform vs Top/Left for Animations
**Learning:** The custom cursor was using `top` and `left` properties for animation, which triggers layout (reflow) on every frame.
**Action:** Use `transform: translate3d()` for animations to trigger only the compositor, and remember to set `top: 0; left: 0` in CSS to establish the coordinate system. Also, handle scale in the JS loop if it conflicts with the transform property.
