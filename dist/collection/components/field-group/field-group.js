/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h } from '@stencil/core';
import { hasSlot } from '../../utils/slot';
/**
 * @slot - The default slot where fields are placed.
 * @slot label - The field group label. Recommended for proper accessibility. Alternatively, you can use the label prop.
 */
export class FieldGroup {
  constructor() {
    this.hasLabelSlot = false;
    this.label = '';
    this.horizontal = false;
  }
  handleLabelChange() {
    this.handleSlotChange();
  }
  connectedCallback() {
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }
  componentWillLoad() {
    this.handleSlotChange();
  }
  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  handleSlotChange() {
    this.hasLabelSlot = hasSlot(this.el, 'label');
  }
  render() {
    const hasLabel = this.label ? true : this.hasLabelSlot;
    return (h("fieldset", { class: {
        'field-group': true,
        'field-group-horizontal': this.horizontal,
        'field-group-has-label': hasLabel,
      } }, h("legend", { class: "field-group-label", "aria-hidden": hasLabel ? 'false' : 'true' }, h("slot", { name: "label" }, this.label)), h("div", { class: "content" }, h("slot", null))));
  }
  static get is() { return "gr-field-group"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["field-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["field-group.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "The field group label. Recommended for proper accessibility. Alternatively, you can use the label slot."
        },
        "attribute": "label",
        "reflect": false,
        "defaultValue": "''"
      },
      "horizontal": {
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
          "text": "Render the fields horizontal instead of vertical"
        },
        "attribute": "horizontal",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "hasLabelSlot": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "label",
        "methodName": "handleLabelChange"
      }];
  }
}
//# sourceMappingURL=field-group.js.map
