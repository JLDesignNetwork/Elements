# Changelog

## [1.0.20] - 2026-06-11
- Release v1.0.20
- feat(animation): add support for pausing and speed variations on candy-stripes
- Update: core.js
- readme update
- Implement pre-configured shorthand classes, programmatic creation APIs, and unified module loader (v1.0.19)
- Clean up README by removing unnecessary content
- fixed: merge corruption 0.18 modular architecture with 28 themes
- Refactor Elements to v1.0.18 modular architecture with 28 themes
- folder rename
- code refactoring

# Elements Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.19] - 2026-05-29

### Added
- **Unified Single-Link Script Loader** — Added a dynamic loader in `core.js` that checks for `?modules=...` in the script tag's query string. When used, it automatically injects `style.css` relative to `core.js`, dynamically loads the requested components (e.g. `button,meter,code,alert,popup`) in parallel, and loads the main initialization entry point `script.js` last.
- **Pre-configured Shorthand CSS Classes** — Components can now be written using class-based shorthand names directly (e.g. `<button class="jldn-button-cyberpunk-3d">` or `<div class="jldn-meter-matrix">`) without requiring data-options attributes. The engine matches theme names case-insensitively and extracts the style configuration.
- **Programmatic JS Creation APIs** — Exposed programmatic initialization helper methods on `window.JLDN` (`createButton`, `createMeter`, `createCode`, `createAlert`, `createPopup`) allowing components to be initialized or upgraded on the fly.
- **Shorthand Helpers Showcase** in `demo.html` and `index.html` — Added a new demo section demonstrating class-based shorthand styling and programmatic creation.

## [1.0.18] - 2026-05-29

### Added
- **Alternate row colors for Code Snippets** — Every other line is now styled using CSS `color-mix` to create a subtle 7% opacity background tint derived from the active theme's `candystripe-color` (falling back to brand sky blue `#38bdf8` if no theme is selected).

### Fixed
- **St. Patrick's Day theme revamp** — Redesigned the palette to be fully green (vibrant emerald to forest green gradients) and removed the gold/yellow and white stripe accents. Cleaned up trailing syntax errors in the SASS definition.
- **Code Snippet copy function** — Re-implemented the copy button click handler to extract and join code line text exclusively from `.jldn-code-txt` blocks, preventing line numbers and margins from being included in the clipboard copy text.
- **Code Snippet copy button click area** — Added `z-index: 10` to the `.jldn-code-copy` class to prevent the underlying pre-formatted code block (which had `z-index: 2`) from overlapping and blocking mouse hover and click events.

## [1.0.17] - 2026-05-29

### Fixed
- **`fill-color` silently dropped on buttons and meters** — `fill-color` was missing from the `allowedOptions` whitelist in `button.js` and `meter.js`, causing the option to be silently filtered out before reaching `applyCommonStyles`. As a result, elements like the "Solid Pink" button, "Cyan-Blue 3D" button, and all striped-button fill colors were falling back to the default rainbow gradient instead of the specified color. Added `fill-color` and `reveal-color` to `button.js`'s `allowedOptions`, and `fill-color` to `meter.js`'s `allowedOptions`.
- **Demo page element audit** — Reviewed all elements in `demo.html` to confirm inner text, labels, and `data-options` are internally consistent. The above `fill-color` bug was the root cause of all visual discrepancies found.

## [1.0.16] - 2026-05-29

### Fixed
- **Border gradient bleed** — Eliminated the 1px subpixel gradient seam visible between the base layer and the unfill layer on buttons and meters. `.jldn-unfill` now uses `calc(100% + 2px)` height and `-1px` offsets on all sides so it slightly overlaps the parent boundary and is cleanly clipped by `overflow: hidden`.
- **3D convex sheen on dark elements** — Code snippets, alerts, and popups now display a subtle, readable gloss overlay (`rgba(255,255,255,0.06)` peak) when `data-style="3d"` is set. The sheen sits at z-index 1, below text (z-index 2), so readability is unaffected.
- **Sass `@at-root` nesting** — Fixed incorrect compiled selectors for `::after` convex sheen pseudo-elements on `.jldn-code-snippet`, `.jldn-alert-content`, and `.jldn-popup-body` by switching from inner `&::after` nesting to explicit `@at-root` rules, producing correct flat selectors in the output CSS.
- **Text readability on 3D elements** — Applied `text-shadow: 0 1px 3px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)` to `.jldn-code-txt`, `.jldn-alert-text`, `.jldn-alert-icon`, `.jldn-alert-close`, `.jldn-popup-text`, and `.jldn-popup-close` to ensure legibility on any background.

