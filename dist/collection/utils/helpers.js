/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner button in `gr-button` should inherit
 * the `aria-label` attribute that developers set directly on `gr-button`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
export const inheritAttributes = (el, attributes = []) => {
  const attributeObject = {};
  attributes.forEach(attr => {
    if (el.hasAttribute(attr)) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        attributeObject[attr] = el.getAttribute(attr);
      }
      el.removeAttribute(attr);
    }
  });
  return attributeObject;
};
/**
 * This method is used to add a hidden input to a host element that contains
 * a Shadow DOM. It does not add the input inside of the Shadow root which
 * allows it to be picked up inside of forms. It should contain the same
 * values as the host element.
 *
 * @param container The element where the input will be added
 * @param name The name of the input
 * @param value The value of the input
 * @param disabled If true, the input is disabled
 */
export const renderHiddenInput = (container, name, value, disabled) => {
  let input = container.querySelector('input.aux-input');
  if (!input) {
    input = container.ownerDocument.createElement('input');
    input.type = 'hidden';
    input.classList.add('aux-input');
    container.appendChild(input);
  }
  input.disabled = disabled;
  input.name = name;
  input.value = value || '';
};
export const addEventListener = (el, eventName, callback, opts) => {
  if (typeof window !== 'undefined') {
    const win = window;
    const config = win && win.Ionic && win.Ionic.config;
    if (config) {
      const ael = config.get('_ael');
      if (ael) {
        return ael(el, eventName, callback, opts);
      }
      else if (config._ael) {
        return config._ael(el, eventName, callback, opts);
      }
    }
  }
  return el.addEventListener(eventName, callback, opts);
};
export const removeEventListener = (el, eventName, callback, opts) => {
  if (typeof window !== 'undefined') {
    const win = window;
    const config = win && win.Ionic && win.Ionic.config;
    if (config) {
      const rel = config.get('_rel');
      if (rel) {
        return rel(el, eventName, callback, opts);
      }
      else if (config._rel) {
        return config._rel(el, eventName, callback, opts);
      }
    }
  }
  return el.removeEventListener(eventName, callback, opts);
};
export const debounceEvent = (event, wait) => {
  const original = event._original || event;
  return {
    _original: event,
    emit: debounce(original.emit.bind(original), wait),
  };
};
export const debounce = (func, wait = 0) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(func, wait, ...args);
  };
};
//# sourceMappingURL=helpers.js.map
