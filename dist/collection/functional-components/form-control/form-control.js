/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h } from '@stencil/core';
const FormControl = (props, children) => {
  const hasLabel = props.label ? true : props.hasLabelSlot;
  const hasHelpText = props.helpText ? true : props.hasHelpTextSlot;
  const hasInvalidText = props.invalidText ? true : props.hasInvalidTextSlot;
  const showHelpText = props.invalid ? false : true;
  const showInvalidText = props.invalid ? true : false;
  return (h("div", { class: {
      'form-control': true,
      [`form-control-${props.size}`]: true,
      'form-control-has-label': hasLabel,
      'form-control-has-help-text': hasHelpText,
      'form-control-has-invalid-text': hasInvalidText,
    } }, h("label", { id: props.labelId, class: "form-control-label", htmlFor: props.inputId, "aria-hidden": hasLabel ? 'false' : 'true', onClick: props.onLabelClick }, h("slot", { name: "label" }, props.label), props.requiredIndicator && (h("div", { class: "asterisk" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 1200 1200" }, h("path", { fill: "currentColor", d: "M489.838 29.354v443.603L68.032 335.894 0 545.285l421.829 137.086-260.743 358.876 178.219 129.398L600.048 811.84l260.673 358.806 178.146-129.398-260.766-358.783L1200 545.379l-68.032-209.403-421.899 137.07V29.443H489.84l-.002-.089z" }))))), h("div", { class: "form-control-input" }, children), showHelpText && (h("div", { id: props.helpTextId, class: "form-control-help-text", "aria-hidden": hasHelpText ? 'false' : 'true' }, h("slot", { name: "help-text" }, props.helpText))), showInvalidText && (h("div", { id: props.invalidTextId, class: "form-control-invalid-text", "aria-hidden": hasInvalidText ? 'false' : 'true' }, h("div", { class: "icon" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Alert Circle"), h("path", { d: "M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm0,319.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Zm21.72-201.15-5.74,122a16,16,0,0,1-32,0l-5.74-121.94v-.05a21.74,21.74,0,1,1,43.44,0Z", fill: "currentColor" }))), h("div", { class: "text" }, h("slot", { name: "invalid-text" }, props.invalidText))))));
};
export default FormControl;
//# sourceMappingURL=form-control.js.map
