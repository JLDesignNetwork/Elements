import { registerElement } from './modules/core.js';
import { JLMeter } from './modules/meter.js';
import { JLButton } from './modules/button.js';
import { JLCode } from './modules/code.js';
import { JLPopup } from './modules/popup.js';
import { JLAlert } from './modules/alert.js';

// Register all Web Components
registerElement('jl-meter', JLMeter);
registerElement('jl-button', JLButton);
registerElement('jl-code', JLCode);
registerElement('jl-popup', JLPopup);
registerElement('jl-alert', JLAlert);

export { JLMeter, JLButton, JLCode, JLPopup, JLAlert };
