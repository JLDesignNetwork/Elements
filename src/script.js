$(() => {
  console.log("JLDN Elements Engine: Starting initialization...");

  if (typeof window.JLDN_Elements === "undefined") {
    console.error("JLDN Elements: window.JLDN_Elements is not defined. Ensure core.js is loaded first.");
    return;
  }

  let JLDN = new window.JLDN_Elements()
  window.JLDN = JLDN; // Expose globally for API controls

  // search document for all elements marked for rebuilding
  let count = 0;
  jQuery.each(JLDN.fetchElements(), (index, value) => {
    let $el = $(value)
    let el_options = $el.data("options")

    // build found elements
    JLDN.buildElement($el, el_options)
    count++;
  })

  console.log("JLDN Elements Engine: Successfully built " + count + " elements.");

  // Keyboard navigation accessibility for custom div buttons
  $(document).on("keydown", '[role="button"].jldn-button', function (e) {
    if (e.key === " " || e.key === "Enter" || e.keyCode === 32 || e.keyCode === 13) {
      e.preventDefault();
      $(this).click();
    }
  });

  // Code copy-to-clipboard trigger
  $(document).on("click", ".jldn-code-copy", function () {
    const $btn = $(this);
    const $pre = $btn.siblings("pre");
    const codeLines = [];
    $pre.find(".jldn-code-txt").each(function () {
      codeLines.push($(this).text());
    });
    const codeText = codeLines.join("\n");

    const setCopied = () => {
      $btn.text("Copied!");
      setTimeout(() => $btn.text("Copy"), 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(codeText)
        .then(setCopied)
        .catch(err => console.error("Clipboard write failed:", err));
    } else {
      // Fallback using temporary textarea
      const textarea = document.createElement("textarea");
      textarea.value = codeText;
      textarea.style.position = "fixed"; // Avoid scrolling to bottom
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setCopied();
        } else {
          console.error("Fallback copy command was unsuccessful");
        }
      } catch (err) {
        console.error("Fallback copy command failed:", err);
      }
      document.body.removeChild(textarea);
    }
  });

  // Close alert banner triggers
  $(document).on("click", ".jldn-alert-close", function () {
    $(this).closest(".jldn-alert").fadeOut(300, function () {
      $(this).remove()
    })
  })

  // Close popup modal triggers
  $(document).on("click", ".jldn-popup-close, .jldn-popup-overlay", function (e) {
    if ($(e.target).closest(".jldn-popup-close").length > 0 || $(e.target).is(".jldn-popup-overlay")) {
      const $popup = $(this).closest(".jldn-popup")
      JLDN.closePopup($popup)
    }
  })

  // --- Dynamic Light-Source Shadows ---
  let updatePending = false;
  const updateShadows = () => {
    if (updatePending) return;
    updatePending = true;
    requestAnimationFrame(() => {
      const centerX = window.innerWidth / 2;
      // Select standard 3D components OR the popup content of a 3D popup
      $('[data-style="3d"]:not(.jldn-popup), .jldn-popup[data-style="3d"] .jldn-popup-content').each(function () {
        const rect = this.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const deltaX = elCenterX - centerX;
        const ratio = deltaX / (window.innerWidth / 2 || 1);

        // Light is at top-center. Shadow is cast in the opposite direction.
        const maxExtrusionOffset = 5; // max horizontal pixels to shift 3D solid edge
        const maxDropShadowOffset = 10; // max horizontal pixels to shift soft shadow

        const shadowX = (ratio * maxExtrusionOffset).toFixed(1);
        const dropShadowX = (ratio * maxDropShadowOffset).toFixed(1);

        // Bind relative offsets to element CSS custom properties
        this.style.setProperty('--jldn-shadow-x', `${shadowX}px`);
        this.style.setProperty('--jldn-drop-shadow-x', `${dropShadowX}px`);
      });
      updatePending = false;
    });
  };

  // Run on initial construction, window load, scroll, resizing, and custom events
  updateShadows();
  $(window).on("load scroll resize lookup-shadows", updateShadows);

  // Fallbacks to guarantee calculations run once layout has fully settled
  setTimeout(updateShadows, 50);
  setTimeout(updateShadows, 250);

  // Extend Element prototype to update shadows on dynamic update
  const originalUpdate = JLDN.updateElement;
  JLDN.updateElement = function ($el, options) {
    originalUpdate.call(this, $el, options);
    // Short delay to allow browser to recalculate bounding rects if DOM changed
    setTimeout(updateShadows, 10);
  };

  console.log("JLDN Elements Engine: Shadows and callbacks bound. Initialization complete.");
})
