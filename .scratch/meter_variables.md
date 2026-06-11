# `<jl-meter>` Variables & Configuration

Here is the exhaustive list of all editable variables and configurations for the `<jl-meter>` component, along with their current fallback defaults. 

## CSS Variables (Global & Local Overrides)
These CSS variables control the visual aesthetics. They can be set globally (in `:root` or a theme block) or overridden directly on the `<jl-meter>` element inline.

| Variable Name | Default Value in Component | Description |
|---|---|---|
| `--meter-height` | `30px` | The height of the meter track. |
| `--meter-border-width` | `var(--border-width, 1px)` | The thickness of the meter's border. |
| `--border-color` | `#000` | The color of the outer border. |
| `--surface-base` | `#555` | The background color of the empty meter track. |
| `--surface-fill` | `#3498db` | The background color of the filled progress bar. |
| `--surface-text` | `#fff` | The color of the text displayed inside the meter. |
| `--surface-radius` | `0px` | The border-radius applied to the meter's outer edge. |
| `--surface-shadow` | `none` | The box-shadow applied to the meter. |
| `--overlay-stripe-color` | *(None)* | The color of the candy stripes. (Typically defined in `themes.sass` as `rgba(255, 255, 255, 0.2)`). |
| `--transition-speed` | `2s` | The duration for the candy-stripe animation cycle. |
| `--overlay-convex-opacity` | `0` | The opacity of the 3D glossy overlay (0 means flat/invisible). |

## HTML Attributes
These attributes control the state, data, and behavioral variants of the component.

| Attribute | Default Value | Available Options | Description |
|---|---|---|---|
| `value` | `0` | `0` to `max` | The current progress value. |
| `max` | `100` | Any positive number | The maximum value representing 100%. |
| `theme` | `primary` | `primary`, `secondary`, `alert`, `warning`, `dark`, `rainbow` | Applies predefined CSS variables from `themes.sass`. |
| `variant` | `flat` | `flat`, `rounded`, `3d`, `soft` | Applies structural variations via CSS. |
| `stripes` | `none` | `none`, `fill` (or `true`), `border` | Determines where the candy-stripes are rendered. |
| `animated` | `false` | `true`, `false` | Enables the continuous movement of the candy-stripes. |
| `size` | *(Empty)* | `sm`, `lg` | Automatically overrides `--meter-height` to `15px` or `45px`. |
