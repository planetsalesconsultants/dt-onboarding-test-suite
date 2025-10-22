/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { debounceEvent, inheritAttributes, renderHiddenInput } from '../../utils/helpers';
import { hasSlot } from '../../utils/slot';
let id = 0;
/**
 * @slot label - The textarea's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the textarea.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
export class Textarea {
  constructor() {
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
    this.grChange = debounceEvent(this.grChange, this.debounce);
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
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
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
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
  }
  render() {
    var _a;
    renderHiddenInput(this.el, this.name, this.value, this.disabled);
    return (h(FormControl, { inputId: this.inputId, label: this.label, labelId: this.labelId, hasLabelSlot: this.hasLabelSlot, helpTextId: this.helpTextId, helpText: this.helpText, hasHelpTextSlot: this.hasHelpTextSlot, invalidTextId: this.invalidTextId, invalidText: this.invalidText, invalid: this.invalid, hasInvalidTextSlot: this.hasInvalidTextSlot, size: this.size, onLabelClick: this.handleLabelClick, requiredIndicator: this.requiredIndicator }, h("div", { class: {
        'textarea': true,
        [`textarea-${this.size}`]: true,
        'textarea-disabled': this.disabled,
        'textarea-invalid': this.invalid,
        'textarea-focused': this.hasFocus,
        'textarea-empty': ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) === 0,
        [`textarea-resize-${this.resize}`]: true,
      } }, h("textarea", Object.assign({ ref: el => (this.textarea = el), id: this.inputId, class: "textarea-control", name: this.name, placeholder: this.placeholder, disabled: this.disabled, readOnly: this.readonly, rows: this.rows, maxlength: this.maxlength, autoCapitalize: this.autocapitalize, autoCorrect: this.autocorrect, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, value: this.value, spellcheck: this.spellcheck, "aria-labelledby": this.labelId, "aria-describedby": this.invalid ? this.invalidTextId : this.helpTextId, "aria-invalid": this.invalid ? 'true' : 'false', "aria-required": this.requiredIndicator ? 'true' : 'false', onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur }, this.inheritedAttributes)))));
  }
  static get is() { return "gr-textarea"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["textarea.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["textarea.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "The textarea's size."
        },
        "attribute": "size",
        "reflect": true,
        "defaultValue": "'medium'"
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
          "text": "The textarea's name attribute."
        },
        "attribute": "name",
        "reflect": true,
        "defaultValue": "''"
      },
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
          "text": "The textarea's value attribute."
        },
        "attribute": "value",
        "reflect": true,
        "defaultValue": "''"
      },
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | undefined",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The textarea's label. Alternatively, you can use the label slot."
        },
        "attribute": "label",
        "reflect": false
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
          "text": "The textarea's help text. Alternatively, you can use the help-text slot."
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
          "text": "The textarea's placeholder text."
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "rows": {
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
          "text": "The number of rows to display by default."
        },
        "attribute": "rows",
        "reflect": false,
        "defaultValue": "4"
      },
      "maxHeight": {
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
          "text": "The number of max rows"
        },
        "attribute": "max-height",
        "reflect": false
      },
      "resize": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'none' | 'vertical' | 'auto'",
          "resolved": "\"auto\" | \"none\" | \"vertical\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Controls how the textarea can be resized."
        },
        "attribute": "resize",
        "reflect": false,
        "defaultValue": "'vertical'"
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
          "text": "Set to true to disable the textarea."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "The textarea's inputmode attribute."
        },
        "attribute": "inputmode",
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
      }
    };
  }
  static get states() {
    return {
      "hasFocus": {},
      "hasHelpTextSlot": {},
      "hasInvalidTextSlot": {},
      "hasLabelSlot": {}
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
          "text": "Emitted when the textarea's value changes."
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
          "text": "Emitted when the textarea receives input."
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
          "text": "Emitted when the textarea has focus."
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
          "text": "Emitted when the textarea loses focus."
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
          "text": "Sets focus on the textarea.",
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
          "text": "Removes focus fromt the textarea.",
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
      },
      "setTextareaHeight": {
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
          "text": "",
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
        "propName": "value",
        "methodName": "valueChanged"
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
        "propName": "rows",
        "methodName": "handleRowsChange"
      }];
  }
}
//# sourceMappingURL=textarea.js.map
