if (window.JLDN_Elements) {
  window.JLDN_Elements.register('code', {
    selector: 'code.jldn-code, div.jldn-code',
    defaults: {
      style: "flat",
      shape: "rounded",
      "border-width": "2px"
    },
    allowedOptions: [
      "theme", "shape", "style", "base-color", "border-width",
      "font-size", "font-color", "width", "height",
      "candystripe-color", "animation-speed"
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
        '<span class="jldn-code-stripes"></span>' +
        '<div class="jldn-code-snippet">' +
        '<button class="jldn-code-copy" type="button">Copy</button>' +
        '<pre class="jldn-code-pre">' + linesHTML + '</pre>' +
        '</div>'
      );
    }
  });
}
