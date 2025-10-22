/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h } from '@stencil/core';
export class TabPanel {
  constructor() {
    this.name = '';
    this.active = false;
  }
  render() {
    const { active } = this;
    this.el.style.display = this.active ? 'block' : 'none';
    return (h("div", { part: "base", class: "tab-panel", role: "tabpanel", "aria-hidden": active ? 'false' : 'true' }, h("slot", null)));
  }
  static get is() { return "gr-tab-panel"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["tab-panel.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["tab-panel.css"]
    };
  }
  static get properties() {
    return {
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
          "text": ""
        },
        "attribute": "name",
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
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=tab-panel.js.map
