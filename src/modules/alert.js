if (window.JLDN_Elements) {
  window.JLDN_Elements.register('alert', {
    selector: 'div.jldn-alert, div[class*="jldn-alert-"]',
    defaults: {
      style: "flat",
      shape: "rounded",
      type: "info",
      dismissible: true,
      "border-width": "4px"
    },
    allowedOptions: [
      "theme", "shape", "style", "base-color", "border-width",
      "font-size", "font-color", "width", "height",
      "candystripe-color", "animation-speed", "type", "dismissible"
    ],
    build: function ($el, options, core) {
      const $contents = $el.contents().detach();
      const isDismissible = options["dismissible"] !== false;
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
        '<span class="jldn-alert-stripes"></span>' +
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
