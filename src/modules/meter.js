if (window.JLDN_Elements) {
  window.JLDN_Elements.register('meter', {
    selector: 'div.jldn-meter, div[class*="jldn-meter-"]',
    defaults: {
      style: "basic",
      "border-shape": "square",
      "reveal-width": "100%"
    },
    allowedOptions: [
      "theme", "border", "border-width", "border-style", "border-color", "border-shape", "shape",
      "style", "base-color", "reveal-width", "fill-size", "reveal-color", "stripe-color",
      "width", "height", "min-width", "min-height",
      "animation-speed", "animate", "candy-stripe-it", "font", "font-size", "font-family", "font-color",
      "box-shadow", "text-shadow", "mouseover", "focus", "3d-shadow-color", "3d-shadow-x", "3d-shadow-y", "drop-shadow-x", "drop-shadow-y"
    ],
    build: function ($el, options, core) {
      const text = $el.text() || "";
      const revealWidth = options["reveal-width"] || options["fill-size"] || "100%";

      // Accessibility Injection
      $el.attr({
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": core.parseAriaValue(revealWidth)
      });

      // Apply shared styles & attributes
      core.applyCommonStyles($el, options);

      $el.html(
        '<span class="jldn-mask"></span>' +
        '<span class="jldn-text">' + core.escapeHTML(text.trim()) + '</span>'
      );

      $el.find(".jldn-mask").on("transitionend", function (e) {
        if (e.originalEvent.propertyName === "left") {
          const widthVal = $el.css("--jldn-reveal-width") || "";
          if (widthVal.trim() === "100%" || widthVal.trim() === "100") {
            $el.trigger("jldn:fill-complete");
          }
        }
      });

      $el.css("--jldn-reveal-width", "0%");
      setTimeout(() => {
        $el.css("--jldn-reveal-width", revealWidth);
      }, 50);
    }
  });
}
