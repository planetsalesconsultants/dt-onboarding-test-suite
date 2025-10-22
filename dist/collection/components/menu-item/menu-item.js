/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h, Host } from '@stencil/core';
/**
 * @slot - The menu item's label.
 * @slot start - Content is placed to the left of the menu item's label (will be to the right when we support right-to-left direction)
 * @slot end - Content is placed to the right of the menu item's label (will be to the left when we support right-to-left direction)
 */
export class MenuItem {
  constructor() {
    this.hasFocus = false;
    this.checked = false;
    this.value = '';
    this.disabled = false;
  }
  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  /** Sets focus on the menu item. */
  async setFocus(options) {
    this.el.focus(options);
  }
  /** Removes focus from the menu item. */
  async removeFocus() {
    this.el.blur();
  }
  handleBlur() {
    this.hasFocus = false;
  }
  handleFocus() {
    this.hasFocus = true;
  }
  handleMouseEnter() {
    this.setFocus();
  }
  handleMouseLeave() {
    this.removeFocus();
  }
  render() {
    return (h(Host, { class: {
        'menu-item-checked': this.checked,
        'menu-item-disabled': this.disabled,
        'menu-item-focused': this.hasFocus,
      }, role: "menuitem", "aria-disabled": this.disabled ? 'true' : 'false', "aria-checked": this.checked ? 'true' : 'false', tabIndex: !this.disabled ? 0 : null, onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, h("span", { class: "checkmark" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Checkmark"), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M416 128L192 384l-96-96" }))), h("span", { class: "start" }, h("slot", { name: "start" })), h("span", { class: "label" }, h("slot", null)), h("span", { class: "end" }, h("slot", { name: "end" }))));
  }
  static get is() { return "gr-menu-item"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["menu-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["menu-item.css"]
    };
  }
  static get properties() {
    return {
      "checked": {
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
          "text": "Set to true to draw the item in a checked state."
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
      },
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
          "text": "A unique value to store in the menu item. This can be used as a way to identify menu items when selected."
        },
        "attribute": "value",
        "reflect": true,
        "defaultValue": "''"
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
          "text": "Set to true to draw the menu item in a disabled state."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "hasFocus": {}
    };
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
          "text": "Sets focus on the menu item.",
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
          "text": "Removes focus from the menu item.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=menu-item.js.map
