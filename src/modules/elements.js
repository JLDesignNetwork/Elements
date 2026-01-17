export class Elements {
  /**
   * Checks if a given argument is blank (undefined, null, or empty).
   *
   * @param {*} argument - The argument to be checked.
   * @returns {boolean} Returns true if the argument is blank, otherwise false.
   */
  isBlank(argument) {
    if (typeof argument === "undefined" || !argument) {
      return true
    }
    return false
  }

  /**
   * Validates and returns a CSS property value.
   *
   * @param {*} value - The value to be validated. If not null or undefined, this value is returned.
   * @param {string} name - The name of the CSS property to retrieve from the root element if value is null or undefined.
   * @returns {*} The validated value. If the input value is null or undefined, returns the CSS property value from the root element.
   */
  validate(value, name) {
    return value ?? $(":root").css(name)
  }

  /**
   * Checks if any element from the needleArray exists as a key in the haystackArray.
   *
   * @param {Array} needleArray - The array of elements to search for in the haystackArray keys.
   * @param {Object} haystackArray - The object to search through. Its keys will be compared against needleArray elements.
   * @returns {boolean} Returns true if any element from needleArray is found as a key in haystackArray, otherwise false.
   */
  exists(needleArray, haystackArray) {
    var result = false
    jQuery.each(haystackArray, function (k, v) {
      if (needleArray.some((arrVal) => k === arrVal)) {
        result = true
        return false
      }
    })
    return result
  }

  /**
   * Escapes special characters in HTML to prevent XSS attacks.
   *
   * @param {string} html - The HTML string to be escaped.
   * @returns {string} The escaped HTML string with special characters replaced by their corresponding HTML entities.
   */
  escapeHTML(html) {
    var map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }
    return html.replace(/[&<>"']/g, (m) => {
      return map[m]
    })
  }

  /**
   * Fetches specific elements from the document.
   *
   * This function searches the entire document for elements with specific classes
   * that are used in the JLDN Elements system.
   *
   * @returns {jQuery} A jQuery object containing all found elements matching the specified selectors.
   *                   This includes div elements with class 'jldn-meter', button elements with class 
   * 									 'jldn-button', and code elements with class 'jldn-code'.
   */
  fetchElements() {
    return $(document).find(
      "div.jldn-meter, button.jldn-button, code.jldn-code",
    )
  }

  buildElement(el, el_id, el_class, el_options) {
    const $this = this
    const allowed_options = [
      "style",
      "shape",
      "width",
      "height",
      "fill-color",
      "candystripe-color",
      "theme",
    ]
    const alt_allowed_options = $.merge(allowed_options, [
      "reveal-color",
      "fill-size",
      "animation-speed",
    ])
    const tag = el.toLowerCase()
    const selector = `${tag}#${el_id}.${el_class}`
    const text = $(selector).text() || false

    $(selector)
      .html(
        "<span><span><span>" +
          (!text ? "" : $this.escapeHTML(text)) +
          "</span></span></span>",
      )
      .removeAttr("data-options")

		// loop through object
    $.each(el_options, (key, value) => {
    	//console.log([key, value])
      switch (el_class) {
        case 'jldn-button':
        case 'jldn-code':
        	console.log(`${selector}: ${key}=>${value}`);
        	break;
      	case 'jldn-meter':
        	break;
      }
    })
  }
}