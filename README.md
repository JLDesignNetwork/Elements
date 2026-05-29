# <ins>JLDN : Elements</ins>

JLDN : Elements is a plugin package for rendering and styling customized elements. This package consists of CSS and jquery. The jquery script reads the content of your html file, looking for specific class attributes in your HTML tags.  It then re-writes the source code to render stylish elements using package provided CSS style rules.

## Buttons

### Description

Button styling with ease. This package offers pre-configured options to change the style of your buttons, with endless possibilities. 

> [!NOTE]
> Buttons can be created using a div tag or a button tag. 

> [!IMPORTANT]
> Buttons must contain a `class="jldn-button"` attribute.

> [!WARNING]
> Each button must have its own unique identifier. Without this your buttons will not work as expected.

### Options

1. Shape: `round` | `square` (Default: `square`) `data-options='{"shape":"round"}'`
2. Style: `flat` | `3d` (Default: `flat`) `data-options='{"style":"3d"}'`
3. Width: px | % | em | rem | vw (Default: auto) `data-options='{"width":"250px"}'`
4. Height: px | % | em | rem | vh (Default: 50px) `data-options='{"height":"60px"}'`
5. Fill Size: 0%…100% (Default: 100%) `data-options='{"fill-size":"75%"}'`
6. Fill Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red→green gradient) `data-options='{"fill-color":"linear-gradient(90deg, #6366f1, #8b5cf6)"}'`
7. Font Size: px | em | rem (Default: 1rem) `data-options='{"font-size":"0.85rem"}'`
8. Font Color: color word | hex | rgb(a) (Default: #ffffff) `data-options='{"font-color":"#000000"}'`
9. Candystripe Color: color word | hsl | hex | rgb(a) (Default: none) `data-options='{"candystripe-color":"rgba(0,0,0,0.2)"}'`
10. Animation Speed: `slow` | `normal` | `fast` | time in seconds (Default: none) `data-options='{"animation-speed":"normal"}'`
11. Theme: See [theme list](#built-in-themes). (Default: none) `data-options='{"theme":"Christmas"}'`

### Examples

1. Default: `<div id="b1" class="jldn-button" data-options='{}'></div>` | `<button id="b2" class="jldn-button" data-options='{}'></button>`

---

## Meters 

### Description  

Custom alternative to the standard HTML meter and progress bar. These meters offer pre-configured options that allow for endless customization. When creating a new meter, use a div tag and include `class="meter"` in the tag. 

> [!IMPORTANT]
> Meters can only be created with a div tag and must contain a `class="jldn-meter"` attribute.

> [!WARNING]
> Each meter must have its own unique identifier. Without this your meters will not work as expected.

### Options

The following list of options are used to configure the meter. They are included in the `data-options` attribute.

1. Shape: `round` | `square` (Default: `square`) `data-options='{"shape":"round"}'`
2. Style: `flat` | `3d` (Default: `flat`) `data-options='{"style":"3d"}'`
3. Width: px | % | em | rem | vw (Default: 100%) `data-options='{"width":"100%"}'`
4. Height: px | % | em | rem | vh (Default: 50px) `data-options='{"height":"30px"}'`
5. Fill Size: 0%…100% (Default: 100%) `data-options='{"fill-size":"75%"}'`
6. Fill Color: color word | hsl | hex | rgb(a) | gradient (Default: red→green gradient) `data-options='{"fill-color":"linear-gradient(90deg, #10b981, #3b82f6)"}'`
7. Reveal Color: color word | hsl | hex | rgb(a) (Default: dark slate) `data-options='{"reveal-color":"#1e293b"}'`
8. Base Color: color word | hex | rgb(a) | gradient (border background for 3D frame) `data-options='{"base-color":"#0f172a"}'`
9. Border Width: px | em | rem (Default: 2px) `data-options='{"border-width":"3px"}'`
10. Font Size: px | em | rem (Default: 1rem) `data-options='{"font-size":"0.85rem"}'`
11. Font Color: color word | hex | rgb(a) (Default: #ffffff) `data-options='{"font-color":"#000"}'`
12. Animation Speed: `slow` | `normal` | `fast` | time in seconds (Default: none) `data-options='{"animation-speed":"normal"}'`
13. Candystripe Color: color word | hsl | hex | rgb(a) (Default: none) `data-options='{"candystripe-color":"rgba(255,255,255,0.2)"}'`
14. Theme: See [theme list](#built-in-themes). (Default: none) `data-options='{"theme":"Halloween"}'`

### Examples  

1. Default: `<div id="m1" class="jldn-meter" data-options='{}'></div>`

---

## Code Snippet Containers

### Description

Elegant containers designed to display code snippet snippets with line numbering, a copy-to-clipboard action button, background stripes, and 3D extruded styling. They feature automatic alternate line row coloring dynamically tinted using your selected theme's brand color.

> [!IMPORTANT]
> Code blocks can be created using `<code>` or `<div>` tags and must contain a `class="jldn-code"` attribute.

### Options

1. Shape: `rounded` | `square` (Default: `rounded`) `data-options='{"shape":"square"}'`
2. Style: `flat` | `3d` (Default: `flat`) `data-options='{"style":"3d"}'`
3. Base Color (Border background): color word | hex | rgb(a) | gradient `data-options='{"base-color":"linear-gradient(135deg, #ec4899, #8b5cf6)"}'`
4. Border Width: px | em | rem (Default: 2px) `data-options='{"border-width":"4px"}'`
5. Candystripe Color: color word | hex | rgb(a) | transparent `data-options='{"candystripe-color":"rgba(255,255,255,0.2)"}'`
6. Theme: See [theme list](#built-in-themes). `data-options='{"theme":"Cyberpunk"}'`

### Examples

1. Default: `<code id="c1" class="jldn-code" data-options='{}'>const x = 10;</code>`

---

## Alert Notifications

### Description

Notification banners that support dismissal actions, custom side-borders, candystripes, and color configurations tailored by message types.

> [!IMPORTANT]
> Alerts must contain a `class="jldn-alert"` attribute.

### Options

1. Type: `success` | `error` | `warning` | `info` (Default: `info`) `data-options='{"type":"success"}'`
2. Shape: `rounded` | `square` (Default: `rounded`) `data-options='{"shape":"square"}'`
3. Style: `flat` | `3d` (Default: `flat`) `data-options='{"style":"3d"}'`
4. Dismissible: `true` | `false` (Default: `true`) `data-options='{"dismissible":false}'`
5. Border Width: px (sets left border thickness, Default: 4px) `data-options='{"border-width":"6px"}'`
6. Theme: See [theme list](#built-in-themes). `data-options='{"theme":"Christmas"}'`

### Examples

1. Flat Success Banner: `<div id="a1" class="jldn-alert" data-options='{"type":"success"}'>Success message!</div>`

---

## Popups & Modals

### Description

Fully interactive popup overlays that appear on top of a blur backdrop. They hook up to click trigger elements automatically.

> [!IMPORTANT]
> Popups must contain a `class="jldn-popup"` attribute and require a trigger element's ID.

### Options

1. Trigger: ID of the button/element that launches the modal. `data-options='{"trigger":"btn-id"}'`
2. Shape: `rounded` | `square` (Default: `rounded`) `data-options='{"shape":"square"}'`
3. Style: `flat` | `3d` (Default: `flat`) `data-options='{"style":"3d"}'`
4. Border Width: px (sets the surrounding frame border width) `data-options='{"border-width":"5px"}'`
5. Theme: See [theme list](#built-in-themes). `data-options='{"theme":"Star Wars"}'`

### Examples

1. Custom Popup: `<div id="p1" class="jldn-popup" data-options='{"trigger":"launch-btn", "theme":"Star Wars"}'>Modal Content</div>`

---

## Extras 

### Installation
1. Download the Elements package.
1. Extract the archive and copy the 'src' folder into your project directory.
1. Copy/paste the following into the &lt;head&gt; of your HTML document.
  ```html
  <!-- JLDN: Elements CSS -->
  <link href="src/style.css" rel="stylesheet">
  ```
4. Copy/paste the following into the &lt;body&gt; near the end of your HTML document.
  ```html 
  <!-- jQuery -->
  <script async src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

  <!-- JLDN: Elements JS -->
  <script defer src="src/modules/core.js"></script>
  <script defer src="src/modules/button.js"></script>
  <script defer src="src/modules/meter.js"></script>
  <script defer src="src/modules/code.js"></script>
  <script defer src="src/modules/alert.js"></script>
  <script defer src="src/modules/popup.js"></script>
  <script defer src="src/script.js"></script>
  ```

### Usage 
After including this package into your document, simply include the elements that you want to use.

Button code example:
```html
<!-- button format 1 -->
<button id='b1' class='jldn-button' data-options='{}'>

<!-- button format 2 -->
<div id='b2' class='jldn-button' data-options='{}'>
```

Meter code example:
```html
<!-- meter format -->
<div id='m1' class='jldn-meter' data-options='{}'>
```

### Built-in Themes

This package comes pre-packaged with 28 built-in presets representing holidays, seasonal changes, pop culture, and sports teams:

| Category | Themes |
|---|---|
| **Holidays** | Christmas, Halloween, Easter, 4th of July, St. Patrick's Day (`St. Patrick`), Valentine's Day (`Valentine`), Thanksgiving, New Year's Eve (`New Year`) |
| **Seasons** | Spring, Summer, Autumn, Winter |
| **Movies & Pop Culture** | Star Wars, The Matrix (`Matrix`), Lord of the Rings (`LOTR`), Star Trek, Barbie, Cyberpunk |
| **College Sports** | Michigan, Alabama, Texas, UNC, LSU |
| **Professional Sports** | Celtics, Seahawks, SF49ers, Miami Vice, Cowboys |

> [!NOTE]
> Theme names are case-sensitive. Pass the exact name shown above in parentheses where provided.

### Dynamic Update API

Elements can be updated programmatically after page load using the `updateElement` method:

```js
const elements = new JLDN_Elements();
const $el = $('#my-meter');

elements.updateElement($el, {
  "fill-size": "80%",
  "theme": "Cyberpunk"
});
```

Only options in the component's `allowedOptions` list will be applied. Unrecognized keys are silently ignored.

### Todo

- [ ] Add images of element examples
- [x] Code JavaScript (jQuery)
- [x] Code CSS (SASS)
- [x] Create additional themes (28 built-in themes)
- [x] Implement option validation / whitelist enforcement
- [x] Add dynamic element update API
- [ ] Add license information
- [ ] Add meta information
- [ ] Setup GitHub IO page
- [ ] Make repository public
- [ ] Create pre-configured element shorthand helpers