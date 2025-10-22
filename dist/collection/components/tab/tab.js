/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { Host, h } from '@stencil/core';
export class Tab {
  constructor() {
    this.hasFocus = false;
    this.panel = '';
    this.active = false;
    this.disabled = false;
  }
  connectedCallback() {
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /** Sets focus on the tab. */
  async setFocus() {
    this.el.focus();
  }
  /** Removes focus from the tab. */
  async removeFocus() {
    this.el.blur();
  }
  onBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }
  onFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
  }
  render() {
    const { active, disabled } = this;
    return (h(Host, { class: {
        tab: true,
        'tab-active': active,
        'tab-disabled': disabled,
        'tab-focused': this.hasFocus,
      }, role: "tab", "aria-disabled": disabled ? 'true' : 'false', "aria-selected": active ? 'true' : 'false', tabIndex: disabled || !active ? 0 : null, onFocus: this.onFocus, onBlur: this.onBlur, slot: "nav" }, h("slot", null)));
  }
  static get is() { return "gr-tab"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["tab.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["tab.css"]
    };
  }
  static get properties() {
    return {
      "panel": {
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
          "text": "The name of the tab panel the tab will control. The panel must be located in the same tab group."
        },
        "attribute": "panel",
        "reflect": true,
        "defaultValue": "''"
      },
      "active": {
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
          "text": ""
        },
        "attribute": "active",
        "reflect": true,
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
          "text": "Set to true to draw the tab in a disabled state."
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
  static get events() {
    return [{
        "method": "grFocus",
        "name": "gr-focus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the button has focus."
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
          "text": "Emitted when the button loses focus."
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
          "text": "Sets focus on the tab.",
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
          "text": "Removes focus from the tab.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=tab.js.map
