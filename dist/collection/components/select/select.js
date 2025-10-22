/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h, Build } from '@stencil/core';
import FormControl from '../../functional-components/form-control/form-control';
import { getTextContent, hasSlot } from '../../utils/slot';
import { inheritAttributes, renderHiddenInput } from '../../utils/helpers';
import { HTMLElementSSR } from '../../utils/HTMLElementSSR';
let id = 0;
/**
 * @slot - The select's options in the form of menu items.
 * @slot label - The select's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the select. Alternatively, you can use the help-text prop.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
export class Select {
  constructor() {
    this.inputId = `select-${++id}`;
    this.labelId = `select-label-${id}`;
    this.helpTextId = `select-help-text-${id}`;
    this.invalidTextId = `select-invalid-text-${id}`;
    this.inheritedAttributes = {};
    this.handleBlur = () => {
      // Don't blur if the control is open. We'll move focus back once it closes.
      if (!this.isOpen) {
        this.hasFocus = false;
        this.grBlur.emit();
      }
    };
    this.handleFocus = () => {
      if (!this.hasFocus) {
        this.hasFocus = true;
        this.grFocus.emit();
      }
    };
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasInvalidTextSlot = false;
    this.hasLabelSlot = false;
    this.isOpen = false;
    this.items = [];
    this.displayLabel = '';
    this.displayTags = [];
    this.multiple = false;
    this.maxTagsVisible = 3;
    this.disabled = false;
    this.name = '';
    this.placeholder = '';
    this.size = 'medium';
    this.hoist = false;
    this.value = '';
    this.pill = false;
    this.label = '';
    this.requiredIndicator = false;
    this.helpText = '';
    this.invalidText = '';
    this.invalid = false;
    this.clearable = false;
  }
  handleDisabledChange() {
    if (this.disabled && this.isOpen) {
      this.dropdown.hide();
    }
  }
  handleLabelChange() {
    this.handleSlotChange();
  }
  handleMultipleChange() {
    // Cast to array | string based on `this.multiple`
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : value[0] || '';
    this.syncItemsFromValue();
  }
  handleValueChange() {
    this.syncItemsFromValue();
    this.grChange.emit();
  }
  connectedCallback() {
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
    this.handleMenuShow = this.handleMenuShow.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleTagInteraction = this.handleTagInteraction.bind(this);
    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }
  componentWillLoad() {
    this.handleSlotChange();
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }
  componentDidLoad() {
    if (Build.isBrowser) {
      this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
    }
    this.reportDuplicateItemValues();
    // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
    requestAnimationFrame(() => this.syncItemsFromValue());
  }
  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  /** Sets focus on the select. */
  async setFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
    this.dropdown.focusOnTrigger();
  }
  getItemLabel(item) {
    const slot = item.shadowRoot.querySelector('slot:not([name])');
    return getTextContent(slot);
  }
  getItems() {
    return [...this.el.querySelectorAll('gr-menu-item')];
  }
  getValueAsArray() {
    return Array.isArray(this.value) ? this.value : [this.value];
  }
  handleClearClick(event) {
    event.stopPropagation();
    this.value = this.multiple ? [] : '';
    this.syncItemsFromValue();
  }
  handleKeyDown(event) {
    const target = event.target;
    const items = this.getItems();
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    // Ignore key presses on tags
    if (target.tagName.toLowerCase() === 'gr-tag') {
      return;
    }
    // Tabbing out of the control closes it
    if (event.key === 'Tab') {
      if (this.isOpen) {
        this.dropdown.hide();
      }
      return;
    }
    // Up/down opens the menu
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      // Show the menu if it's not already open
      if (!this.isOpen) {
        this.dropdown.show();
      }
      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstItem) {
        firstItem.setFocus();
        return;
      }
      if (event.key === 'ArrowUp' && lastItem) {
        lastItem.setFocus();
        return;
      }
    }
    // All other "printable" keys open the menu and initiate type to select
    if (!this.isOpen && event.key.length === 1) {
      event.stopPropagation();
      event.preventDefault();
      this.dropdown.show();
      this.menu.typeToSelect(event.key);
    }
  }
  handleLabelClick() {
    this.box.focus();
  }
  handleMenuSelect(event) {
    const item = event.detail.item;
    if (this.multiple) {
      this.value = this.value.includes(item.value)
        ? this.value.filter(v => v !== item.value)
        : [...this.value, item.value];
    }
    else {
      this.value = item.value;
    }
    this.syncItemsFromValue();
  }
  handleMenuShow(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.resizeMenu();
    this.resizeObserver.observe(this.el);
    this.isOpen = true;
  }
  handleMenuHide() {
    this.resizeObserver.unobserve(this.el);
    this.isOpen = false;
    // Restore focus on the box after the menu is hidden
    this.box.focus();
  }
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.syncItemsFromValue();
    this.reportDuplicateItemValues();
  }
  handleTagInteraction(event) {
    // Don't toggle the menu when a tag's clear button is activated
    const path = event.composedPath();
    const clearButton = path.find(el => {
      if (el instanceof HTMLElementSSR) {
        return el.classList.contains('tag-clear');
      }
    });
    if (clearButton) {
      event.stopPropagation();
    }
  }
  reportDuplicateItemValues() {
    const items = this.getItems();
    // Report duplicate values since they can break selection logic
    const duplicateValues = items.map(item => item.value).filter((e, i, a) => a.indexOf(e) !== i);
    if (duplicateValues.length) {
      throw new Error('Duplicate value found on <gr-menu-item> in <gr-select>: "' + duplicateValues.join('", "') + '"');
    }
  }
  resizeMenu() {
    this.menu.style.width = `${this.box.clientWidth}px`;
  }
  syncItemsFromValue() {
    const items = this.getItems();
    const value = this.getValueAsArray();
    // Sync checked states
    items.map(item => (item.checked = value.includes(item.value)));
    // Sync display label
    if (this.multiple) {
      const checkedItems = [];
      value.map(val => items.map(item => (item.value === val ? checkedItems.push(item) : null)));
      this.displayTags = checkedItems.map(item => {
        return (h("gr-tag", { type: "info", size: this.size, pill: this.pill, clearable: true, onClick: this.handleTagInteraction, onKeyDown: this.handleTagInteraction, "onGr-clear": event => {
            event.stopPropagation();
            if (!this.disabled) {
              item.checked = false;
              this.syncValueFromItems();
            }
          } }, this.getItemLabel(item)));
      });
      if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
        const total = this.displayTags.length;
        this.displayLabel = '';
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(h("gr-tag", { type: "info", size: this.size, pill: this.pill }, "+", total - this.maxTagsVisible));
      }
    }
    else {
      const checkedItem = items.filter(item => item.value === value[0])[0];
      this.displayLabel = checkedItem ? this.getItemLabel(checkedItem) : '';
      this.displayTags = [];
    }
  }
  syncValueFromItems() {
    const items = this.getItems();
    const checkedItems = items.filter(item => item.checked);
    const checkedValues = checkedItems.map(item => item.value);
    if (this.multiple) {
      this.value = this.value.filter(val => checkedValues.includes(val));
    }
    else {
      this.value = checkedValues.length > 0 ? checkedValues[0] : '';
    }
  }
  render() {
    var _a;
    const hasSelection = this.multiple ? this.value.length > 0 : this.value !== '';
    const ariaLabelAttributes = this.inheritedAttributes['aria-label']
      ? { 'aria-label': this.inheritedAttributes['aria-label'] }
      : { 'aria-labelledby': this.labelId };
    renderHiddenInput(this.el, this.name, parseValue(this.value), this.disabled);
    return (h(FormControl, { inputId: this.inputId, label: this.label, labelId: this.labelId, hasLabelSlot: this.hasLabelSlot, helpTextId: this.helpTextId, helpText: this.helpText, hasHelpTextSlot: this.hasHelpTextSlot, invalidTextId: this.invalidTextId, invalidText: this.invalidText, invalid: this.invalid, hasInvalidTextSlot: this.hasInvalidTextSlot, size: this.size, onLabelClick: this.handleLabelClick, requiredIndicator: this.requiredIndicator }, h("gr-dropdown", { ref: el => (this.dropdown = el), hoist: this.hoist, closeOnSelect: !this.multiple, containingElement: this.el, class: {
        'select': true,
        'select-open': this.isOpen,
        'select-empty': ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) === 0,
        'select-focused': this.hasFocus,
        'select-clearable': this.clearable,
        'select-disabled': this.disabled,
        'select-multiple': this.multiple,
        'select-has-tags': this.multiple && hasSelection,
        'select-placeholder-visible': this.displayLabel === '',
        [`select-${this.size}`]: true,
        'select-pill': this.pill,
        'select-invalid': this.invalid,
      }, "onGr-show": this.handleMenuShow, "onGr-hide": this.handleMenuHide }, h("div", Object.assign({ slot: "trigger", ref: el => (this.box = el), id: this.inputId, class: "select-box", role: "combobox" }, ariaLabelAttributes, { "aria-describedby": this.invalid ? this.invalidTextId : this.helpTextId, "aria-haspopup": "true", "aria-expanded": this.isOpen ? 'true' : 'false', "aria-invalid": this.invalid ? 'true' : 'false', "aria-required": this.requiredIndicator ? 'true' : 'false', tabIndex: this.disabled ? -1 : 0, onBlur: this.handleBlur, onFocus: this.handleFocus, onKeyDown: this.handleKeyDown }), h("div", { class: "select-label" }, this.displayTags.length ? (h("span", { class: "select-tags" }, this.displayTags)) : (this.displayLabel || this.placeholder)), this.clearable && hasSelection && (h("button", { class: "select-clear", type: "button", onClick: this.handleClearClick, "aria-label": "clear", tabindex: "-1" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Close Circle"), h("path", { d: "M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M320 320L192 192M192 320l128-128" })))), h("span", { class: "caret" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Chevron Down"), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "48", d: "M112 184l144 144 144-144" }))), h("input", { class: "select-hidden-select", "aria-hidden": "true", value: hasSelection ? '1' : '', tabIndex: -1 })), h("gr-menu", { ref: el => (this.menu = el), class: "select-menu", "onGr-select": this.handleMenuSelect }, h("slot", { onSlotchange: this.handleSlotChange })))));
  }
  static get is() { return "gr-select"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["select.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["select.css"]
    };
  }
  static get properties() {
    return {
      "multiple": {
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
          "text": "Set to true to enable multiselect."
        },
        "attribute": "multiple",
        "reflect": false,
        "defaultValue": "false"
      },
      "maxTagsVisible": {
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
          "text": "The maximum number of tags to show when `multiple` is true. After the maximum, \"+n\" will be shown to indicate the\nnumber of additional items that are selected. Set to -1 to remove the limit."
        },
        "attribute": "max-tags-visible",
        "reflect": false,
        "defaultValue": "3"
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
          "text": "Set to true to disable the select control."
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
          "text": "The select's name."
        },
        "attribute": "name",
        "reflect": false,
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
          "text": "The select's placeholder text."
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
          "text": "The select's size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'medium'"
      },
      "hoist": {
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
          "text": "Enable this option to prevent the panel from being clipped when the component is placed inside a container with\n`overflow: auto|scroll`."
        },
        "attribute": "hoist",
        "reflect": false,
        "defaultValue": "false"
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string | Array<string>",
          "resolved": "string | string[]",
          "references": {
            "Array": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The value of the control. This will be a string or an array depending on `multiple`."
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "''"
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
          "text": "Set to true to draw a pill-style select with rounded edges."
        },
        "attribute": "pill",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "The select's label. Alternatively, you can use the label slot."
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
          "text": "The select's help text. Alternatively, you can use the help-text slot."
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
          "text": "The select's invalid text. Alternatively, you can use the invalid-text slot."
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
          "text": "Set to true to add a clear button when the select is populated."
        },
        "attribute": "clearable",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "hasFocus": {},
      "hasHelpTextSlot": {},
      "hasInvalidTextSlot": {},
      "hasLabelSlot": {},
      "isOpen": {},
      "items": {},
      "displayLabel": {},
      "displayTags": {}
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
          "text": "Sets focus on the select.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "disabled",
        "methodName": "handleDisabledChange"
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
        "propName": "multiple",
        "methodName": "handleMultipleChange"
      }, {
        "propName": "value",
        "methodName": "handleValueChange"
      }];
  }
}
const parseValue = (value) => {
  if (value == null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.join(',');
  }
  return value.toString();
};
//# sourceMappingURL=select.js.map
