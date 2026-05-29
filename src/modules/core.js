const OPTION_MAP = {
  "meter-color": "--jldn-bg-color",
  "bar-color": "--jldn-bar-color",
  "meter-shadow": "--jldn-shadow",
  "fill-color": "--jldn-fill-color",
  "candystripe-color": "--jldn-candystripe-color",
  "font-size": "--jldn-font-size",
  "font-color": "--jldn-font-color",
  "shape": "--jldn-shape",
  "style": "--jldn-style",
  "base-color": "--jldn-base-color",
  "border-width": "--jldn-border-width",
  "reveal-color": "--jldn-reveal-color"
};

class Elements {
  constructor() {
    this.registry = Elements.registry;
  }

  /**
   * Escapes special characters in HTML to prevent XSS attacks.
   *
   * @param {string} html - The HTML string to be escaped.
   * @returns {string} The escaped HTML string with special characters replaced by their corresponding HTML entities.
   */
  escapeHTML(html) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return html.replace(/[&<>"']/g, (m) => {
      return map[m];
    });
  }

  /**
   * Formats string/keyword sizes to numeric percentages for ARIA values
   */
  parseAriaValue(val) {
    if (!val) return 100
    const lengthArr = ["super-long", "x-long", "long", "medium", "short", "x-short", "super-short"]
    const lengthSizes = [95, 80, 65, 50, 35, 20, 5]
    const idx = lengthArr.indexOf(val)
    if (idx !== -1) return lengthSizes[idx]

    const numeric = parseInt(val, 10)
    return isNaN(numeric) ? 100 : numeric
  }

  /**
   * Fetches specific elements from the document.
   */
  fetchElements() {
    const selectors = this.registry.map(c => c.selector).join(', ');
    return selectors ? $(document).find(selectors) : $();
  }

  buildElement($el, el_options) {
    const options = (el_options && typeof el_options === "object" && !Array.isArray(el_options)) ? el_options : {}

    // Remove data-options attribute to keep DOM clean
    $el.removeAttr("data-options")

    // Find matching registered component
    for (const component of this.registry) {
      if ($el.is(component.selector)) {
        // Filter unrecognized/untracked options
        const filteredOptions = {};
        const allowed = component.allowedOptions || [];
        $.each(options, (key, val) => {
          if (allowed.includes(key)) {
            filteredOptions[key] = val;
          }
        });

        // Merge with defaults
        const mergedOptions = $.extend({}, component.defaults || {}, filteredOptions);

        // Store the component definition on the element for updateElement access
        $el.data("jldn-component", component);

        component.build($el, mergedOptions, this);
        break;
      }
    }
  }

  /**
   * Applies shared element layouts, dimensions, presets, and inline CSS custom variables
   */
  applyCommonStyles($el, options) {
    // Translate presets for width/length
    let widthVal = options["meter-length"] || options["width"]
    if (widthVal) {
      const lengthArr = ["super-long", "x-long", "long", "medium", "short", "x-short", "super-short"]
      const lengthSizes = ["95%", "80%", "65%", "50%", "35%", "20%", "5%"]
      const idx = lengthArr.indexOf(widthVal)
      if (idx !== -1) {
        widthVal = lengthSizes[idx]
      }
      $el.css("--jldn-width", widthVal)
    }

    // Translate presets for thickness/height
    let heightVal = options["meter-thickness"] || options["height"]
    if (heightVal) {
      const heightArr = ["super-thick", "x-thick", "thick", "thin", "x-thin", "super-thin"]
      const heightSizes = [52.5, 45, 37.5, 22.5, 15, 7.5] // mapped sizes
      const idx = heightArr.indexOf(heightVal)
      if (idx !== -1) {
        heightVal = heightSizes[idx] + "px"
      }
      $el.css("--jldn-height", heightVal)
    }

    // Translate animation-speed preset keywords to CSS time values
    let speedVal = options["animation-speed"]
    if (speedVal) {
      if (speedVal === "slow") speedVal = "2.5s"
      else if (speedVal === "normal") speedVal = "1.5s"
      else if (speedVal === "fast") speedVal = "0.6s"
      else if (!isNaN(speedVal)) speedVal = speedVal + "s"
      $el.css("--jldn-animation-speed", speedVal)
    }

    // Ensure data-style defaults to flat
    const styleVal = options["style"] || "flat"
    $el.attr("data-style", styleVal)

    $.each(options, (key, value) => {
      if (value !== null && value !== undefined && value !== "") {
        if (key === "theme") {
          $el.attr("data-theme", value)
        } else if (key === "shape") {
          $el.attr("data-shape", value)
        } else if (key === "style") {
          // already set above
        } else if (key === "type") {
          $el.attr("data-type", value)
        } else if (OPTION_MAP[key]) {
          $el.css(OPTION_MAP[key], value)
        }
      }
    })
  }

  /**
   * Public Dynamic Update API: Updates a JLDN component's options programmatically
   */
  updateElement($el, el_options) {
    if (!$el || $el.length === 0) return
    const isMeter = $el.hasClass('jldn-meter')
    const options = (el_options && typeof el_options === "object" && !Array.isArray(el_options)) ? el_options : {}

    const component = $el.data("jldn-component");
    const allowed = component ? (component.allowedOptions || []) : [];

    $.each(options, (key, value) => {
      // Validate option whitelist
      if (component && !allowed.includes(key)) {
        return;
      }

      if (value !== null && value !== undefined && value !== "") {
        if (key === "theme") {
          $el.attr("data-theme", value)
        } else if (key === "shape") {
          $el.attr("data-shape", value)
        } else if (key === "style") {
          $el.attr("data-style", value)
        } else if (OPTION_MAP[key]) {
          $el.css(OPTION_MAP[key], value)
        }
      }
    })

    const fillSize = options["fill-size"] || options["reveal-width"]
    if (fillSize && (!component || allowed.includes("fill-size") || allowed.includes("reveal-width"))) {
      $el.css("--jldn-fill-size", fillSize)
      if (isMeter) {
        $el.attr("aria-valuenow", this.parseAriaValue(fillSize))
      }
    }
  }
}

// Static registration registry shared by all instances
Elements.registry = [];
Elements.register = function (name, config) {
  Elements.registry.push(config);
};

window.JLDN_Elements = Elements;
