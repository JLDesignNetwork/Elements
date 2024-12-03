# <ins>JLDN : Elements</ins>

JLDN : Elements is a plugin package for rendering and styling customized elements. This package consists of CSS and jquery. The jquery script reads the content of your html file, looking for specific class attributes in your HTML tags.  It then re-writes the source code to render stylish elements using package provided CSS style rules.

## Buttons

### Description

Button styling with ease. This package offers pre-configured options to change the style of your buttons, with endless possibilities. 

> [!NOTE]
> Buttons can be created using a div tag or a button tag. 

> [!IMPORTANT]
> Buttons must contain a `class="button"` attribute.

> [!WARNING]
> Each button must have its own unique identifier. Without this your buttons will not work as expected.

### Options

1. Shape: round | square (Default: square) `data-options='{"shape":"square"}'`
1. Style: flat | 3d. (Default: flat) `data-options='{"style":"3d"}'`
1. Width: px | % | em | rem | vw (Default: 100%) `data-options='{"width":"250px"}'`
1. Height: px | % | em | rem | vh (Default: 50px) `data-options='{"height":"50px"}'`
1. Fill Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red to green gradient) `data-options='{"fill-color":"linear-gradient(90deg, red, orange, yellow, lime, green)"}'`
1. Theme: See [theme list](#themes). (Default: none) `data-options='{"theme":"Christmas"}'`

### Examples

1. Default: `<div id="b1" class="button" data-options:'{}'></div>` | `<button id="b2" class="button" data-options:'{}'></button>`

---

## Meters 

### Description  

Custom alternative to the standard HTML meter and progress bar. These meters offer pre-configured options that allow for endless customization. When creating a new meter, use a div tag and include `class="meter"` in the tag. 

> [!IMPORTANT]
> Meters can only be created with a div tag and must contain a `class="meter"` attribute.

> [!WARNING]
> Each meter must have its own unique identifier. Without this your meters will not work as expected.

### Options

The following list of options are used to configure the meter. They are included in the `data-options` attribute.

1. Shape: round | square (Default: square) `data-options='{"shape":"square"}'`
1. Style: flat | 3d. (Default: flat) `data-options='{"style":"flat"}'`
1. Width: px | % | em | rem | vw (Default: 100%) `data-options='{"width":"100%"}'`
1. Height: px | % | em | rem | vh (Default: 50px) `data-options='{"height":"50px"}'`
1. Fill Size: 0%...`100% (Default: 100%) `data-options='{"fill-size":"100%"}'`
1. Fill Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red to green gradient)`data-options='{"fill-color":"linear-gradient(90deg, red, orange, yellow, lime, green)"}'`
1. Reveal Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red) `data-options='{"reveal-color":"red"}'`
1. Animation Speed: slow | normal | fast (Default: null) `data-options='{"animation-speed":"normal"}'`
1. Candystripe Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: transparent) `data-options='{"candystripe-color":"transparent"}'`
1. Theme: See [theme list](#themes). (Default: null) `data-options='{"theme":null}'`

### Examples  

1. Default: `<div id="m1" class="meter" data-options:'{}'></div>`

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
  <script defer type="text/javascript" src="src/script.js"></script>
  ```

### Usage 
After including this package into your document, simply include the elements that you want to use.

Button code example:
```html
<!-- button format 1 -->
<button id='b1' class='button' data-options='{}'>

<!-- button format 2 -->
<div id='b2' class='button' data-options='{}'>
```

Meter code example:
```html
<!-- meter format -->
<div id='m1' class='meter' data-options='{}'>
```

### Built-in Themes

1. Christmas
1. Halloween
1. Easter
1. 4th of July
