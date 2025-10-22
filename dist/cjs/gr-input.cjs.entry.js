/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2e762384.js');
const formControl = require('./form-control-8f3f59cd.js');
const slot = require('./slot-31942376.js');
const helpers = require('./helpers-637c6824.js');

const inputCss = ".form-control .form-control-label{display:none}.form-control .form-control-help-text{display:none}.form-control .form-control-invalid-text{display:none}.form-control-has-label .form-control-label{display:flex;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-label-color);margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-label.form-control-small .form-control-label{font-size:var(--gr-form-element-label-font-size-small)}.form-control-has-label.form-control-medium .form-control-label{font-size:var(--gr-form-element-label-font-size-medium)}.form-control-has-label.form-control-large .form-control-label{font-size:var(--gr-form-element-label-font-size-large)}.form-control-has-label .form-control-label .asterisk{margin-left:var(--gr-spacing-x-small);color:var(--gr-color-medium)}.form-control-has-label .form-control-label .asterisk svg{width:0.6em;height:0.6em;margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-help-text .form-control-help-text{display:block;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-help-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-help-text.form-control-small .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-small);min-height:1.625rem}.form-control-has-help-text.form-control-medium .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-medium);min-height:1.875rem}.form-control-has-help-text.form-control-large .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-large);min-height:2.125rem}.form-control-has-invalid-text .form-control-invalid-text{display:flex;margin-left:-2px;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-invalid-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon{margin-top:var(--gr-spacing-xxx-small);margin-right:var(--gr-spacing-xx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon svg{width:1.4em;height:1.4em}.form-control-has-invalid-text.form-control-small .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-small);min-height:1.625rem}.form-control-has-invalid-text.form-control-medium .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-medium);min-height:1.875rem}.form-control-has-invalid-text.form-control-large .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-large);min-height:2.125rem}.gr-scroll-lock{overflow:hidden !important}:host{--font-size:var(--gr-form-element-font-size-medium);--font-weight:var(--gr-font-weight-normal);--background-color:var(--gr-color-white);--background-color-hover:var(--gr-color-white);--background-color-focus:var(--gr-color-white);--background-color-invalid:var(--gr-color-white);--background-color-invalid-hover:var(--gr-color-white);--border-radius:var(--gr-form-element-border-radius-small);--border-color:var(--gr-color-light-shade);--border-color-hover:var(--gr-color-medium);--border-color-focus:var(--gr-color-primary);--border-color-invalid:var(--gr-color-danger);--border-color-invalid-hover:var(--gr-color-danger-shade);--color:var(--gr-color-dark-tint);--placeholder-color:var(--gr-color-medium-tint);--min-height:var(--gr-form-element-height-medium);--icon-color:var(--gr-color-medium);--icon-color-hover:var(--gr-color-dark);--padding-start:var(--gr-spacing-medium);--padding-end:var(--gr-spacing-medium);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33);--text-transform:none;display:block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.input-small{--font-size:var(--gr-form-element-font-size-small);--min-height:var(--gr-form-element-height-small);--padding-start:var(--gr-spacing-small);--padding-end:var(--gr-spacing-small)}.input-large{--font-size:var(--gr-form-element-font-size-large);--min-height:var(--gr-form-element-height-large);--padding-start:var(--gr-spacing-large);--padding-end:var(--gr-spacing-large)}.input{flex:1 1 auto;display:inline-flex;align-items:stretch;justify-content:start;position:relative;width:100%;height:var(--min-height);font-family:var(--gr-font-family);font-size:var(--font-size);font-weight:var(--font-weight);line-height:var(--gr-line-height-normal);letter-spacing:var(--gr-letter-spacing-normal);background-color:var(--background-color);border:solid 1px var(--border-color);border-radius:var(--border-radius);vertical-align:middle;overflow:hidden;transition:150ms color, 150ms border, 150ms box-shadow;cursor:text}.input.input-invalid:not(.input-disabled){background-color:var(--background-color-invalid);border-color:var(--border-color-invalid)}.input:hover.input-invalid:not(.input-disabled):not(.input-focused){background-color:var(--background-color-invalid-hover);border-color:var(--border-color-invalid-hover)}.input.input-invalid:not(.input-disabled){background-color:var(--background-color-invalid);border-color:var(--border-color-invalid)}.input:hover:not(.input-disabled){background-color:var(--background-color-hover);border-color:var(--border-color-hover)}.input.input-focused:not(.input-disabled){outline:none;box-shadow:var(--focus-ring);border-color:var(--border-color-focus);background-color:var(--background-color-focus)}.input.input-disabled{cursor:not-allowed;opacity:0.5;outline:none}.input-control{flex:1 1 auto;font-family:inherit;font-size:inherit;font-weight:inherit;min-width:0;height:100%;color:var(--color);text-transform:var(--text-transform);border:none;background:none;box-shadow:none;padding:0;margin:0;cursor:inherit;padding-top:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-bottom:0}.input-control::-webkit-search-decoration,.input-control::-webkit-search-cancel-button,.input-control::-webkit-search-results-button,.input-control::-webkit-search-results-decoration{-webkit-appearance:none}.input-control:-webkit-autofill,.input-control:-webkit-autofill:hover,.input-control:-webkit-autofill:focus,.input-control:-webkit-autofill:active{box-shadow:0 0 0 var(--min-height) var(--background-color-hover) inset !important;-webkit-text-fill-color:var(--gr-color-primary)}.input-control::placeholder{color:var(--placeholder-color);user-select:none}.input-control:focus{outline:none}.input-hide-appearance{appearance:none;-webkit-appearance:none;margin:0;-moz-appearance:textfield}.input-hide-appearance::-webkit-inner-spin-button,.input-hide-appearance::-webkit-outer-spin-button{appearance:none;-webkit-appearance:none;-moz-appearance:textfield}.input-pill{border-radius:var(--min-height)}.start{flex:0 0 auto;display:flex;align-items:center;cursor:default}.start ::slotted(*){margin-left:var(--padding-start);color:var(--icon-color)}.end{flex:0 0 auto;display:flex;align-items:center;cursor:default}.end ::slotted(*){margin-right:var(--padding-end);color:var(--icon-color)}.input-clear,.input-password-toggle{display:inline-flex;align-items:center;font-size:inherit;color:var(--icon-color);border:none;background:none;padding:0;transition:150ms color;cursor:pointer;margin-right:var(--padding-end)}.input-clear:hover,.input-password-toggle:hover{color:var(--icon-color-hover)}.input-clear:focus,.input-password-toggle:focus{outline:none}.input-clear svg,.input-password-toggle svg{width:1.2em;height:1.2em;font-size:var(--font-size)}::-ms-reveal{display:none}.input-empty .input-clear{visibility:hidden}";

