/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { Host, h } from '@stencil/core';
import { addEventListener, inheritAttributes, removeEventListener } from '../../utils/helpers';
let id = 0;
/**
 * @slot - The radio's label.
 */
export class Radio {
  constructor() {
    this.inputId = `radio-${++id}`;
    this.labelId = `radio-label-${id}`;
    this.radioGroup = null;
    this.inheritedAttributes = {};
    this.updateState = () => {
      if (this.radioGroup) {
        this.checked = this.radioGroup.value === this.value;
      }
    };
    this.hasFocus = false;
    this.value = undefined;
    this.disabled = false;
    this.checked = false;
    this.alignment = 'center';
    this.buttonTabindex = -1;
  }
  /** @internal */
  async setButtonTabindex(value) {
    this.buttonTabindex = value;
  }
  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    if (this.value === undefined) {
      this.value = this.inputId;
    }
    const radioGroup = (this.radioGroup = this.el.closest('gr-radio-group'));
    if (radioGroup) {
      this.updateState();
      addEventListener(radioGroup, 'gr-change', this.updateState);
      // Needed for the Vue wrappers
      addEventListener(radioGroup, 'v-gr-change', this.updateState);
    }
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }
  disconnectedCallback() {
    const radioGroup = this.radioGroup;
    if (radioGroup) {
      removeEventListener(radioGroup, 'gr-change', this.updateState);
      // Needed for the Vue wrappers
      removeEventListener(radioGroup, 'v-gr-change', this.updateState);
      this.radioGroup = null;
    }
  }
  /** Sets focus on the radio. */
  async setFocus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the radio. */
  async removeFocus() {
    this.input.blur();
  }
  handleBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }
  handleFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
  }
  render() {
    const ariaLabelAttributes = this.inheritedAttributes['aria-label']
      ? { 'aria-label': this.inheritedAttributes['aria-label'] }
      : { 'aria-labelledby': this.labelId };
    return (h(Host, Object.assign({ class: {
        'radio-disabled': this.disabled,
      }, tabindex: this.buttonTabindex, role: "radio", onBlur: this.handleBlur, onFocus: this.handleFocus, "aria-checked": `${this.checked}`, "aria-hidden": this.disabled ? 'true' : null }, ariaLabelAttributes), h("label", { class: {
        'radio': true,
        'radio-checked': this.checked,
        'radio-disabled': this.disabled,
        'radio-focused': this.hasFocus,
        [`radio-${this.alignment}`]: true,
      }, htmlFor: this.inputId }, h("span", { class: "radio-control" }, h("span", { class: "radio-icon" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, h("g", { fill: "currentColor" }, h("circle", { cx: "8", cy: "8", r: "3.42857143" }))))), h("input", { ref: el => (this.input = el), id: this.inputId, type: "radio", value: this.value, checked: this.checked, disabled: this.disabled, tabindex: "-1" })), h("span", { id: this.labelId, class: "radio-label" }, h("slot", null)))));
  }
  static get is() { return "gr-radio"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["radio.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["radio.css"]
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
          "text": "The radio's value attribute."
        },
        "attribute": "value",
        "reflect": true
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
          "text": "Set to true to disable the radio."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "checked": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set to true to draw the radio in a checked state."
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
      },
      "alignment": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'top' | 'center' | 'bottom'",
          "resolved": "\"bottom\" | \"center\" | \"top\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The radio's alignment attribute."
        },
        "attribute": "alignment",
        "reflect": true,
        "defaultValue": "'center'"
      }
    };
  }
  static get states() {
    return {
      "hasFocus": {},
      "buttonTabindex": {}
    };
  }
  static get events() {
    return [{
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
          "original": "any",
          "resolved": "any",
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
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "setButtonTabindex": {
        "complexType": {
          "signature": "(value: number) => Promise<void>",
          "parameters": [{
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
          "text": "",
          "tags": [{
              "name": "internal",
              "text": undefined
            }]
        }
      },
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
          "text": "Sets focus on the radio.",
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
          "text": "Removes focus from the radio.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=radio.js.map
