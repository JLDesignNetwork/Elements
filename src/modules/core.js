const OPTION_MAP = new Map([
    ["width", "--jldn-width"],
    ["height", "--jldn-height"],
    ["min-width", "--jldn-min-width"],
    ["min-height", "--jldn-min-height"],
    ["border-width", "--jldn-border-width"],
    ["border-style", "--jldn-border-style"],
    ["border-color", "--jldn-border-color"],
    ["border-shape", "--jldn-border-shape"],
    ["style", "--jldn-style"],
    ["base-color", "--jldn-base-color"],
    ["reveal-width", "--jldn-reveal-width"],
    ["mask-color", "--jldn-mask-color"],
    ["stripe-color", "--jldn-stripe-color"],
    ["font-size", "--jldn-font-size"],
    ["font-family", "--jldn-font-family"],
    ["font-color", "--jldn-font-color"],
    ["box-shadow", "--jldn-shadow"],
    ["text-shadow", "--jldn-text-shadow"],
    ["3d-shadow-x", "--jldn-shadow-x"],
    ["3d-shadow-y", "--jldn-shadow-y"],
    ["drop-shadow-x", "--jldn-drop-shadow-x"],
    ["drop-shadow-y", "--jldn-drop-shadow-y"],
    ["mouseover", "--jldn-mouseover"],
    ["focus", "--jldn-focus"]
]);

class Elements {
    constructor() {
        this.registry = Elements.registry;
    }

    /**
     * Escapes special characters in HTML to prevent XSS attacks.
     *
     * @param {string} html - The HTML string to be escaped.
     * @returns {string} The escaped HTML string with special characters replaced by their corresponding HTML entities.
     */
    escapeHTML(html) {
        const map = new Map([
            ["&", "&amp;"],
            ["<", "&lt;"],
            [">", "&gt;"],
            ['"', "&quot;"],
            ["'", "&#039;"]
        ]);
        return html.replace(/[&<>"']/g, (m) => {
            return map.get(m);
        });
    }

    /**
     * Formats string/keyword sizes to numeric percentages for ARIA values
     */
    parseAriaValue(val) {
        if (!val) return 100
        const lengthArr = ["super-long", "x-long", "long", "medium", "short", "x-short", "super-short"]
        const lengthSizes = [95, 80, 65, 50, 35, 20, 5]
        const idx = lengthArr.indexOf(val)
        if (idx !== -1) return lengthSizes[idx]

        const numeric = parseInt(val, 10)
        return isNaN(numeric) ? 100 : numeric
    }

    /**
     * Fetches specific elements from the document.
     */
    fetchElements() {
        const selectors = this.registry.map(c => c.selector).join(', ');
        return selectors ? $(document).find(selectors) : $();
    }

    buildElement($el, el_options) {
        let options = (el_options && typeof el_options === "object" && !Array.isArray(el_options)) ? el_options : {}

        // Remove data-options attribute to keep DOM clean
        $el.removeAttr("data-options")

        // Extract shorthand configuration from class names
        const classList = $el.attr("class") ? $el.attr("class").split(/\s+/) : [];
        let shorthandOptions = {};
        for (const className of classList) {
            // Pattern: jldn-(button|meter|code|alert|popup)-(themeName) or jldn-(button|meter|code|alert|popup)-(styleCategory)
            const match = className.match(/^jldn-(button|meter|code|alert|popup)-(.+)$/);
            if (match) {
                const parts = match[2].toLowerCase().split("-");

                // Try to identify a theme in the parts
                const themesList = [
                    "Christmas", "Halloween", "Easter", "4th of July", "St. Patrick", "Valentine", "Thanksgiving", "New Year",
                    "Spring", "Summer", "Autumn", "Winter", "Star Wars", "Matrix", "LOTR", "Star Trek", "Barbie", "Cyberpunk",
                    "Michigan", "Alabama", "Texas", "UNC", "LSU", "Celtics", "Seahawks", "SF49ers", "Miami Vice", "Cowboys"
                ];

                // Join parts and look for theme matches
                for (let i = 0; i < parts.length; i++) {
                    for (let j = i + 1; j <= parts.length; j++) {
                        const sub = parts.slice(i, j).join("");
                        const matchedTheme = themesList.find(t => t.toLowerCase().replace(/[^a-z0-9]/g, "") === sub);
                        if (matchedTheme) {
                            shorthandOptions["theme"] = matchedTheme;
                        }
                    }
                }

                // Try to identify a style category in the parts
                const styleCategories = [
                    "basic", "professional", "cartoon", "esports", "sports",
                    "cyberpunk", "glassmorphic"
                ];

                let foundStyle = "";
                let is3d = false;

                if (parts.includes("3d")) {
                    is3d = true;
                }

                styleCategories.forEach(s => {
                    if (parts.includes(s)) {
                        foundStyle = s;
                    }
                });

                // Default to basic if no matching category found but 3d/flat specified
                if (!foundStyle && (is3d || parts.includes("flat"))) {
                    foundStyle = "basic";
                }

                if (foundStyle) {
                    shorthandOptions["style"] = foundStyle + (is3d ? "-3d" : "");
                }
            }
        }

        // Merge options: data-options takes precedence over shorthand classes
        options = $.extend({}, shorthandOptions, options);

        // Find matching registered component
        for (const component of this.registry) {
            if ($el.is(component.selector)) {
                if (component.name) {
                    $el.addClass(`jldn-${component.name}`);
                }
                // Filter unrecognized/untracked options
                const filteredOptions = {};
                const allowed = component.allowedOptions || [];
                $.each(options, (key, val) => {
                    if (allowed.includes(key)) {
                        Object.assign(filteredOptions, { [key]: val });
                    }
                });

                // Merge with defaults
                const mergedOptions = $.extend({}, component.defaults || {}, filteredOptions);

                // Store the component definition on the element for updateElement access
                $el.data("jldn-component", component);

                const attributes = $el[0].attributes;
                for (let i = attributes.length - 1; i >= 0; i--) {
                    const attr = attributes[i].name;
                    if (attr !== 'class' && attr !== 'id' && attr !== 'style' && !attr.startsWith('data-')) {
                        $el.removeAttr(attr);
                    }
                }

                component.build($el, mergedOptions, this);
                break;
            }
        }
    }