## [1.0.15] - 2026-05-29

### Changed
- **3D element rendering** — Replaced physical CSS `border: 1px` on 3D-style buttons and meters with `inset 0 0 0 1px rgba(0,0,0,0.25)` box-shadow, preventing subpixel anti-aliasing gaps at element corners.
- **Convex highlight sheen** — Added `::before` pseudo-element with `inset 0 2px 0 rgba(255,255,255,0.25)` to 3D buttons and meters to simulate the top-edge specular highlight of a convex surface.
- Added convex glass sheen overlay (`::after` pseudo-element) to 3D code snippet containers, alert content areas, and popup body panels.
- **Text shadow strengthened** — Increased `.jldn-text` text-shadow to multi-layer `rgba(0,0,0,0.95)` values to prevent text bleeding into bright fill gradients.

### Fixed
- Elements without an explicit `style` option now correctly default to `flat`; the `applyCommonStyles` function always writes `data-style="flat"` when no style option is provided.
- Unrecognized options passed in `data-options` are now silently ignored rather than applied, enforced via per-component `allowedOptions` whitelists in `buildElement`.

## [1.0.14] - 2026-05-29

### Added
- **Theme Showcase section** in `demo.html` — displays every element type (button, meter, code, alert, popup) in both flat and 3D variants for a selected theme, updated live via the Dynamic Theme Playground controls.

### Fixed
- Demo element labels corrected; several 3D elements were mislabelled as "Flat" and vice versa.

## [1.0.13] - 2026-05-29

### Fixed
- Defaults enforced per element type in module files (`button.js`, `meter.js`, `code.js`, `alert.js`, `popup.js`) — all elements now default to `style: "flat"`, `shape: "square"` (buttons/meters) or `shape: "rounded"` (code/alert/popup).
- Elements no longer render as 3D unless `"style":"3d"` is explicitly passed in `data-options`.

## [1.0.12] - 2026-05-29

### Changed
- **Halloween theme** — Replaced hard-to-distinguish red/purple candy-stripe combination with high-contrast orange background (`#ea580c`) and black accent (`rgba(0,0,0,0.7)`) candy-stripes for clear visual separation.
- **All 28 themes revamped** — Candy-stripe colors and accent colors were redesigned with explicit consideration of the base background color, ensuring stripe bands are always visibly distinct from the element fill.
- **Boston Celtics theme** updated to accurate official team colors: `#007A33` (green), `#BA9765` (gold), `#963821` (red-brown), `#000000` (black).
- **St. Patrick's Day theme** differentiated from Celtics with distinct shamrock-green tones, gold shimmer accents, and a cream/white secondary color, eliminating visual overlap between the two green-dominant themes.
- Sports team themes sourced from verified hex codes at `teamcolorcodes.com`.

## [1.0.11] - 2026-05-29

### Changed
- **Stripe accent visibility** — Fixed stripe accent colors in `themes.sass` that were rendering invisibly. The `--jldn-stripe-accent` variable now uses fully opaque or high-opacity values that contrast clearly against the `--jldn-candystripe-color` background, making the alternating candy-stripe bands distinguishable.

## [1.0.0] - 2026-05-28

### Added
- Created 24 new high-fidelity themes spanning holidays, seasons, pop culture/movies, college sports, and pro sports (totaling 28 themes).
- Implemented new component types: `jldn-code` (line-numbered code containers), `jldn-alert` (dismissible/non-dismissible warning banners), and `jldn-popup` (3D modal overlays).
- Designed an interactive **Dynamic Theme Playground** at the bottom of the showcase page for live theme testing.
- Created dedicated showcases on the demo page for Buttons, Meters, Code, Alerts, and Popups/Modals.

### Fixed
- Resolved file truncation and duplicate syntax blocks in JS/HTML source modules.
- Recompiled and optimized the styling bundle (`src/style.css`).
