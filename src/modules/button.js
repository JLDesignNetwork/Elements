if (window.JLDN_Elements) {
  window.JLDN_Elements.register('button', {
    selector: 'button.jldn-button, div.jldn-button',
    defaults: {
      style: "flat",
      shape: "square",
      "fill-size": "100%"
    },
    allowedOptions: [
      "theme", "shape", "style", "base-color", "border-width",
      "font-size", "font-color", "width", "height",
      "fill-color", "reveal-color", "candystripe-color", "animation-speed", "fill-size", "reveal-width"
    ],
    build: function ($el, options, core) {
      const $contents = $el.contents().detach();
      const tagName = $el.prop("tagName").toLowerCase();

      // Accessibility Injection
      if (tagName === "div") {
        $el.attr({
          "role": "button",
          "tabindex": "0"
        });
      }

      // Apply shared styles & attributes
      core.applyCommonStyles($el, options);

      const fillSize = options["fill-size"] || options["reveal-width"] || "100%";
      const hasAnimation = options["animation-speed"];

      $el.html(
        '<span class="jldn-fill">' +
        '<span class="jldn-stripes"></span>' +
        '</span>' +
        '<span class="jldn-unfill"></span>' +
        '<span class="jldn-text"></span>'
      );

      $el.find('.jldn-text').append($contents);

      $el.find(".jldn-fill").on("transitionend", function (e) {
        if (e.originalEvent.propertyName === "width") {
          const widthVal = $el.css("--jldn-fill-size") || "";
          if (widthVal.trim() === "100%" || widthVal.trim() === "100") {
            $el.trigger("jldn:fill-complete");
          }
        }
      });

      if (hasAnimation) {
        $el.css("--jldn-fill-size", "0%");
        setTimeout(() => {
          $el.css("--jldn-fill-size", fillSize);
        }, 50);
      } else {
        $el.css("--jldn-fill-size", fillSize);
      }
    }
  });
}
