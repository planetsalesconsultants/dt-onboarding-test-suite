/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { Host, h } from '@stencil/core';
import { inheritAttributes, renderHiddenInput } from '../../utils/helpers';
import { hasSlot } from '../../utils/slot';
let id = 0;
/**
 * @slot - The checkboxes label.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
export class Checkbox {
  constructor() {
    this.inputId = `checkbox-${++id}`;
    this.labelId = `checkbox-label-${id}`;
    this.invalidTextId = `checkbox-invalid-text-${id}`;
    this.inheritedAttributes = {};
    this.hasInvalidTextSlot = false;
    this.hasFocus = false;
    this.value = undefined;
    this.disabled = false;
    this.name = this.inputId;
    this.checked = false;
    this.indeterminate = false;
    this.invalidText = '';
    this.invalid = false;
    this.alignment = 'center';
  }
  handleCheckedChange() {
    this.input.checked = this.checked;
    this.input.indeterminate = this.indeterminate;
    this.grChange.emit();
  }
  handleInvalidTextChange() {
    this.handleSlotChange();
  }
  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }
  componentWillLoad() {
    this.handleSlotChange();
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }
  componentDidLoad() {
    this.input.indeterminate = this.indeterminate;
  }
  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  /** Sets focus on the checkbox. */
  async setFocus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the checkbox. */
  async removeFocus() {
    this.input.blur();
  }
  handleClick() {
    this.checked = this.input.checked;
    this.indeterminate = false;
  }
  handleBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }
  handleFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
  }
  handleMouseDown(event) {
    // Prevent clicks on the label from briefly blurring the input
    event.preventDefault();
    this.input.focus();
  }
  handleSlotChange() {
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
  }
  render() {
    renderHiddenInput(this.el, this.name, this.checked ? this.value : '', this.disabled);
    const hasInvalidText = this.invalidText ? true : this.hasInvalidTextSlot;
    const showInvalidText = this.invalid ? true : false;
    const ariaLabelAttributes = this.inheritedAttributes['aria-label']
      ? { 'aria-label': this.inheritedAttributes['aria-label'] }
      : { 'aria-labelledby': this.labelId };
    return (h(Host, { class: {
        'checkbox-disabled': this.disabled,
        'checkbox-has-invalid-text': hasInvalidText,
      } }, h("label", { class: {
        'checkbox': true,
        'checkbox-checked': this.checked,
        'checkbox-invalid': this.invalid,
        'checkbox-disabled': this.disabled,
        'checkbox-focused': this.hasFocus,
        'checkbox-indeterminate': this.indeterminate,
        [`checkbox-${this.alignment}`]: true,
      }, htmlFor: this.inputId, onMouseDown: this.handleMouseDown }, h("span", { class: "checkbox-control" }, this.checked && (h("span", { class: "checkbox-icon" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, h("g", { stroke: "currentColor", "stroke-width": "2" }, h("g", { transform: "translate(3.428571, 3.428571)" }, h("path", { d: "M0,5.71428571 L3.42857143,9.14285714" }), h("path", { d: "M9.14285714,0 L3.42857143,9.14285714" }))))))), !this.checked && this.indeterminate && (h("span", { class: "checkbox-icon" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, h("g", { stroke: "currentColor", "stroke-width": "2" }, h("g", { transform: "translate(2.285714, 6.857143)" }, h("path", { d: "M10.2857143,1.14285714 L1.14285714,1.14285714" }))))))), h("input", Object.assign({ ref: el => (this.input = el), id: this.inputId, type: "checkbox", value: this.value, checked: this.checked, disabled: this.disabled, role: "checkbox", "aria-invalid": this.invalid, "aria-checked": this.checked ? 'true' : 'false' }, ariaLabelAttributes, { "aria-describedby": this.invalid ? this.invalidTextId : '', onClick: this.handleClick, onBlur: this.handleBlur, onFocus: this.handleFocus }))), h("span", { id: this.labelId, class: "checkbox-label" }, h("slot", null))), showInvalidText && (h("div", { id: this.invalidTextId, class: "checkbox-invalid-text", "aria-hidden": hasInvalidText ? 'false' : 'true' }, h("div", { class: "icon" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Alert Circle"), h("path", { d: "M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm0,319.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Zm21.72-201.15-5.74,122a16,16,0,0,1-32,0l-5.74-121.94v-.05a21.74,21.74,0,1,1,43.44,0Z", fill: "currentColor" }))), h("div", { class: "text" }, h("slot", { name: "invalid-text" }, this.invalidText))))));
  }
  static get is() { return "gr-checkbox"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["checkbox.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["checkbox.css"]
    };
  }
  static get properties() {
    return {
      "value": {
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
          "text": "The checkbox's value attribute."
        },
        "attribute": "value",
        "reflect": false
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
          "text": "Set to true to disable the checkbox."
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
          "text": "The name of the control, which is submitted with the form data."
        },
        "attribute": "name",
        "reflect": false,
        "defaultValue": "this.inputId"
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
          "text": "Set to true to draw the checkbox in a checked state."
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
      },
      "indeterminate": {
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
          "text": "Set to true to draw the checkbox in an indeterminate state."
        },
        "attribute": "indeterminate",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "The radio group's invalid text. Alternatively, you can use the invalid-text slot."
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
          "text": "Set to true to indicate this field is invalid. Will display the invalid text."
        },
        "attribute": "invalid",
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
          "text": "The checkbox's alignment."
        },
        "attribute": "alignment",
        "reflect": true,
        "defaultValue": "'center'"
      }
    };
  }
  static get states() {
    return {
      "hasInvalidTextSlot": {},
      "hasFocus": {}
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
        "method": "grChange",
        "name": "gr-change",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the control's checked state changes."
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
          "text": "Sets focus on the checkbox.",
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
          "text": "Removes focus from the checkbox.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "checked",
        "methodName": "handleCheckedChange"
      }, {
        "propName": "indeterminate",
        "methodName": "handleCheckedChange"
      }, {
        "propName": "invalidText",
        "methodName": "handleInvalidTextChange"
      }];
  }
}
//# sourceMappingURL=checkbox.js.map
