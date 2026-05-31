if (window.JLDN_Elements) {
  window.JLDN_Elements.register('code', {
    selector: 'code.jldn-code, div.jldn-code, code[class*="jldn-code-"], div[class*="jldn-code-"]',
    defaults: {
      style: "basic",
      "border-shape": "rounded-md",
      "border-width": "2px"
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

      // Apply shared styles & attributes
      core.applyCommonStyles($el, options);

      const rawLines = text.split("\n");
      if (rawLines.length > 0 && rawLines[0].trim() === "") rawLines.shift();
      if (rawLines.length > 0 && rawLines[rawLines.length - 1].trim() === "") rawLines.pop();

      let linesHTML = "";
      $.each(rawLines, (idx, lineContent) => {
        linesHTML +=
          '<div class="jldn-code-line">' +
          '<span class="jldn-code-ln">' + (idx + 1) + '</span>' +
          '<span class="jldn-code-txt">' + core.escapeHTML(lineContent) + '</span>' +
          '</div>';
      });

      $el.html(
        '<div class="jldn-mask"></div>' +
        '<div class="jldn-code-snippet">' +
        '<button class="jldn-code-copy" type="button">Copy</button>' +
        '<pre class="jldn-code-pre">' + linesHTML + '</pre>' +
        '</div>'
      );
    }
  });
}
