/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { Host, h } from '@stencil/core';
/**
 * @slot - The tag's content.
 */
export class Tag {
  constructor() {
    this.type = 'primary';
    this.size = 'medium';
    this.pill = false;
    this.clearable = false;
    this.truncate = false;
    this.title = '';
  }
  connectedCallback() {
    this.handleClearClick = this.handleClearClick.bind(this);
  }
  handleClearClick() {
    this.grClear.emit();
  }
  render() {
    return (h(Host, { class: {
        [`tag-${this.type}`]: true,
        [`tag-${this.size}`]: true,
        'tag-pill': this.pill,
        'tag-clearable': this.clearable,
      } }, h("span", { class: "tag" }, h("span", { class: { 'tag-truncate': this.truncate }, title: this.title }, h("slot", null)), this.clearable && (h("gr-button", { variant: "plain", size: this.size, class: "tag-clear", "aria-label": "clear", onClick: this.handleClearClick }, h("svg", { slot: "icon-only", role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Close"), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M368 368L144 144M368 144L144 368" })))))));
  }
  static get is() { return "gr-tag"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["tag.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["tag.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'primary' | 'success' | 'info' | 'warning' | 'danger'",
          "resolved": "\"danger\" | \"info\" | \"primary\" | \"success\" | \"warning\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The tag's type."
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'primary'"
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
          "text": "The tag's size."
        },
        "attribute": "size",
        "reflect": true,
        "defaultValue": "'medium'"
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
          "text": "Set to true to draw a pill-style tag with rounded edges."
        },
        "attribute": "pill",
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
          "text": "Set to true to make the tag clearable."
        },
        "attribute": "clearable",
        "reflect": true,
        "defaultValue": "false"
      },
      "truncate": {
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
          "text": "Set to true to make the tag truncated."
        },
        "attribute": "truncate",
        "reflect": true,
        "defaultValue": "false"
      },
      "title": {
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
          "text": "The tag's title."
        },
        "attribute": "title",
        "reflect": true,
        "defaultValue": "''"
      }
    };
  }
  static get events() {
    return [{
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
      }];
  }
}
//# sourceMappingURL=tag.js.map
