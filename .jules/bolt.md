## 2025-02-18 - DOM Query Caching in Event Listeners
**Learning:** Found a `mousemove` event listener that was querying the DOM (`querySelectorAll`) on every execution (throttled to 30ms). This creates unnecessary overhead on the main thread during animations.
**Action:** Always cache DOM elements outside of high-frequency event listeners (mousemove, scroll, resize) to prevent repeated DOM traversals.

## 2026-01-18 - Duplicate Initialization Code
**Learning:** Discovered a complete duplication of the `DOMContentLoaded` logic in `script.js`, leading to double event listeners and redundant intersection observers. This significantly increased main thread work.
**Action:** Audit legacy files for copy-paste duplication, especially in long monolithic scripts.

## 2026-01-18 - Early Return in Shared Scope
**Learning:** An early `return` statement for a specific feature (custom cursor) inside a shared `DOMContentLoaded` listener halted the execution of all subsequent independent features.
**Action:** Encapsulate optional feature logic in conditional blocks (`if (element) { ... }`) rather than using `return` in a shared scope.
