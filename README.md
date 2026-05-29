# JLDN : Elements

[![CDN](https://img.shields.io/badge/CDN-jsDelivr-ff69b4.svg?style=flat-square)](https://www.jsdelivr.com/)
[![Version](https://img.shields.io/badge/Version-1.0.19-blue.svg?style=flat-square)](https://github.com/JLDesignNetwork/Elements/releases)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**JLDN : Elements** is a premium, lightweight client-side UI component engine powered by jQuery and SASS. It scans your markup at runtime, translating simple HTML elements into rich, animated components. 

The library features a sophisticated **multi-layer rendering architecture** that supports both flat modern styling and advanced 3D convex extrusion aesthetics with dynamic light-source casting.

🔗 **[Live Component Showcase & Interactive Playground](https://jldesignnetwork.github.io/Elements/)**

---

## Key Features

* 💎 **Premium 3D Aesthetics**: True 3D extrusion shadows that dynamically calculate direction relative to the screen center, accompanied by top-edge specular highlighting.
* 🎨 **28 Built-In Themes**: Holiday, seasonal, cinematic, and sports presets with distinct color palettes and custom-designed matching candy-stripes.
* 📦 **Modular Construction**: Load only the modules you need (core engine + individual button, meter, alert, code container, or popup handlers).
* ⚙️ **Dynamic Update API**: Update themes, progress dimensions, or display options programmatically after render via JavaScript.
* ♿ **Accessibility Ready**: Automated injection of ARIA attributes (`role="progressbar"`, `aria-valuenow`, `role="button"`, `tabindex`), keyboard navigation handlers, and high-legibility text contrast helpers.

---

## Component Reference

JLDN Elements are initialized automatically based on CSS classes. Configure individual component behavior using the `data-options` JSON attribute.

### 1. Buttons (`.jldn-button`)
Provides smooth button styling on top of standard `<button>` tags or custom interactive `<div>` structures (keyboard navigation for space/enter is automatically injected).

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `style` | `string` | `"flat"` | Layout style: `"flat"` or `"3d"`. |
| `shape` | `string` | `"square"` | Edge layout shape: `"square"` or `"round"`. |
| `width` | `string` | `auto` | Custom CSS width (e.g., `"200px"`, `"50%"`). |
| `height` | `string` | `"50px"` | Custom CSS height (e.g., `"60px"`). |
| `fill-size` | `string` | `"100%"` | Fill progress indicator length (e.g. `"75%"`). |
| `fill-color` | `string` | *rainbow* | Custom fill solid color or gradient. |
| `candystripe-color` | `string` | `none` | Subtle stripe background layer color. |
| `animation-speed` | `string` | `none` | Animated fill speed: `"slow"`, `"normal"`, or `"fast"`. |
| `theme` | `string` | `none` | Pre-configured theme choice (case-sensitive). |

---

### 2. Meters (`.jldn-meter`)
An replacement for the standard HTML progress bar, featuring fluid status transitions, animation speeds, and reveal tracks.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `style` | `string` | `"flat"` | Layout style: `"flat"` or `"3d"`. |
| `shape` | `string` | `"square"` | Edge layout shape: `"square"` or `"round"`. |
| `width` | `string` | `"100%"` | Custom CSS width presets (e.g. `"long"`, `"medium"`, `"short"`). |
| `height` | `string` | `"50px"` | Custom CSS height presets (e.g. `"thick"`, `"thin"`). |
| `fill-size` | `string` | `"100%"` | Progress percentage length (e.g. `"50%"`). |
| `fill-color` | `string` | *rainbow* | Solid color or gradient background of progress bar. |
| `reveal-color` | `string` | `#1e293b` | Unfilled track background color. |
| `candystripe-color` | `string` | `none` | alternating stripe background color. |
| `animation-speed` | `string` | `none` | Animated progress speed: `"slow"`, `"normal"`, or `"fast"`. |
| `theme` | `string` | `none` | Pre-configured theme choice (case-sensitive). |

---

### 3. Code Snippet Containers (`.jldn-code`)
Elegant code display containers with automated line numbering, a copy-to-clipboard action button, and alternate line highlights.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `style` | `string` | `"flat"` | Layout style: `"flat"` or `"3d"`. |
| `shape` | `string` | `"rounded"` | Layout shape: `"rounded"` or `"square"`. |
| `border-width` | `string` | `"2px"` | Border boundary thickness. |
| `base-color` | `string` | `#384252` | Border background color/gradient frame. |
| `font-size` | `string` | `"1rem"` | Font size configuration. |
| `candystripe-color` | `string` | `none` | Background stripe highlight color. |
| `theme` | `string` | `none` | Pre-configured theme choice (case-sensitive). |

> [!NOTE]
> Even line rows automatically display a subtle background tint using a `7%` opacity alpha channel of the active theme's brand color (falling back to brand sky blue if no theme is specified).

---

### 4. Alert Notifications (`.jldn-alert`)
Notification banners supporting custom message types, dismissible controls, and responsive styling.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `"info"` | Message severity level: `"info"`, `"success"`, `"warning"`, or `"error"`. |
| `style` | `string` | `"flat"` | Layout style: `"flat"` or `"3d"`. |
| `shape` | `string` | `"rounded"` | Edge shape: `"rounded"` or `"square"`. |
| `dismissible` | `boolean` | `true` | Show/hide the close dismiss button tag. |
| `border-width` | `string` | `"4px"` | Left accent-border thickness. |
| `theme` | `string` | `none` | Pre-configured theme choice (case-sensitive). |

---

### 5. Modals & Popups (`.jldn-popup`)
Interactive popup overlays that stack above a high-blur backdrop overlay. They bind automatically to their trigger buttons.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `trigger` | `string` | *required* | The ID of the HTML button/element that launches the modal. |
| `style` | `string` | `"flat"` | Layout style: `"flat"` or `"3d"`. |
| `shape` | `string` | `"rounded"` | Edge shape: `"rounded"` or `"square"`. |
| `border-width` | `string` | `"3px"` | Spacing acting as the outer frame border. |
| `theme` | `string` | `none` | Pre-configured theme choice (case-sensitive). |

---

## Installation & Setup

There are two ways to load JLDN Elements into your web application:

### Option A: CDN Install (Recommended)
Make sure jQuery is loaded first. You can load all modules, styling, and initialization automatically using the **Single-Link Loader**, or load files individually.

#### 1. Single-Link Loader (Easiest)
Specify the modules you need in the `modules` query parameter. Styling (`style.css`) and initialization (`script.js`) are handled automatically relative to the core path:
```html
<!-- Place near the bottom of your <body> -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/gh/JLDesignNetwork/Elements@1.0.19/src/modules/core.js?modules=button,meter,code,alert,popup"></script>
```

#### 2. Manual Multi-Link
```html
<!-- Place inside <head> -->
<link href="https://cdn.jsdelivr.net/gh/JLDesignNetwork/Elements@1.0.19/src/style.css" rel="stylesheet">

<!-- Place near the bottom of your <body> -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/gh/JLDesignNetwork/Elements@1.0.19/src/modules/core.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/JLDesignNetwork/Elements@1.0.19/src/modules/button.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/JLDesignNetwork/Elements@1.0.19/src/modules/meter.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/JLDesignNetwork/Elements@1.0.19/src/modules/code.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/JLDesignNetwork/Elements@1.0.19/src/modules/alert.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/JLDesignNetwork/Elements@1.0.19/src/modules/popup.js"></script>
<script defer src="https://cdn.jsdelivr.net/gh/JLDesignNetwork/Elements@1.0.19/src/script.js"></script>
```

### Option B: Local Installation

#### 1. Single-Link Loader
```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script defer src="src/modules/core.js?modules=button,meter,code,alert,popup"></script>
```

#### 2. Manual Multi-Link
```html
<link href="src/style.css" rel="stylesheet">

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script defer src="src/modules/core.js"></script>
<script defer src="src/modules/button.js"></script>
<script defer src="src/modules/meter.js"></script>
<script defer src="src/modules/code.js"></script>
<script defer src="src/modules/alert.js"></script>
<script defer src="src/modules/popup.js"></script>
<script defer src="src/script.js"></script>
```

---

## Pre-configured Shorthand CSS Classes

Instead of writing verbose `data-options` attributes (like `data-options='{"theme":"Cyberpunk", "style":"3d"}'`), you can use shorthand class names directly. The structure is:
`jldn-[component]-[themeName]` or `jldn-[component]-[themeName]-3d`.

Themes names are parsed case-insensitively, ignoring hyphens/spaces.

### Shorthand Examples:
* **Buttons**: `<button class="jldn-button-cyberpunk-3d">`
* **Meters**: `<div class="jldn-meter-matrix" data-options='{"fill-size":"80%"}'>`
* **Alerts**: `<div class="jldn-alert-thanksgiving">`
* **Code Snippets**: `<code class="jldn-code-christmas-3d">`
* **Popups**: `<div class="jldn-popup-starwars-3d" data-options='{"trigger":"btn-id"}'>`

---

## Theme Configuration Directory

Pass the exact case-sensitive **Theme Name** inside the `theme` field of your component options:

| Category | Themes |
| :--- | :--- |
| **Holidays** | `Christmas`, `Halloween`, `Easter`, `4th of July`, `St. Patrick`, `Valentine`, `Thanksgiving`, `New Year` |
| **Seasons** | `Spring`, `Summer`, `Autumn`, `Winter` |
| **Movies & Pop Culture** | `Star Wars`, `Matrix`, `LOTR`, `Star Trek`, `Barbie`, `Cyberpunk` |
| **College Sports** | `Michigan`, `Alabama`, `Texas`, `UNC`, `LSU` |
| **Professional Sports** | `Celtics`, `Seahawks`, `SF49ers`, `Miami Vice`, `Cowboys` |

---

## Theme Component Usage Examples

Configure components by providing custom JSON strings inside their `data-options` attribute.

### 1. Buttons
```html
<!-- Using standard button tag -->
<button id="btn-demo" class="jldn-button" data-options='{"style":"3d", "theme":"Cyberpunk"}'>
  Click Action
</button>

<!-- Using div tag -->
<div id="btn-div-demo" class="jldn-button" data-options='{"shape":"round", "fill-color":"#ec4899"}'>
  Click Action
</div>
```

### 2. Meters
```html
<div id="meter-demo" class="jldn-meter" data-options='{"fill-size":"65%", "theme":"St. Patrick", "animation-speed":"normal"}'>
  Loading files...
</div>
```

### 3. Code snippet Containers
```html
<code id="code-demo" class="jldn-code" data-options='{"theme":"Matrix", "border-width":"3px"}'>
const greeting = "Hello, World!";
console.log(greeting);
</code>
```

### 4. Alert Banners
```html
<div id="alert-demo" class="jldn-alert" data-options='{"type":"success", "border-width":"4px"}'>
  The process finished successfully!
</div>
```

### 5. Modals & Popups
```html
<!-- Trigger element -->
<button id="popup-trigger" class="jldn-button" data-options='{}'>Launch Popup</button>

<!-- Modal Container -->
<div id="popup-demo" class="jldn-popup" data-options='{"trigger":"popup-trigger", "theme":"Star Wars", "style":"3d"}'>
  <h3>System Dialog</h3>
  <p>This is a custom alert modal on a blurred backdrop.</p>
</div>
```

---

## Dynamic JavaScript API

Elements can be manipulated programmatically after initial render using the public `updateElement` API:

```javascript
// 1. Initialize the Elements engine
const JLDN = new JLDN_Elements();

// 2. Select your JQuery element wrapper
const $myMeter = $('#mtr-interactive');

// 3. Update the component's properties dynamically
JLDN.updateElement($myMeter, {
  "fill-size": "95%",
  "theme": "St. Patrick"
});
```

*Note: The update call validates inputs and enforces allowed options whitelists per component class to protect page styling stability.*

### Programmatic Element Creation

You can initialize plain HTML elements into components programmatically:

```javascript
// 1. Initialize elements programmatically using helpers
window.JLDN.createButton($('#my-btn'), { theme: 'Cyberpunk', style: '3d' });
window.JLDN.createMeter($('#my-meter'), { theme: 'Matrix', 'fill-size': '50%' });
window.JLDN.createAlert($('#my-alert'), { theme: 'Valentine', type: 'success' });
window.JLDN.createCode($('#my-code'), { theme: 'Halloween' });
window.JLDN.createPopup($('#my-popup'), { trigger: 'my-btn', theme: 'Celtics' });
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Todo

- [ ] Add images of element examples
- [x] Code JavaScript (jQuery)
- [x] Code CSS (SASS)
- [x] Create additional themes (28 built-in themes)
- [x] Implement option validation / whitelist enforcement
- [x] Add dynamic element update API
- [x] Add license information
- [ ] Add meta information
- [x] Setup GitHub IO page
- [x] Make repository public
- [x] Create pre-configured element shorthand helpers
