if (window.JLDN_Elements) {
  window.JLDN_Elements.register('meter', {
    selector: 'div.jldn-meter, div[class*="jldn-meter-"]',
    defaults: {
      style: "flat",
      shape: "square",
      "fill-size": "100%"
    },
    allowedOptions: [
      "theme", "shape", "style", "base-color", "border-width",
      "font-size", "font-color", "width", "height",
      "fill-color", "candystripe-color", "animation-speed", "fill-size", "reveal-width",
      "meter-color", "bar-color", "meter-shadow", "reveal-color",
      "meter-length", "meter-thickness"
    ],
    build: function ($el, options, core) {
      const text = $el.text() || "";
      const fillVal = options["fill-size"] || options["reveal-width"] || "100%";

      // Accessibility Injection
      $el.attr({
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": core.parseAriaValue(fillVal)
      });

      // Apply shared styles & attributes
      core.applyCommonStyles($el, options);

      $el.html(
        '<span class="jldn-fill">' +
        '<span class="jldn-stripes"></span>' +
        '</span>' +
        '<span class="jldn-unfill"></span>' +
        '<span class="jldn-text">' + core.escapeHTML(text.trim()) + '</span>'
      );

      $el.find(".jldn-fill").on("transitionend", function (e) {
        if (e.originalEvent.propertyName === "width") {
          const widthVal = $el.css("--jldn-fill-size") || "";
          if (widthVal.trim() === "100%" || widthVal.trim() === "100") {
            $el.trigger("jldn:fill-complete");
          }
        }
      });

      $el.css("--jldn-fill-size", "0%");
      setTimeout(() => {
        $el.css("--jldn-fill-size", fillVal);
      }, 50);
    }
  });
}
