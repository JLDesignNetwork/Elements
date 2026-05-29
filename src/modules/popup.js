if (window.JLDN_Elements) {
  window.JLDN_Elements.register('popup', {
    selector: 'div.jldn-popup, div[class*="jldn-popup-"]',
    defaults: {
      style: "flat",
      shape: "rounded",
      "border-width": "3px",
      width: "90%"
    },
    allowedOptions: [
      "theme", "shape", "style", "base-color", "border-width",
      "font-size", "font-color", "width", "height",
      "candystripe-color", "animation-speed", "trigger"
    ],
    build: function ($el, options, core) {
      const $contents = $el.contents().detach();

      // Apply shared styles & attributes
      core.applyCommonStyles($el, options);

      $el.html(
        '<div class="jldn-popup-overlay">' +
        '<div class="jldn-popup-content">' +
        '<span class="jldn-popup-stripes"></span>' +
        '<div class="jldn-popup-body">' +
        '<button class="jldn-popup-close" type="button">&times;</button>' +
        '<div class="jldn-popup-text"></div>' +
        '</div>' +
        '</div>' +
        '</div>'
      );

      $el.find('.jldn-popup-text').append($contents);

      if (options["trigger"]) {
        const triggerId = options["trigger"];
        // Sanitize triggerId to prevent jQuery selector injection
        const cleanTriggerId = typeof triggerId === "string" ? triggerId.replace(/[^a-zA-Z0-9_-]/g, "") : "";
        if (cleanTriggerId) {
          const popupId = $el.attr("id") || ("jldn-popup-" + Math.random().toString(36).substring(2, 9));
          if (!$el.attr("id")) $el.attr("id", popupId);

          $(document).off("click.jldn-trigger-" + popupId).on("click.jldn-trigger-" + popupId, "#" + cleanTriggerId, () => {
            core.openPopup($el);
          });
        }
      }
    }
  });

  // Attach helper methods to Elements prototype
  window.JLDN_Elements.prototype.openPopup = function ($popupEl) {
    $popupEl.addClass("jldn-active");
    $("body").css("overflow", "hidden");
  };

  window.JLDN_Elements.prototype.closePopup = function ($popupEl) {
    $popupEl.removeClass("jldn-active");
    $("body").css("overflow", "");
  };
}
