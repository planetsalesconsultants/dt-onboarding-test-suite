/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e8cb22d3.js';
import { a as addEventListener, i as inheritAttributes, b as removeEventListener, r as renderHiddenInput } from './helpers-d5cf0df0.js';
import { h as hasSlot } from './slot-5e43014a.js';

const radioCss = ".gr-scroll-lock{overflow:hidden !important}:host{--label-color:var(--gr-color-dark-tint);--label-margin-top-adjustment:-7px;--label-margin-bottom-adjustment:-4px;--control-size:var(--gr-toggle-size);--control-border-color:var(--gr-color-light-shade);--control-background-color:var(--gr-color-white);--control-border-color-hover:var(--gr-color-medium);--control-background-color-hover:var(--gr-color-white);--control-border-color-focus:var(--gr-color-medium);--control-background-color-focus:var(--gr-color-medium);--control-color-checked:var(--gr-color-white);--control-border-color-checked:var(--gr-color-primary);--control-background-color-checked:var(--gr-color-primary);--control-border-color-checked-hover:var(--gr-color-primary-shade);--control-background-color-checked-hover:var(--gr-color-primary-shade);--control-border-color-checked-focus:var(--gr-color-primary-shade);--control-background-color-checked-focus:var(--gr-color-primary-shade);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33);display:inline-block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host(.radio-disabled){pointer-events:none}.radio-top{align-items:flex-start}.radio-center{align-items:center}.radio-bottom{align-items:flex-end}.radio{display:inline-flex;font-family:var(--gr-font-family);font-size:var(--gr-form-element-font-size-medium);font-weight:var(--gr-font-weight-normal);color:var(--label-color);vertical-align:middle;cursor:pointer}.radio-icon{display:inline-flex;width:var(--control-size);height:var(--control-size)}.radio-icon svg{width:100%;height:100%}.radio-control{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--control-size);height:var(--control-size);border:solid 1px var(--control-border-color);border-radius:50%;background-color:var(--control-background-color);color:transparent;transition:150ms border-color, 150ms background-color, 150ms color, 150ms box-shadow}.radio-control input[type=radio]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none}.radio:not(.radio-checked):not(.radio-disabled) .radio-control:hover{border-color:var(--control-border-color-hover);background-color:var(--control-background-color-hover)}.radio.radio-focused:not(.radio-checked):not(.radio-disabled) .radio-control{border-color:var(--control-border-color-hover);background-color:var(--control-background-color-hover);box-shadow:var(--focus-ring)}.radio-checked .radio-control{color:var(--control-color-checked);border-color:var(--control-border-color-checked);background-color:var(--control-background-color-checked)}.radio.radio-checked:not(.radio-disabled) .radio-control:hover{border-color:var(--control-border-color-checked-hover);background-color:var(--control-background-color-checked-hover)}.radio.radio-checked:not(.radio-disabled).radio-focused .radio-control{border-color:var(--control-border-color-checked-focus);background-color:var(--control-background-color-checked-focus);box-shadow:var(--focus-ring)}.radio-disabled{opacity:0.5}.radio-label{line-height:var(--gr-line-height-normal);margin-left:0.5em;user-select:none}.radio-top .radio-label{margin-top:var(--label-margin-top-adjustment)}.radio-bottom .radio-label{margin-bottom:var(--label-margin-bottom-adjustment)}:host(:focus){outline:none}";

let id$1 = 0;
const Radio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.grBlur = createEvent(this, "gr-blur", 7);
    this.grFocus = createEvent(this, "gr-focus", 7);
    this.inputId = `radio-${++id$1}`;
    this.labelId = `radio-label-${id$1}`;
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
  get el() { return getElement(this); }
};
Radio.style = radioCss;

const radioGroupCss = ".gr-scroll-lock{overflow:hidden !important}:host{--margin-between-radios:var(--gr-spacing-xx-small);--margin-between-radios-horizontal:var(--gr-spacing-medium);--align-radios:flex-start;display:block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.radio-group{margin:0;padding:0;border:none}.content{display:flex;flex-direction:column;align-items:var(--align-radios);gap:var(--margin-between-radios)}.radio-group-horizontal .content{flex-direction:row;gap:var(--margin-between-radios-horizontal)}.radio-group-label{display:none}.radio-group-has-label .radio-group-label{line-height:var(--gr-line-height-normal);color:var(--gr-form-element-label-color);font-size:var(--gr-form-element-label-font-size-medium);margin:0;padding:0;display:flex;margin-bottom:var(--gr-spacing-xxx-small)}.radio-group-has-label .radio-group-label .asterisk{margin-left:var(--gr-spacing-x-small);color:var(--gr-color-medium)}.radio-group-has-label .radio-group-label .asterisk svg{width:0.6em;height:0.6em;margin-bottom:var(--gr-spacing-xxx-small)}.radio-group-invalid ::slotted(gr-radio){--control-border-color:var(--gr-form-element-invalid-text-color);--control-background-color-checked:var(--gr-form-element-invalid-text-color)}.radio-group-invalid-text{display:none}.radio-group-has-invalid-text .radio-group-invalid-text{display:flex;margin-left:-2px;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-invalid-text-color);margin-top:var(--gr-spacing-xxx-small);font-size:var(--gr-form-element-invalid-text-font-size-medium);min-height:1.875rem}.radio-group-has-invalid-text .radio-group-invalid-text .icon{margin-top:var(--gr-spacing-xxx-small);margin-right:var(--gr-spacing-xx-small)}.radio-group-has-invalid-text .radio-group-invalid-text .icon svg{width:1.4em;height:1.4em}";

