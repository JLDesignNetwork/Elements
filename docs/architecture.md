# JLDN Elements — Component Architecture

> **Document:** `docs/architecture.md`  
> **Author:** Jeff Langdon (JL Design Network)  
> **Generation:** `2412`  

---

## 1. Modular Architecture Overview

JLDN Elements operates on a decoupled module structure located in `src/modules/`:

1. **`core.js` (Unified Module Loader):**
   - Parses script query parameters (e.g. `src/modules/core.js?modules=button,meter,code`).
   - Automatically injects `src/style.css` into document `<head>`.
   - Dynamically loads and instantiates requested component modules in parallel.
   - Attaches global helpers to `window.JLDN`.

2. **`button.js` (Multi-Layer Interactive Buttons):**
   - Hover and active gradient transitions with 3D bevel sheens.
   - Supports `data-style="3d"` and `data-candystripe="true"`.

3. **`meter.js` (Progress Meters):**
   - Percentage reveal layers with smooth gradient filling animations.

4. **`code.js` (Code Snippets):**
   - Pre-formatted code blocks with zebra row striping and one-click clipboard copying.

5. **`alert.js` & `popup.js` (Notifications & Dialogs):**
   - Dismissible alerts and accessible dialog popups with backdrop filters.

---

## 2. 28-Theme SASS Architecture (`src/themes.sass`)

Themes define rich color matrices encompassing base gradients, reveal colors, candy-stripes, and text shadows:
- **Cyberpunk / Neon:** `cyberpunk-3d`, `synthwave`, `matrix`, `neon-violet`
- **Classic Gradients:** `royal-purple`, `deep-cyan`, `emerald-gold`, `sunset-amber`
- **Dark Mode Solids:** `obsidian`, `charcoal-slate`, `midnight-blue`
