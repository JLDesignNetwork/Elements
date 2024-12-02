# <ins>JLDN : Elements</ins>

JLDN : Elements is a plugin package for rendering and styling customized elements. This package consists of CSS and jquery. The jquery script reads the content of your html file, looking for specific class attributes in your HTML tags.  It then re-writes the source code to render stylish elements using package provided CSS style rules.

## Buttons

### Description

Button styling with ease. This package offers pre-configured options to change the style of your buttons, with endless possibilities. 

> [!NOTE]
> Buttons can be created using a div tag or a button tag. 

> [!IMPORTANT]
> Buttons must contain a `class="button"` attribute.

### Options

1. Shape: round | square (Default: square)
1. Style: flat | 3d. (Default: flat)
1. Width: px | % | em | rem | vw (Default: 100%)
1. Height: px | % | em | rem | vh (Default: 50px)
1. Fill Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red to green gradient)
1. Theme: See [theme list](#themes). (Default: none)

### Examples

1. Default: `<div id="b1" class="button" data-options:'{}'></div>` | `<button id="b2" class="button" data-options:'{}'></button>`

---

## Meters 

### Description  

Custom alternative to the standard HTML meter and progress bar. These meters offer pre-configured options that allow for endless customization. When creating a new meter, use a div tag and include `class="meter"` in the tag. 

> [!IMPORTANT]
> Meters can only be created with a div tag and must contain a `class="meter"` attribute.

### Options  

1. Shape: round | square (Default: square)
1. Style: flat | 3d. (Default: flat)
1. Width: px | % | em | rem | vw (Default: 100%)
1. Height: px | % | em | rem | vh (Default: 50px)
1. Fill Size: 0%...`100% (Default: 100%)
1. Fill Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red to green gradient)
1. Reveal Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red)
1. Animation Speed: slow | normal | fast (Default: null)
1. Candystripe Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: transparent)
1. Theme: See [theme list](#themes). (Default: null)

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

### Built-in Themes

1. Christmas
1. Halloween
1. Easter
1. 4th of July
