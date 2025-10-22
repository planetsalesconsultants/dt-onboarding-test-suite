/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2e762384.js');
const formControl = require('./form-control-8f3f59cd.js');
const helpers = require('./helpers-637c6824.js');
const slot = require('./slot-31942376.js');

const textareaCss = ".form-control .form-control-label{display:none}.form-control .form-control-help-text{display:none}.form-control .form-control-invalid-text{display:none}.form-control-has-label .form-control-label{display:flex;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-label-color);margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-label.form-control-small .form-control-label{font-size:var(--gr-form-element-label-font-size-small)}.form-control-has-label.form-control-medium .form-control-label{font-size:var(--gr-form-element-label-font-size-medium)}.form-control-has-label.form-control-large .form-control-label{font-size:var(--gr-form-element-label-font-size-large)}.form-control-has-label .form-control-label .asterisk{margin-left:var(--gr-spacing-x-small);color:var(--gr-color-medium)}.form-control-has-label .form-control-label .asterisk svg{width:0.6em;height:0.6em;margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-help-text .form-control-help-text{display:block;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-help-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-help-text.form-control-small .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-small);min-height:1.625rem}.form-control-has-help-text.form-control-medium .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-medium);min-height:1.875rem}.form-control-has-help-text.form-control-large .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-large);min-height:2.125rem}.form-control-has-invalid-text .form-control-invalid-text{display:flex;margin-left:-2px;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-invalid-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon{margin-top:var(--gr-spacing-xxx-small);margin-right:var(--gr-spacing-xx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon svg{width:1.4em;height:1.4em}.form-control-has-invalid-text.form-control-small .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-small);min-height:1.625rem}.form-control-has-invalid-text.form-control-medium .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-medium);min-height:1.875rem}.form-control-has-invalid-text.form-control-large .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-large);min-height:2.125rem}.gr-scroll-lock{overflow:hidden !important}:host{--font-size:var(--gr-form-element-font-size-medium);--font-weight:var(--gr-font-weight-normal);--background-color:var(--gr-color-white);--background-color-hover:var(--gr-color-white);--background-color-focus:var(--gr-color-white);--background-color-invalid:var(--gr-color-white);--background-color-invalid-hover:var(--gr-color-white);--border-radius:var(--gr-form-element-border-radius-small);--border-color:var(--gr-color-light-shade);--border-color-hover:var(--gr-color-medium);--border-color-focus:var(--gr-color-primary);--border-color-invalid:var(--gr-color-danger);--border-color-invalid-hover:var(--gr-color-danger-shade);--color:var(--gr-color-dark-tint);--placeholder-color:var(--gr-color-medium-tint);--min-height:var(--gr-form-element-height-medium);--padding-start:var(--gr-spacing-medium);--padding-end:var(--gr-spacing-medium);--padding-top:var(--gr-spacing-x-small);--padding-bottom:var(--gr-spacing-x-small);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33);display:block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.textarea-small{--font-size:var(--gr-form-element-font-size-small);--min-height:var(--gr-form-element-height-small);--padding-start:var(--gr-spacing-small);--padding-end:var(--gr-spacing-small)}.textarea-large{--font-size:var(--gr-form-element-font-size-large);--min-height:var(--gr-form-element-height-large);--padding-start:var(--gr-spacing-large);--padding-end:var(--gr-spacing-large)}.textarea{display:flex;align-items:center;position:relative;width:100%;font-family:var(--gr-font-family);font-size:var(--font-size);font-weight:var(--font-weight);line-height:var(--gr-line-height-normal);letter-spacing:var(--gr-letter-spacing-normal);background-color:var(--background-color);border:solid 1px var(--border-color);border-radius:var(--border-radius);vertical-align:middle;transition:150ms color, 150ms border, 150ms box-shadow;cursor:text}.textarea.textarea-invalid:not(.textarea-disabled){background-color:var(--background-color-invalid);border-color:var(--border-color-invalid)}.textarea:hover.textarea-invalid:not(.textarea-disabled):not(.textarea-focused){background-color:var(--background-color-invalid-hover);border-color:var(--border-color-invalid-hover)}.textarea.textarea-invalid:not(.textarea-disabled){background-color:var(--background-color-invalid);border-color:var(--border-color-invalid)}.textarea:hover:not(.textarea-disabled){background-color:var(--background-color-hover);border-color:var(--border-color-hover)}.textarea.textarea-focused:not(.textarea-disabled){outline:none;box-shadow:var(--focus-ring);border-color:var(--border-color-focus);background-color:var(--background-color-focus)}.textarea.textarea-disabled{opacity:0.5;cursor:not-allowed;outline:none}.textarea-control{flex:1 1 auto;font-family:inherit;font-size:inherit;font-weight:inherit;line-height:1.4;color:var(--gr-color-dark-tint);border:none;background:none;box-shadow:none;cursor:inherit;-webkit-appearance:none;padding-top:var(--padding-top);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-bottom:var(--padding-bottom)}.textarea-control::-webkit-search-decoration,.textarea-control::-webkit-search-cancel-button,.textarea-control::-webkit-search-results-button,.textarea-control::-webkit-search-results-decoration{-webkit-appearance:none}.textarea-control::placeholder{color:var(--gr-color-medium-tint);user-select:none}.textarea-control:focus{outline:none}.textarea-resize-none .textarea-control{resize:none}.textarea-resize-vertical .textarea-control{resize:vertical}.textarea-resize-auto .textarea-control{height:auto;resize:none}";

