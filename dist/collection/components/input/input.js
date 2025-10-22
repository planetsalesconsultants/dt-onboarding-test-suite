/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { hasSlot } from '../../utils/slot';
import { debounceEvent, inheritAttributes, renderHiddenInput } from '../../utils/helpers';
let id = 0;
/**
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 * @slot start - Used to prepend an icon or similar element to the input.
 * @slot end - Used to append an icon or similar element to the input.
 */
export class Input {
  constructor() {
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
    this.grChange = debounceEvent(this.grChange, this.debounce);
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
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
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
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
  }
  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  render() {
    var _a;
    renderHiddenInput(this.el, this.name, this.value, this.disabled);
    return (h(FormControl, { inputId: this.inputId, label: this.label, labelId: this.labelId, hasLabelSlot: this.hasLabelSlot, helpTextId: this.helpTextId, helpText: this.helpText, hasHelpTextSlot: this.hasHelpTextSlot, invalidTextId: this.invalidTextId, invalidText: this.invalidText, invalid: this.invalid, hasInvalidTextSlot: this.hasInvalidTextSlot, size: this.size, onLabelClick: this.handleLabelClick, requiredIndicator: this.requiredIndicator }, h("div", { class: {
        'input': true,
        'input-pill': this.pill,
        'input-disabled': this.disabled,
        'input-invalid': this.invalid,
        'input-focused': this.hasFocus,
        'input-empty': ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) === 0,
        [`input-${this.size}`]: true,
      } }, h("span", { class: "start" }, h("slot", { name: "start" })), h("input", Object.assign({ ref: el => (this.input = el), id: this.name, name: this.name, type: this.type === 'password' && this.isPasswordVisible ? 'text' : this.type, placeholder: this.placeholder, disabled: this.disabled, readonly: this.readonly, autoCorrect: this.autocorrect, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, min: this.min, max: this.max, step: this.step, pattern: this.pattern, value: this.value, maxlength: this.maxlength, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, spellcheck: this.spellcheck, "aria-labelledby": this.labelId, "aria-describedby": this.invalid ? this.invalidTextId : this.helpTextId, "aria-invalid": this.invalid ? 'true' : 'false', "aria-required": this.requiredIndicator ? 'true' : 'false', onChange: this.handleChange, onInput: this.handleInput, onBlur: this.handleBlur, onFocus: this.handleFocus, class: { 'input-control': true, 'input-hide-appearance': this.hideAppearance } }, this.inheritedAttributes)), this.clearable && (h("button", { class: "input-clear", type: "button", onClick: this.handleClearClick, tabindex: "-1" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Close Circle"), h("path", { d: "M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M320 320L192 192M192 320l128-128" })))), this.togglePassword && (h("button", { class: "input-password-toggle", type: "button", onClick: this.handlePasswordToggle, tabindex: "-1" }, this.isPasswordVisible ? (h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512", fill: "currentColor" }, h("title", null, "Eye Off"), h("path", { d: "M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z" }), h("path", { d: "M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z" }))) : (h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Eye"), h("path", { d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32" }), h("circle", { cx: "256", cy: "256", r: "80", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }))))), h("span", { class: "end" }, h("slot", { name: "end" })))));
  }
  static get is() { return "gr-input"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["input.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["input.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The input's value attribute."
        },
        "attribute": "value",
        "reflect": true,
        "defaultValue": "''"
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TextFieldTypes",
          "resolved": "\"date\" | \"datetime-local\" | \"email\" | \"month\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"time\" | \"url\" | \"week\"",
          "references": {
            "TextFieldTypes": {
              "location": "import",
              "path": "../../interface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The type of control to display. The default type is text."
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'text'"
      },
      "pill": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set to true to draw a pill-style input with rounded edges."
        },
        "attribute": "pill",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set to true to disable the input control."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The input's name."
        },
        "attribute": "name",
        "reflect": true,
        "defaultValue": "''"
      },
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The input's placeholder text."
        },
        "attribute": "placeholder",
        "reflect": false,
        "defaultValue": "''"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'small' | 'medium' | 'large'",
          "resolved": "\"large\" | \"medium\" | \"small\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The input's size."
        },
        "attribute": "size",
        "reflect": true,
        "defaultValue": "'medium'"
      },
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The inputs's label. Alternatively, you can use the label slot."
        },
        "attribute": "label",
        "reflect": false,
        "defaultValue": "''"
      },
      "requiredIndicator": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set to true to display a required indicator, adds an asterisk to label"
        },
        "attribute": "required-indicator",
        "reflect": false,
        "defaultValue": "false"
      },
      "helpText": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The input's help text. Alternatively, you can use the help-text slot."
        },
        "attribute": "help-text",
        "reflect": false,
        "defaultValue": "''"
      },
      "invalidText": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The input's invalid text. Alternatively, you can use the invalid-text slot."
        },
        "attribute": "invalid-text",
        "reflect": false,
        "defaultValue": "''"
      },
      "invalid": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set to true to indicate this field is invalid. Will display the invalid text instead of the help text"
        },
        "attribute": "invalid",
        "reflect": true,
        "defaultValue": "false"
      },
      "clearable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set to true to add a clear button when the input is populated."
        },
        "attribute": "clearable",
        "reflect": false,
        "defaultValue": "false"
      },
      "inputmode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'",
          "resolved": "\"decimal\" | \"email\" | \"none\" | \"numeric\" | \"search\" | \"tel\" | \"text\" | \"url\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The input's inputmode attribute."
        },
        "attribute": "inputmode",
        "reflect": false
      },
      "readonly": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the user cannot modify the value."
        },
        "attribute": "readonly",
        "reflect": true,
        "defaultValue": "false"
      },
      "maxlength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies how many characters are allowed."
        },
        "attribute": "maxlength",
        "reflect": false
      },
      "spellcheck": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the element will have its spelling and grammar checked."
        },
        "attribute": "spellcheck",
        "reflect": false,
        "defaultValue": "false"
      },
      "min": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The minimum value, which must not be greater than its maximum (max attribute) value."
        },
        "attribute": "min",
        "reflect": false
      },
      "max": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The maximum value, which must not be less than its minimum (min attribute) value."
        },
        "attribute": "max",
        "reflect": false
      },
      "step": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Works with the min and max attributes to limit the increments at which a value can be set.\nPossible values are: `\"any\"` or a positive floating point number."
        },
        "attribute": "step",
        "reflect": false
      },
      "pattern": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Specifies a regular expression that the input value is checked against."
        },
        "attribute": "pattern",
        "reflect": false
      },
      "enterkeyhint": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'",
          "resolved": "\"done\" | \"enter\" | \"go\" | \"next\" | \"previous\" | \"search\" | \"send\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "A hint to the browser for which enter key to display.\nPossible values: `\"enter\"`, `\"done\"`, `\"go\"`, `\"next\"`,\n`\"previous\"`, `\"search\"`, and `\"send\"`."
        },
        "attribute": "enterkeyhint",
        "reflect": false
      },
      "autocapitalize": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.\nAvailable options: `\"off\"`, `\"none\"`, `\"on\"`, `\"sentences\"`, `\"words\"`, `\"characters\"`."
        },
        "attribute": "autocapitalize",
        "reflect": false,
        "defaultValue": "'off'"
      },
      "autocomplete": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AutocompleteTypes",
          "resolved": "\"name\" | \"on\" | \"off\" | \"honorific-prefix\" | \"given-name\" | \"additional-name\" | \"family-name\" | \"honorific-suffix\" | \"nickname\" | \"email\" | \"username\" | \"new-password\" | \"current-password\" | \"one-time-code\" | \"organization-title\" | \"organization\" | \"street-address\" | \"address-line1\" | \"address-line2\" | \"address-line3\" | \"address-level4\" | \"address-level3\" | \"address-level2\" | \"address-level1\" | \"country\" | \"country-name\" | \"postal-code\" | \"cc-name\" | \"cc-given-name\" | \"cc-additional-name\" | \"cc-family-name\" | \"cc-number\" | \"cc-exp\" | \"cc-exp-month\" | \"cc-exp-year\" | \"cc-csc\" | \"cc-type\" | \"transaction-currency\" | \"transaction-amount\" | \"language\" | \"bday\" | \"bday-day\" | \"bday-month\" | \"bday-year\" | \"sex\" | \"tel\" | \"tel-country-code\" | \"tel-national\" | \"tel-area-code\" | \"tel-local\" | \"tel-extension\" | \"impp\" | \"url\" | \"photo\"",
          "references": {
            "AutocompleteTypes": {
              "location": "import",
              "path": "../../interface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates whether the value of the control can be automatically completed by the browser."
        },
        "attribute": "autocomplete",
        "reflect": false,
        "defaultValue": "'off'"
      },
      "autocorrect": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'on' | 'off'",
          "resolved": "\"off\" | \"on\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether auto correction should be enabled when the user is entering/editing the text value."
        },
        "attribute": "autocorrect",
        "reflect": false,
        "defaultValue": "'off'"
      },
      "autofocus": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "This Boolean attribute lets you specify that a form control should have input focus when the page loads."
        },
        "attribute": "autofocus",
        "reflect": false,
        "defaultValue": "false"
      },
      "debounce": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set the amount of time, in milliseconds, to wait to trigger the `gr-change` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`."
        },
        "attribute": "debounce",
        "reflect": false,
        "defaultValue": "0"
      },
      "togglePassword": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set to true to add a password toggle button for password inputs."
        },
        "attribute": "toggle-password",
        "reflect": false,
        "defaultValue": "false"
      },
      "hideAppearance": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set to true to hide input appearances."
        },
        "attribute": "hide-appearance",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "hasFocus": {},
      "hasHelpTextSlot": {},
      "hasInvalidTextSlot": {},
      "hasLabelSlot": {},
      "isPasswordVisible": {}
    };
  }
  static get events() {
    return [{
        "method": "grChange",
        "name": "gr-change",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the control's value changes."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "grClear",
        "name": "gr-clear",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the clear button is activated."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "grInput",
        "name": "gr-input",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the control receives input."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "grFocus",
        "name": "gr-focus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the control gains focus."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "grBlur",
        "name": "gr-blur",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the control loses focus."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "(options?: FocusOptions) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "FocusOptions": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Sets focus on the input.",
          "tags": []
        }
      },
      "removeFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Removes focus from the input.",
          "tags": []
        }
      },
      "select": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Selects all the text in the input.",
          "tags": []
        }
      },
      "setSelectionRange": {
        "complexType": {
          "signature": "(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none') => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Sets the start and end positions of the text selection (0-based).",
          "tags": []
        }
      },
      "setRangeText": {
        "complexType": {
          "signature": "(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve') => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Replaces a range of text with a new string.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "debounce",
        "methodName": "debounceChanged"
      }, {
        "propName": "helpText",
        "methodName": "handleLabelChange"
      }, {
        "propName": "invalidText",
        "methodName": "handleLabelChange"
      }, {
        "propName": "label",
        "methodName": "handleLabelChange"
      }, {
        "propName": "value",
        "methodName": "valueChanged"
      }];
  }
}
//# sourceMappingURL=input.js.map
