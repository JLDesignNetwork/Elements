if (window.JLDN_Elements) {
  window.JLDN_Elements.register('alert', {
    selector: 'div.jldn-alert, div[class*="jldn-alert-"]',
    defaults: {
      style: "basic",
      "border-shape": "rounded-md",
      type: "info",
      dismissible: true,
      "border-width": "4px"
    },
    allowedOptions: [
      "theme", "border", "border-width", "border-style", "border-color", "border-shape", "shape",
      "style", "base-color", "reveal-width", "fill-size", "reveal-color", "stripe-color",
      "width", "height", "min-width", "min-height",
      "animation-speed", "animate", "candy-stripe-it", "font", "font-size", "font-family", "font-color",
      "box-shadow", "text-shadow", "mouseover", "focus", "3d-shadow-color", "3d-shadow-x", "3d-shadow-y", "drop-shadow-x", "drop-shadow-y", "type", "dismissible"
    ],
    build: function ($el, options, core) {
      const $contents = $el.contents().detach();
      const isDismissible = options["dismissible"] !== false && options["dismissible"] !== "false";
      let alertIcon = "";
      const type = options["type"] || "info";

      switch (type) {
        case "success": alertIcon = "✓"; break;
        case "error": alertIcon = "✕"; break;
        case "warning": alertIcon = "⚠"; break;
        default: alertIcon = "ℹ"; break;
      }

      // Apply shared styles & attributes
      core.applyCommonStyles($el, options);

      $el.html(
        '<div class="jldn-mask"></div>' +
        '<div class="jldn-alert-content">' +
        '<span class="jldn-alert-icon">' + alertIcon + '</span>' +
        '<span class="jldn-alert-text"></span>' +
        (isDismissible ? '<button class="jldn-alert-close" type="button">&times;</button>' : '') +
        '</div>'
      );

      $el.find('.jldn-alert-text').append($contents);
    }
  });
}
