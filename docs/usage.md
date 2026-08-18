# JLDN Elements — Usage & Integration Guide

> **Document:** `docs/usage.md`  
> **Author:** Jeff Langdon (JL Design Network)  

---

## 1. Quick Start with Single-Link Loader

Load styles and selected modules in a single `<script>` tag:

```html
<!-- Load only Button and Meter modules -->
<script src="src/modules/core.js?modules=button,meter"></script>

<!-- Or load all 5 modules -->
<script src="src/modules/core.js?modules=all"></script>
```

---

## 2. Shorthand Class Syntax

You can write components using intuitive class shorthands without `data-options`:

```html
<!-- Cyberpunk 3D Button -->
<button class="jldn-button-cyberpunk-3d">Click Me</button>

<!-- Matrix Meter at 75% -->
<div class="jldn-meter-matrix" data-value="75"></div>

<!-- Royal Purple Alert -->
<div class="jldn-alert-royal-purple">
  Operation completed successfully!
</div>
```

---

## 3. Programmatic JavaScript API (`window.JLDN`)

```javascript
// Create dynamic button
const btn = window.JLDN.createButton({
  text: "Submit Order",
  theme: "emerald-gold",
  style: "3d",
  onClick: () => console.log("Clicked!")
});
document.body.appendChild(btn);

// Create dynamic meter
const meter = window.JLDN.createMeter({
  value: 80,
  max: 100,
  theme: "sunset-amber"
});
document.body.appendChild(meter);
```
