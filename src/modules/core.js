/**
 * Core utility functions for Elements
 */
export function registerElement(name, elementClass) {
  if (!customElements.get(name)) {
    customElements.define(name, elementClass);
  }
}
