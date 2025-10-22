/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e8cb22d3.js';
import { i as inheritAttributes, r as renderHiddenInput } from './helpers-d5cf0df0.js';
import { h as hasSlot } from './slot-5e43014a.js';

const checkboxCss = ".gr-scroll-lock{overflow:hidden !important}:host{--label-color:var(--gr-color-dark-tint);--label-margin-top-adjustment:-7px;--label-margin-bottom-adjustment:-4px;--control-size:var(--gr-toggle-size);--control-border-color:var(--gr-color-light-shade);--control-background-color:var(--gr-color-white);--control-border-color-hover:var(--gr-color-medium);--control-background-color-hover:var(--gr-color-white);--control-color-checked:var(--gr-color-primary-contrast);--control-border-color-checked:var(--gr-color-primary);--control-background-color-checked:var(--gr-color-primary);--control-border-color-checked-hover:var(--gr-color-primary-shade);--control-background-color-checked-hover:var(--gr-color-primary-shade);--control-border-color-checked-focus:var(--gr-color-primary-shade);--control-background-color-checked-focus:var(--gr-color-primary-shade);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33);display:inline-block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host(.checkbox-disabled){pointer-events:none}.checkbox-top{align-items:flex-start}.checkbox-center{align-items:center}.checkbox-bottom{align-items:flex-end}.checkbox{display:inline-flex;font-family:var(--gr-font-family);font-size:var(--gr-form-element-font-size-medium);font-weight:var(--gr-font-weight-normal);color:var(--label-color);vertical-align:middle;cursor:pointer}.checkbox-icon{display:inline-flex;width:var(--control-size);height:var(--control-size)}.checkbox-icon svg{width:100%;height:100%}.checkbox-control{flex:0 0 auto;position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--control-size);height:var(--control-size);border:solid 1px var(--control-border-color);border-radius:var(--gr-form-element-border-radius-small);background-color:var(--control-background-color);color:transparent;transition:150ms border-color, 150ms background-color, 150ms color, 150ms box-shadow}.checkbox-control input[type=checkbox]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none}.checkbox-control-circle{border-radius:var(--border-radius-circle)}.checkbox:not(.checkbox-checked):not(.checkbox-disabled) .checkbox-control:hover{border-color:var(--control-border-color-hover);background-color:var(--control-background-color-hover)}.checkbox.checkbox-focused:not(.checkbox-checked):not(.checkbox-disabled) .checkbox-control{border-color:var(--control-border-color-hover);background-color:var(--control-background-color-hover);box-shadow:var(--focus-ring)}.checkbox-checked .checkbox-control,.checkbox-indeterminate .checkbox-control{color:var(--control-color-checked);border-color:var(--control-border-color-checked);background-color:var(--control-background-color-checked)}.checkbox.checkbox-checked:not(.checkbox-disabled) .checkbox-control:hover,.checkbox.checkbox-indeterminate:not(.checkbox-disabled) .checkbox-control:hover{border-color:var(--control-border-color-checked-hover);background-color:var(--control-background-color-checked-hover)}.checkbox.checkbox-checked:not(.checkbox-disabled).checkbox-focused .checkbox-control,.checkbox.checkbox-indeterminate:not(.checkbox-disabled).checkbox-focused .checkbox-control{border-color:var(--control-border-color-checked-focus);background-color:var(--control-background-color-checked-focus);box-shadow:var(--focus-ring)}.checkbox:not(.checkbox-disabled).checkbox-invalid .checkbox-control{border-color:var(--gr-form-element-invalid-text-color)}.checkbox.checkbox-checked:not(.checkbox-disabled).checkbox-invalid .checkbox-control,.checkbox.checkbox-indeterminate:not(.checkbox-disabled).checkbox-invalid .checkbox-control{border-color:var(--gr-form-element-invalid-text-color);background-color:var(--gr-form-element-invalid-text-color)}.checkbox-disabled{opacity:0.5}.checkbox-label{line-height:var(--gr-line-height-normal);margin-left:0.5em;user-select:none}.checkbox-top .checkbox-label{margin-top:var(--label-margin-top-adjustment)}.checkbox-bottom .checkbox-label{margin-bottom:var(--label-margin-bottom-adjustment)}.invalid-text{display:none}.checkbox-invalid-text{display:none}:host(.checkbox-has-invalid-text){display:block}:host(.checkbox-has-invalid-text) .checkbox-invalid-text{display:flex;margin-left:-2px;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-invalid-text-color);margin-top:var(--gr-spacing-xxx-small);font-size:var(--gr-form-element-invalid-text-font-size-medium);min-height:1.875rem}:host(.checkbox-has-invalid-text) .checkbox-invalid-text .icon{margin-top:var(--gr-spacing-xxx-small);margin-right:var(--gr-spacing-xx-small)}:host(.checkbox-has-invalid-text) .checkbox-invalid-text .icon svg{width:1.4em;height:1.4em}";

let id = 0;
const Checkbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.grBlur = createEvent(this, "gr-blur", 7);
    this.grFocus = createEvent(this, "gr-focus", 7);
    this.grChange = createEvent(this, "gr-change", 7);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["handleCheckedChange"],
    "indeterminate": ["handleCheckedChange"],
    "invalidText": ["handleInvalidTextChange"]
  }; }
};
Checkbox.style = checkboxCss;

const fieldGroupCss = ".gr-scroll-lock{overflow:hidden !important}:host{--margin-between-fields:var(--gr-spacing-xx-small);--margin-between-fields-horizontal:var(--gr-spacing-medium);--align-fields:flex-start;display:block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.field-group{margin:0;padding:0;border:none}.content{display:flex;flex-direction:column;align-items:var(--align-fields);gap:var(--margin-between-fields)}.field-group-horizontal .content{flex-direction:row;gap:var(--margin-between-fields-horizontal)}.field-group-label{display:none}.field-group-has-label .field-group-label{line-height:var(--gr-line-height-normal);color:var(--gr-form-element-label-color);margin-bottom:var(--gr-spacing-xxx-small);font-size:var(--gr-form-element-label-font-size-medium);margin:0;padding:0;display:flex;margin-bottom:var(--gr-spacing-xxx-small)}";

const FieldGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "label": ["handleLabelChange"]
  }; }
};
FieldGroup.style = fieldGroupCss;

export { Checkbox as gr_checkbox, FieldGroup as gr_field_group };

//# sourceMappingURL=gr-checkbox_2.entry.js.map