let id = 0;
const Input = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.grChange = index.createEvent(this, "gr-change", 7);
    this.grClear = index.createEvent(this, "gr-clear", 7);
    this.grInput = index.createEvent(this, "gr-input", 7);
    this.grFocus = index.createEvent(this, "gr-focus", 7);
    this.grBlur = index.createEvent(this, "gr-blur", 7);
    this.inputId = `input-${++id}`;
    this.labelId = `input-label-${id}`;
    this.helpTextId = `input-help-text-${id}`;
    this.invalidTextId = `input-invalid-text-${id}`;
    this.inheritedAttributes = {};
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasInvalidTextSlot = false;
    this.hasLabelSlot = false;
    this.isPasswordVisible = false;
    this.value = '';
    this.type = 'text';
    this.pill = false;
    this.disabled = false;
    this.name = '';
    this.placeholder = '';
    this.size = 'medium';
    this.label = '';
    this.requiredIndicator = false;
    this.helpText = '';
    this.invalidText = '';
    this.invalid = false;
    this.clearable = false;
    this.inputmode = undefined;
    this.readonly = false;
    this.maxlength = undefined;
    this.spellcheck = false;
    this.min = undefined;
    this.max = undefined;
    this.step = undefined;
    this.pattern = undefined;
    this.enterkeyhint = undefined;
    this.autocapitalize = 'off';
    this.autocomplete = 'off';
    this.autocorrect = 'off';
    this.autofocus = false;
    this.debounce = 0;
    this.togglePassword = false;
    this.hideAppearance = true;
  }
  debounceChanged() {
    this.grChange = helpers.debounceEvent(this.grChange, this.debounce);
  }
  handleLabelChange() {
    this.handleSlotChange();
  }
  /**
   * Update the native input element when the value changes
   */
  valueChanged() {
    this.grChange.emit();
  }
  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handlePasswordToggle = this.handlePasswordToggle.bind(this);
    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
    this.debounceChanged();
  }
  componentWillLoad() {
    this.handleSlotChange();
    this.inheritedAttributes = helpers.inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
  }
  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  /** Sets focus on the input. */
  async setFocus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  async removeFocus() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  async select() {
    return this.input.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  async setSelectionRange(selectionStart, selectionEnd, selectionDirection = 'none') {
    return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  async setRangeText(replacement, start, end, selectMode = 'preserve') {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.grChange.emit();
      this.grInput.emit();
    }
  }
  handleChange() {
    this.value = this.input.value;
    this.grChange.emit();
  }
  handleInput() {
    this.value = this.input.value;
    this.grInput.emit();
  }
  handleBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }
  handleFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
  }
  handleClearClick(event) {
    this.value = '';
    this.grClear.emit();
    this.grInput.emit();
    this.grChange.emit();
    this.input.focus();
    event.stopPropagation();
  }
  handleLabelClick() {
    this.input.focus();
  }
  handleSlotChange() {
    this.hasHelpTextSlot = slot.hasSlot(this.el, 'help-text');
    this.hasLabelSlot = slot.hasSlot(this.el, 'label');
    this.hasInvalidTextSlot = slot.hasSlot(this.el, 'invalid-text');
  }
  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  render() {
    var _a;
    helpers.renderHiddenInput(this.el, this.name, this.value, this.disabled);
    return (index.h(formControl.FormControl, { inputId: this.inputId, label: this.label, labelId: this.labelId, hasLabelSlot: this.hasLabelSlot, helpTextId: this.helpTextId, helpText: this.helpText, hasHelpTextSlot: this.hasHelpTextSlot, invalidTextId: this.invalidTextId, invalidText: this.invalidText, invalid: this.invalid, hasInvalidTextSlot: this.hasInvalidTextSlot, size: this.size, onLabelClick: this.handleLabelClick, requiredIndicator: this.requiredIndicator }, index.h("div", { class: {
        'input': true,
        'input-pill': this.pill,
        'input-disabled': this.disabled,
        'input-invalid': this.invalid,
        'input-focused': this.hasFocus,
        'input-empty': ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) === 0,
        [`input-${this.size}`]: true,
      } }, index.h("span", { class: "start" }, index.h("slot", { name: "start" })), index.h("input", Object.assign({ ref: el => (this.input = el), id: this.name, name: this.name, type: this.type === 'password' && this.isPasswordVisible ? 'text' : this.type, placeholder: this.placeholder, disabled: this.disabled, readonly: this.readonly, autoCorrect: this.autocorrect, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, min: this.min, max: this.max, step: this.step, pattern: this.pattern, value: this.value, maxlength: this.maxlength, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, spellcheck: this.spellcheck, "aria-labelledby": this.labelId, "aria-describedby": this.invalid ? this.invalidTextId : this.helpTextId, "aria-invalid": this.invalid ? 'true' : 'false', "aria-required": this.requiredIndicator ? 'true' : 'false', onChange: this.handleChange, onInput: this.handleInput, onBlur: this.handleBlur, onFocus: this.handleFocus, class: { 'input-control': true, 'input-hide-appearance': this.hideAppearance } }, this.inheritedAttributes)), this.clearable && (index.h("button", { class: "input-clear", type: "button", onClick: this.handleClearClick, tabindex: "-1" }, index.h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, index.h("title", null, "Close Circle"), index.h("path", { d: "M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }), index.h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M320 320L192 192M192 320l128-128" })))), this.togglePassword && (index.h("button", { class: "input-password-toggle", type: "button", onClick: this.handlePasswordToggle, tabindex: "-1" }, this.isPasswordVisible ? (index.h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512", fill: "currentColor" }, index.h("title", null, "Eye Off"), index.h("path", { d: "M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z" }), index.h("path", { d: "M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z" }))) : (index.h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, index.h("title", null, "Eye"), index.h("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }), index.h("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }))))), index.h("span", { class: "end" }, index.h("slot", { name: "end" })))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "debounce": ["debounceChanged"],
    "helpText": ["handleLabelChange"],
    "invalidText": ["handleLabelChange"],
    "label": ["handleLabelChange"],
    "value": ["valueChanged"]
  }; }
};
Input.style = inputCss;

exports.gr_input = Input;

//# sourceMappingURL=gr-input.cjs.entry.js.map