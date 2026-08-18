# Contributing to JLDN Elements

Thank you for contributing to **JLDN Elements**! Please review the guidelines below.

---

## 1. Component Invariants

1. **Modular Architecture:** All components must maintain decoupling and instantiate via `src/modules/core.js`.
2. **SASS Architecture:** Themes must be added/modified in `src/themes.sass` with both shorthand class and data-options support.
3. **Accessible Contrast:** Text and icons must meet WCAG AA compliant contrast.
4. **Generational Task Tracking:** All work items must be recorded in `.dev/2412/backlog.json`.
5. **GVS Versioning:** All release tags adhere strictly to GVS format (`[YYMM].[SUBVERSION].[REVISION]-[TAG]`).
