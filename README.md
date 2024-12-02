<style>
  :root {
    --heading-color: #454545;
    --my-red: rgba(189,0,1,0.5);
    --my-shadow: 0 0.25px 0 #333, 0 1px 1px rgb(40,40,40), 0 2px 2px rgb(35,35,35), 0 3px 3px rgb(20,20,20);
  }

  body {
    background: #232323 !important;
    font: 1em/110% "Consolas", serif !important;
    color: #676767 !important;
  }
  h1,h2,
  h3,h4,
  h5,h6 {
    color:var(--heading-color) !important;
  }
  ol > li,
  ul > li {
    font-size: 80%;
  }
  ol > li {
    list-style-type: upper-roman;
  }
  ul > li {
    list-style-type: none;
  }
  hr {
    border: 1px solid var(--my-red) !important;
    background: var(--my-red) !important;
    height: 1px !important;
    box-shadow: var(--my-shadow);
  }
  mark {
    background-color: transparent;
    color: var(--my-red);
  }
  code,
  pre {
    background-color: #222 !important;
    border: 1px solid var(--my-red) !important;
    color: #ddd !important;
    box-shadow: var(--my-shadow) !important;
  }
  pre code { 
    background-color: transparent !important;
    border: unset !important;
    color: unset !important;
    box-shadow: unset !important;
  }

  /* Id's */
  #topic,
  #toc,
  #toc span,
  #button,
  #code, 
  #meter,
  #extra {
    text-decoration: underline var(--my-red);
    font-variant: small-caps;
    font-size: 150%;
    text-align: center;
  }
  #topic {
    font-size: 300%;
  }
  #toc span {
    display: inline-block;
  }
  #toc span::first-letter,
  #button::first-letter,
  #code::first-letter, 
  #meter::first-letter,
  #extra::first-letter {
    color: var(--my-red);
  }

  /* Classes */
  .text-shadow {
    text-shadow: 0 0.25px 0 #333, 0 1px 1px rgb(40,40,40), 0 2px 2px rgb(35,35,35), 0 3px 3px rgb(20,20,20);
  }
  .sub-heading {
    font-style: italic;
    font-size: 100%
  }
</style>

# JLDN : ==Elements== {#topic .text-shadow}

Short introduction.

---

## <span>Table</span> <span>of</span> <span>Contents</span> {#toc .text-shadow}

[TOC]

---

## Buttons {#button .text-shadow}

### Description  {.sub-heading .text-shadow}

Short description.

### Options  {.sub-heading .text-shadow}

1. Shape: round | square (Default: square)
2. Style: flat | 3d. (Default: flat)
3. Width: px | % | em | rem | vw (Default: 100%)
4. Height: px | % | em | rem | vh (Default: 50px)
5. Fill Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red to green gradient)
6. Theme: See [theme list](#themes). (Default: none)

### Examples  {.sub-heading .text-shadow}

---

## Code {#code .text-shadow}

### Description  {.sub-heading .text-shadow}

Short description.

### Options  {.sub-heading .text-shadow}

1. Shape: round | square (Default: square)
2. Style: flat | 3d. (Default: flat)
3. Width: px | % | em | rem | vw (Default: 100%)
4. Height: px | % | em | rem | vh (Default: 50px)
5. Fill Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red to green gradient)
6. Theme: See [theme list](#themes). (Default: none)

### Examples  {.sub-heading .text-shadow}

---

## Meters {#meter .text-shadow}

### Description  {.sub-heading .text-shadow}

Short description.

### Options  {.sub-heading .text-shadow}

1. Shape: round | square (Default: square)
2. Style: flat | 3d. (Default: flat)
3. Width: px | % | em | rem | vw (Default: 100%)
4. Height: px | % | em | rem | vh (Default: 50px)
5. Fill Size: 0%...`100% (Default: 100%)
6. Fill Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red to green gradient)
7. Reveal Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: red)
8. Animation Speed: slow | normal | fast (Default: null)
9. Candystripe Color: color word | hsl | hex | rgb(a) | transparent | gradient (Default: transparent)
10. Theme: See [theme list](#themes). (Default: null)

### Examples  {.sub-heading .text-shadow}

1. Default: `<div id="m1" data-options:'{}'></div>`

---

## Extras {#extra .text-shadow}

### Installation  {.sub-heading .text-shadow}

### Usage  {.sub-heading .text-shadow}

### Built-in Themes  {#themes .sub-heading .text-shadow}

1. Christmas
1. Halloween
1. Easter
1. 4th of July