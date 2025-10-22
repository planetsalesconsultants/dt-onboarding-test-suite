/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
//
// Emits a custom event with more convenient defaults.
//
export function emit(el, name, options) {
  const event = new CustomEvent(name, Object.assign({ bubbles: true, cancelable: false, composed: true, detail: {} }, options));
  el.dispatchEvent(event);
  return event;
}
//# sourceMappingURL=event.js.map
