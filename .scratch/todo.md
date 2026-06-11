# TODO

## Playground

### Add

- [ ] Defined Sections (in no particular order; whatever makes sense)
    - [ ] Themes -> Dropdown Select -> Current + Major Holidays
    - [ ] Styles -> Dropdown Select -> Flat, 3D<sup>[1](#3d)</sup>, Glassmorphic<sup>[2](#glassmorphic)</sup>, Neumorphic<sup>[3](#neumorphic)</sup>, Cartoon<sup>[4](#cartoon)</sup>, Cyberpunk<sup>[5](#cyberpunk)</sup>, Professional<sup>[6](#professional)</sup>, etc
    - [ ] Stripe -> 
      - [ ] Dropdown Select -> Animate: Enable|Disable
      - [ ] Dropdown Select -> Stripe Pattern: Enable|Disable
      - [ ] Color Select -> Stripe Overlay Color 
    - [ ] Text -> 
      - [ ] String Input -> Text Size
      - [ ] Color Select -> Text Color
      - [ ] String Input -> Text Shadow
      - [ ] String Input -> Font Family
    - [ ] Size<sup>[7](#pre-built-sizes)</sup>
      - [ ] Slider -> Width
      - [ ] Slider -> Height
      - [ ] Checkbox -> Responsive Width
    - [ ] Borders<sup>[8](#borders)</sup>
      - [ ] Slider -> Border Width
      - [ ] Color Select -> Border Color
      - [ ] Slider -> Border Radius<sup>[9](#pre-built-border-radius)</sup>
- [ ] 

---

## Notes

### 3D

### Glassmorphic

### Neumorphic

### Cartoon

Cartoon style uses a thick border and a slight shadow around it. 

### Cyberpunk

Cyberpunk style is meant to be neon. Let's use the color blue as the primary color. I also think it's meant to have the candy stripe overlay. What else? It's also meant to have an outer shadow. Additionally, the element is meant to be skewed.

### Professional

### 'Pre-Built' Sizes

We need the following 'Pre-Built' sizes, that adjust both the width and height:

- xs
- sm
- default -> we use our default width and height here.
- lg
- xl

### Borders

When speaking of borders, we immediately think of the standard CSS defined borders. However, for 'code', 'alert', and 'modal' elements, borders are not defined using the standard CSS syntax. Instead, `border-width` is translated into a margin.

1. Code: we use `margin: [BORDER_WIDTH]`
2. Alert: we use `margin-left: [BORDER_WIDTH]`
3. Modal: we use `margin: [BORDER_WIDTH]`

Each of these elements are structured differently from 'button' and 'meter'. They will use the following structure:

```html
<div class="*-outer">
  <div class="stripe-layer"></div>
  <div class="*-inner">
    <!-- inner elements go here -->
  </div>
</div>
```

The margin will be applied to the `*-inner` so that it offsets by the border width, creating a feux border. the `stripe-layer` occupies the entire width and height of the `*-outer`.

### 'Pre-Built' Radius

We need the following 'Pre-Built' radius options:

**Values**:

- Square -> 0; this is default
- Rounded -> xs, sm, lg, xl
- Pill -> 50% (or whatever is best to create semi-circle ends)
- Circle -> When circle is chosen, we don't just adjust the `border-radius`, we also adjust the `width` and `height` to match. So if the user changes the width or height, the `border-radius` will also change.