let id = 0;
const RadioGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.grChange = createEvent(this, "gr-change", 7);
    this.inputId = `radio-group-${id++}`;
    this.invalidTextId = `radio-group-invalid-text-${id++}`;
    this.setRadioTabindex = (value) => {
      const radios = this.getRadios();
      // Get the first radio that is not disabled and the checked one
      const first = radios.find(radio => !radio.disabled);
      const checked = radios.find(radio => radio.value === value && !radio.disabled);
      if (!first && !checked) {
        return;
      }
      // If an enabled checked radio exists, set it to be the focusable radio
      // otherwise we default to focus the first radio
      const focusable = checked || first;
      for (const radio of radios) {
        const tabindex = radio === focusable ? 0 : -1;
        radio.setButtonTabindex(tabindex);
      }
    };
    this.onClick = (ev) => {
      ev.preventDefault();
      const selectedRadio = ev.target && ev.target.closest('gr-radio');
      if (selectedRadio) {
        const currentValue = this.value;
        const newValue = selectedRadio.value;
        if (newValue !== currentValue) {
          this.value = newValue;
        }
        else if (this.allowEmptySelection) {
          this.value = undefined;
        }
      }
    };
    this.hasLabelSlot = false;
    this.hasInvalidTextSlot = false;
    this.allowEmptySelection = false;
    this.label = '';
    this.requiredIndicator = false;
    this.invalidText = '';
    this.invalid = false;
    this.horizontal = false;
    this.name = this.inputId;
    this.value = undefined;
  }
  valueChanged(value) {
    this.setRadioTabindex(value);
    this.grChange.emit({ value });
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
  componentDidLoad() {
    this.setRadioTabindex(this.value);
  }
  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  getRadios() {
    return Array.from(this.el.querySelectorAll('gr-radio'));
  }
  onKeydown(ev) {
    if (ev.target && !this.el.contains(ev.target)) {
      return;
    }
    // Get all radios inside of the radio group and then
    // filter out disabled radios since we need to skip those
    const radios = this.getRadios().filter(radio => !radio.disabled);
    // Only move the radio if the current focus is in the radio group
    if (ev.target && radios.includes(ev.target)) {
      const index = radios.findIndex(radio => radio === ev.target);
      const current = radios[index];
      let next;
      // If hitting arrow down or arrow right, move to the next radio
      // If we're on the last radio, move to the first radio
      if (['ArrowDown', 'ArrowRight'].includes(ev.code)) {
        next = index === radios.length - 1 ? radios[0] : radios[index + 1];
        // Prevent browsers from scrolling
        ev.preventDefault();
      }
      // If hitting arrow up or arrow left, move to the previous radio
      // If we're on the first radio, move to the last radio
      if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
        next = index === 0 ? radios[radios.length - 1] : radios[index - 1];
        // Prevent browsers from scrolling
        ev.preventDefault();
      }
      if (next && radios.includes(next)) {
        next.setFocus(ev);
        this.value = next.value;
      }
      // Update the radio group value when a user presses the
      // space bar on top of a selected radio
      if (['Space'].includes(ev.code)) {
        this.value = this.allowEmptySelection && this.value !== undefined ? undefined : current.value;
        // Prevent browsers from jumping
        // to the bottom of the screen
        ev.preventDefault();
      }
    }
  }
  handleSlotChange() {
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
  }
  render() {
    renderHiddenInput(this.el, this.name, this.value, false);
    const hasLabel = this.label ? true : this.hasLabelSlot;
    const hasInvalidText = this.invalidText ? true : this.hasInvalidTextSlot;
    const showInvalidText = this.invalid ? true : false;
    return (h(Host, { onClick: this.onClick }, h("fieldset", { class: {
        'radio-group': true,
        'radio-group-horizontal': this.horizontal,
        'radio-group-invalid': this.invalid,
        'radio-group-has-label': hasLabel,
        'radio-group-has-invalid-text': hasInvalidText,
      }, role: "radiogroup", "aria-invalid": this.invalid, "aria-required": this.requiredIndicator ? 'true' : 'false', "aria-describedby": this.invalid ? this.invalidTextId : '' }, h("legend", { class: "radio-group-label", "aria-hidden": hasLabel ? 'false' : 'true' }, h("slot", { name: "label" }, this.label), this.requiredIndicator && (h("span", { class: "asterisk" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 1200 1200" }, h("path", { fill: "currentColor", d: "M489.838 29.354v443.603L68.032 335.894 0 545.285l421.829 137.086-260.743 358.876 178.219 129.398L600.048 811.84l260.673 358.806 178.146-129.398-260.766-358.783L1200 545.379l-68.032-209.403-421.899 137.07V29.443H489.84l-.002-.089z" }))))), h("div", { class: "content" }, h("slot", null)), showInvalidText && (h("div", { id: this.invalidTextId, class: "radio-group-invalid-text", "aria-hidden": hasInvalidText ? 'false' : 'true' }, h("div", { class: "icon" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Alert Circle"), h("path", { d: "M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm0,319.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Zm21.72-201.15-5.74,122a16,16,0,0,1-32,0l-5.74-121.94v-.05a21.74,21.74,0,1,1,43.44,0Z", fill: "currentColor" }))), h("div", { class: "text" }, h("slot", { name: "invalid-text" }, this.invalidText)))))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["valueChanged"],
    "label": ["handleLabelChange"],
    "invalidText": ["handleLabelChange"]
  }; }
};
RadioGroup.style = radioGroupCss;

export { Radio as gr_radio, RadioGroup as gr_radio_group };

//# sourceMappingURL=gr-radio_2.entry.js.map