let id = 0;
const Textarea = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.grChange = index.createEvent(this, "gr-change", 7);
    this.grInput = index.createEvent(this, "gr-input", 7);
    this.grFocus = index.createEvent(this, "gr-focus", 7);
    this.grBlur = index.createEvent(this, "gr-blur", 7);
    this.inputId = `textarea-${++id}`;
    this.labelId = `textarea-label-${id}`;
    this.helpTextId = `textarea-help-text-${id}`;
    this.invalidTextId = `textarea-invalid-text-${id}`;
    this.inheritedAttributes = {};
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasInvalidTextSlot = false;
    this.hasLabelSlot = false;
    this.size = 'medium';
    this.name = '';
    this.value = '';
    this.label = undefined;
    this.requiredIndicator = false;
    this.helpText = '';
    this.invalidText = '';
    this.invalid = false;
    this.placeholder = undefined;
    this.rows = 4;
    this.maxHeight = undefined;
    this.resize = 'vertical';
    this.disabled = false;
    this.readonly = false;
    this.maxlength = undefined;
    this.inputmode = undefined;
    this.spellcheck = false;
    this.enterkeyhint = undefined;
    this.autocapitalize = 'off';
    this.autocorrect = 'off';
    this.autofocus = false;
    this.debounce = 0;
  }
  debounceChanged() {
    this.grChange = helpers.debounceEvent(this.grChange, this.debounce);
  }
  /**
   * Update the native input element when the value changes
   */
  valueChanged() {
    const nativeInput = this.textarea;
    const value = this.value;
    if (nativeInput && nativeInput.value !== value) {
      nativeInput.value = value;
    }
    this.grChange.emit();
  }
  handleLabelChange() {
    this.handleSlotChange();
  }
  handleRowsChange() {
    this.setTextareaHeight();
  }
  connectedCallback() {
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
    this.debounceChanged();
  }
  componentWillLoad() {
    this.inheritedAttributes = helpers.inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
  }
  /** Sets focus on the textarea. */
  async setFocus(options) {
    this.textarea.focus(options);
  }
  /** Removes focus fromt the textarea. */
  async removeFocus() {
    this.textarea.blur();
  }
  /** Selects all the text in the input. */
  async select() {
    return this.textarea.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  async setSelectionRange(selectionStart, selectionEnd, selectionDirection = 'none') {
    return this.textarea.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  async setRangeText(replacement, start, end, selectMode = 'preserve') {
    this.textarea.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.textarea.value) {
      this.value = this.textarea.value;
      this.setTextareaHeight();
      this.grChange.emit();
      this.grInput.emit();
    }
  }
  async setTextareaHeight() {
    console.log('ok');
    if (this.resize === 'auto') {
      this.textarea.style.height = 'auto';
      this.textarea.style.height = this.textarea.scrollHeight + 'px';
    }
    else {
      this.textarea.style.height = undefined;
    }
  }
  handleChange() {
    this.grChange.emit();
  }
  handleInput() {
    this.value = this.textarea.value;
    this.setTextareaHeight();
    this.grInput.emit();
  }
  handleBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }
  handleFocus() {
    this.textarea.style.maxHeight = this.maxHeight + 'px';
    this.hasFocus = true;
    this.grFocus.emit();
  }
  handleLabelClick() {
    this.textarea.focus();
  }
  handleSlotChange() {
    this.hasLabelSlot = slot.hasSlot(this.el, 'label');
    this.hasHelpTextSlot = slot.hasSlot(this.el, 'help-text');
    this.hasInvalidTextSlot = slot.hasSlot(this.el, 'invalid-text');
  }
  render() {
    var _a;
    helpers.renderHiddenInput(this.el, this.name, this.value, this.disabled);
    return (index.h(formControl.FormControl, { inputId: this.inputId, label: this.label, labelId: this.labelId, hasLabelSlot: this.hasLabelSlot, helpTextId: this.helpTextId, helpText: this.helpText, hasHelpTextSlot: this.hasHelpTextSlot, invalidTextId: this.invalidTextId, invalidText: this.invalidText, invalid: this.invalid, hasInvalidTextSlot: this.hasInvalidTextSlot, size: this.size, onLabelClick: this.handleLabelClick, requiredIndicator: this.requiredIndicator }, index.h("div", { class: {
        'textarea': true,
        [`textarea-${this.size}`]: true,
        'textarea-disabled': this.disabled,
        'textarea-invalid': this.invalid,
        'textarea-focused': this.hasFocus,
        'textarea-empty': ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) === 0,
        [`textarea-resize-${this.resize}`]: true,
      } }, index.h("textarea", Object.assign({ ref: el => (this.textarea = el), id: this.inputId, class: "textarea-control", name: this.name, placeholder: this.placeholder, disabled: this.disabled, readOnly: this.readonly, rows: this.rows, maxlength: this.maxlength, autoCapitalize: this.autocapitalize, autoCorrect: this.autocorrect, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, value: this.value, spellcheck: this.spellcheck, "aria-labelledby": this.labelId, "aria-describedby": this.invalid ? this.invalidTextId : this.helpTextId, "aria-invalid": this.invalid ? 'true' : 'false', "aria-required": this.requiredIndicator ? 'true' : 'false', onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur }, this.inheritedAttributes)))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "debounce": ["debounceChanged"],
    "value": ["valueChanged"],
    "helpText": ["handleLabelChange"],
    "invalidText": ["handleLabelChange"],
    "label": ["handleLabelChange"],
    "rows": ["handleRowsChange"]
  }; }
};
Textarea.style = textareaCss;

exports.gr_textarea = Textarea;

//# sourceMappingURL=gr-textarea.cjs.entry.js.map