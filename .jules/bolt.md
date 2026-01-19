## 2025-02-18 - DOM Query Caching in Event Listeners
**Learning:** Found a `mousemove` event listener that was querying the DOM (`querySelectorAll`) on every execution (throttled to 30ms). This creates unnecessary overhead on the main thread during animations.
**Action:** Always cache DOM elements outside of high-frequency event listeners (mousemove, scroll, resize) to prevent repeated DOM traversals.

## 2025-02-18 - Duplicate Initialization Blocks
**Learning:** The codebase contained two nearly identical `DOMContentLoaded` blocks. This caused event listeners to be attached twice (e.g., scroll, click) and led to inconsistent behavior where one block had a performance fix and the other had an accessibility fix.
**Action:** Ensure global initialization logic is centralized to prevent accidental code duplication and regressions.