    parseShorthands(options) {
        // Fallback mappings for backwards compatibility
        if (options["candystripe-color"]) options["stripe-color"] = options["candystripe-color"];
        if (options["fill-color"]) options["base-color"] = options["fill-color"];
        if (options["reveal-color"]) options["mask-color"] = options["reveal-color"];
        if (options["meter-color"]) options["mask-color"] = options["meter-color"];
        if (options["bar-color"]) options["mask-color"] = options["bar-color"];

        // Normalize size strings
        const lengthArr = ["super-long", "x-long", "long", "medium", "short", "x-short", "super-short", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"];
        const lengthSizes = ["95%", "80%", "65%", "50%", "35%", "20%", "5%", "95%", "80%", "65%", "50%", "35%", "20%", "5%"];

        if (options["width"]) {
            options["min-width"] = "0px";
            const idx = lengthArr.indexOf(options["width"]);
            if (idx !== -1) {
                options["width"] = lengthSizes[idx];
            } else if (/^\d+$/.test(options["width"])) {
                options["width"] = options["width"] + "px";
            }
        }

        if (options["reveal-width"]) {
            const idx = lengthArr.indexOf(options["reveal-width"]);
            if (idx !== -1) options["reveal-width"] = lengthSizes[idx];
        }

        if (options["fill-size"]) {
            const idx = lengthArr.indexOf(options["fill-size"]);
            if (idx !== -1) options["fill-size"] = lengthSizes[idx];
        }

        const heightArr = ["super-thick", "x-thick", "thick", "medium", "thin", "x-thin", "super-thin", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"];
        const heightSizes = ["52.5px", "45px", "37.5px", "30px", "22.5px", "15px", "7.5px", "52.5px", "45px", "37.5px", "30px", "22.5px", "15px", "7.5px"];
        if (options["height"]) {
            options["min-height"] = "0px";
            const idx = heightArr.indexOf(options["height"]);
            if (idx !== -1) {
                options["height"] = heightSizes[idx];
            } else if (/^\d+$/.test(options["height"])) {
                options["height"] = options["height"] + "px";
            }
        }

        // Parse border shorthand
        if (options["border"]) {
            const borderParts = String(options["border"]).split(/\s+/);
            borderParts.forEach(part => {
                if (/^\d+(px|em|rem|%)$/.test(part) || /^\d+$/.test(part)) {
                    options["border-width"] = part + (/\d+$/.test(part) ? "px" : "");
                } else if (/^(solid|dashed|dotted|double|none|ridge|groove|inset|outset)$/.test(part)) {
                    options["border-style"] = part;
                } else if (part) {
                    options["border-color"] = part;
                }
            });
        }

        // Parse font shorthand
        if (options["font"]) {
            const fontParts = String(options["font"]).split(/\s+/);
            fontParts.forEach(part => {
                if (/^\d+(px|em|rem|pt|%)$/.test(part)) {
                    options["font-size"] = part;
                } else if (part) {
                    options["font-family"] = part;
                }
            });
        }

        if (options["animation-speed"] === "paused") {
            options["animate"] = false;
        }

        return options;
    }

    applyOption(key, value, $el, isMeter) {
        if (value === null || value === undefined || value === "") return;

        if (key === "theme") {
            $el.attr("data-theme", value);
        } else if (key === "type") {
            $el.attr("data-type", value);
        } else if (key === "style") {
            const styleVal = value === "3d" ? "basic-3d" : value;
            $el.attr("data-style", styleVal);
        } else if (key === "border-shape" || key === "shape") {
            const radiusMap = new Map([
                ["square", "0px"],
                ["round", "8px"],
                ["rounded", "8px"],
                ["rounded-xs", "2px"],
                ["rounded-sm", "4px"],
                ["rounded-md", "8px"],
                ["rounded-lg", "12px"],
                ["rounded-xl", "20px"],
                ["circle", "9999px"]
            ]);
            const radius = radiusMap.has(value) ? radiusMap.get(value) : value;
            $el.css("--jldn-border-shape", radius);
            $el.attr("data-shape", value);
        } else if (key === "animation-speed") {
            if (value === "paused") {
                $el.css("--jldn-animate", "false");
                $el.css("--jldn-animation-play-state", "paused");
                $el.attr("data-animation-paused", "true");
            } else {
                $el.removeAttr("data-animation-paused");
                let speedVal = value;
                if (speedVal === "xslow") speedVal = "4.0s";
                else if (speedVal === "slow") speedVal = "2.5s";
                else if (speedVal === "normal") speedVal = "1.5s";
                else if (speedVal === "fast") speedVal = "0.8s";
                else if (speedVal === "xfast") speedVal = "0.4s";
                else if (!isNaN(speedVal)) speedVal = speedVal + "s";
                $el.css("--jldn-animation-speed", speedVal);
                $el.css("--jldn-animate", "true");
                $el.css("--jldn-animation-play-state", "running");
            }
        } else if (key === "animate") {
            const animateVal = value === true || value === "true" || value === 1;
            $el.css("--jldn-animate", animateVal ? "true" : "false");
            $el.css("--jldn-animation-play-state", animateVal ? "running" : "paused");
            $el.attr("data-animate", animateVal ? "true" : "false");
            if (!animateVal) {
                $el.attr("data-animation-paused", "true");
            } else {
                $el.removeAttr("data-animation-paused");
            }
        } else if (key === "candy-stripe-it") {
            const stripeVal = value === true || value === "true" || value === 1;
            $el.css("--jldn-candy-stripe-it", stripeVal ? "true" : "false");
            if (!stripeVal) {
                $el.attr("data-candy-stripe-it", "false");
            } else {
                $el.removeAttr("data-candy-stripe-it");
            }
        } else if (key === "reveal-width" || key === "fill-size") {
            $el.css("--jldn-reveal-width", value);
            if (isMeter) {
                $el.attr("aria-valuenow", this.parseAriaValue(value));
            }
        } else if (key === "3d-shadow-color") {
            $el.css("--jldn-btn-3d-shadow", value);
            $el.css("--jldn-meter-3d-shadow", value);
            $el.css("--jldn-code-3d-shadow", value);
            $el.css("--jldn-alert-3d-shadow", value);
            $el.css("--jldn-popup-3d-shadow", value);
        } else if (key === "mouseover" || key === "focus") {
            let uid = $el.attr('data-jldn-id');
            if (!uid) {
                uid = 'jldn-uid-' + Math.random().toString(36).substr(2, 9);
                $el.attr('data-jldn-id', uid);
            }
            
            let $style = $('style#jldn-dynamic-states');
            if ($style.length === 0) {
                $style = $('<style id="jldn-dynamic-states"></style>');
                $('head').append($style);
            }
            
            window.JLDN_States = window.JLDN_States || {};
            window.JLDN_States[uid] = window.JLDN_States[uid] || {};
            window.JLDN_States[uid][key] = value;
            
            let cssRules = "";
            for (let id in window.JLDN_States) {
                if (window.JLDN_States[id]["mouseover"]) {
                    cssRules += `[data-jldn-id="${id}"]:hover { ${window.JLDN_States[id]["mouseover"]} !important; }\n`;
                }
                if (window.JLDN_States[id]["focus"]) {
                    cssRules += `[data-jldn-id="${id}"]:focus, [data-jldn-id="${id}"]:focus-within { ${window.JLDN_States[id]["focus"]} !important; }\n`;
                }
            }
            $style.html(cssRules);
        } else if (OPTION_MAP.has(key)) {
            let cssKey = OPTION_MAP.get(key);
            if ((cssKey === "--jldn-shadow-x" || cssKey === "--jldn-shadow-y" || cssKey === "--jldn-drop-shadow-x" || cssKey === "--jldn-drop-shadow-y") && String(value).trim() !== "" && !isNaN(value)) {
                value = value + "px";
            }
            $el.css(cssKey, value);
            return;
            
        }
    }

    /**
     * Applies shared element layouts, dimensions, presets, and inline CSS custom variables
     */
    applyCommonStyles($el, options) {
        options = this.parseShorthands(options);
        const isMeter = $el.hasClass('jldn-meter');

        // Default styles for initial build
        if (!options["style"]) options["style"] = "basic";
        if (options["animate"] === undefined && options["animation-speed"] !== "paused") options["animate"] = true;
        if (options["candy-stripe-it"] === undefined) options["candy-stripe-it"] = true;

        $.each(options, (key, value) => {
            this.applyOption(key, value, $el, isMeter);
        });
    }

    /**
     * Public Dynamic Update API: Updates a JLDN component's options programmatically
     */
    updateElement($el, el_options) {
        if (!$el || $el.length === 0) return;
        const isMeter = $el.hasClass('jldn-meter');
        let options = (el_options && typeof el_options === "object" && !Array.isArray(el_options)) ? el_options : {};

        const component = $el.data("jldn-component");
        const allowed = component ? (component.allowedOptions || []) : [];

        options = this.parseShorthands(options);

        $.each(options, (key, value) => {
            // Validate option whitelist if defined
            if (component && allowed.length > 0 && !allowed.includes(key)) {
                return;
            }
            this.applyOption(key, value, $el, isMeter);
        });
    }
}

// Static registration registry shared by all instances
Elements.registry = [];
Elements.register = function (name, config) {
    config.name = name;
    Elements.registry.push(config);
};

// Programmatic creation helper APIs
Elements.prototype.createButton = function ($el, options) {
    $el.addClass("jldn-button");
    this.buildElement($el, options);
};

Elements.prototype.createMeter = function ($el, options) {
    $el.addClass("jldn-meter");
    this.buildElement($el, options);
};

Elements.prototype.createCode = function ($el, options) {
    $el.addClass("jldn-code");
    this.buildElement($el, options);
};

Elements.prototype.createAlert = function ($el, options) {
    $el.addClass("jldn-alert");
    this.buildElement($el, options);
};

Elements.prototype.createPopup = function ($el, options) {
    $el.addClass("jldn-popup");
    this.buildElement($el, options);
};

window.JLDN_Elements = Elements;

// Dynamic Single-Link Module Loader
(function () {
    const currentScript = document.currentScript || (() => {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            const scriptEl = scripts.item(i);
            if (scriptEl && scriptEl.src && scriptEl.src.includes('core.js')) {
                return scriptEl;
            }
        }
        return scripts.item(scripts.length - 1);
    })();

    if (currentScript && currentScript.src) {
        try {
            const url = new URL(currentScript.src, window.location.href);
            const modulesParam = url.searchParams.get("modules");
            if (modulesParam) {
                const basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1);
                const modules = modulesParam.split(",");

                // 1. Load style.css automatically relative to core.js path (replaces modules/ with style.css)
                const cssUrl = basePath.replace(/modules\/$/, "style.css");
                const hasCss = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(link => {
                    const href = link.getAttribute('href');
                    return href && (href === 'src/style.css' || href.includes('style.css'));
                });
                if (!hasCss) {
                    const linkEl = document.createElement("link");
                    linkEl.rel = "stylesheet";
                    linkEl.href = cssUrl;
                    document.head.appendChild(linkEl);
                }

                // 2. Load JS component modules
                let loadedCount = 0;
                const totalModules = modules.length;

                const loadScript = (srcUrl, callback) => {
                    const scriptEl = document.createElement("script");
                    scriptEl.src = srcUrl;
                    scriptEl.defer = true;
                    if (callback) {
                        scriptEl.onload = callback;
                        scriptEl.onerror = callback; // continue even if one fails
                    }
                    document.head.appendChild(scriptEl); // head append is safer than body when body might not exist
                };

                const onModuleLoaded = () => {
                    loadedCount++;
                    if (loadedCount === totalModules) {
                        // 3. Load script.js (entry/init point) last after all modules are loaded
                        const initScriptUrl = basePath.replace(/modules\/$/, "script.js");
                        loadScript(initScriptUrl);
                    }
                };

                modules.forEach(modName => {
                    const cleanName = modName.trim().toLowerCase();
                    if (["button", "meter", "code", "alert", "popup"].includes(cleanName)) {
                        loadScript(`${basePath}${cleanName}.js`, onModuleLoaded);
                    } else {
                        // Count un-recognized modules as loaded so we don't hang
                        onModuleLoaded();
                    }
                });
            }
        } catch (e) {
            console.error("JLDN Elements: Unified loader encountered an error", e);
        }
    }
})();
