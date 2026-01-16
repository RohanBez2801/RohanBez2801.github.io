## 2025-02-18 - DOM Query Caching in Event Listeners
**Learning:** Found a `mousemove` event listener that was querying the DOM (`querySelectorAll`) on every execution (throttled to 30ms). This creates unnecessary overhead on the main thread during animations.
**Action:** Always cache DOM elements outside of high-frequency event listeners (mousemove, scroll, resize) to prevent repeated DOM traversals.

## 2025-02-18 - Code Duplication in Event Listeners
**Learning:** Discovered a case where `DOMContentLoaded` listeners were duplicated in the same file, causing double execution of initialization logic and double event binding. This effectively doubled the CPU cost of the main thread during startup and interaction.
**Action:** Always scan the entire file for duplicated logic blocks, especially when merging code or refactoring. Use tools or manual review to ensure initialization code runs only once.
