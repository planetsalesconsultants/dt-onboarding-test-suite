/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2e762384.js');
const helpers = require('./helpers-637c6824.js');

const buttonCss = ".gr-scroll-lock{overflow:hidden !important}:host{display:inline-block;width:auto;font-family:var(--gr-font-family);font-weight:var(--gr-font-weight-medium);font-size:var(--gr-form-element-font-size-medium);font-kerning:none;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;pointer-events:auto;--height:var(--gr-form-element-height-medium);--border-radius:var(--gr-form-element-border-radius-medium);--border-width:1px;--border-style:solid;--background:transparent;--background-hover:transparent;--background-focus:transparent;--color:var(--gr-color-dark-tint);--color-hover:var(--gr-color-dark-tint);--color-focus:var(--gr-color-dark-tint);--border-color:var(--gr-color-light-shade);--border-color-hover:var(--gr-color-medium);--border-color-focus:var(--gr-color-primary);--padding-top:0;--padding-start:var(--gr-spacing-medium);--padding-end:var(--gr-spacing-medium);--padding-bottom:0;--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33);--shadow:none;--transition:background-color 150ms linear, opacity 150ms linear, border 150ms linear, color 150ms linear}:host(.button-disabled){pointer-events:none;opacity:0.5}:host(.button-primary){--border-color:var(--gr-color-primary);--background:var(--gr-color-primary);--color:var(--gr-color-primary-contrast);--border-color-hover:var(--gr-color-primary-shade);--background-hover:var(--gr-color-primary-shade);--color-hover:var(--gr-color-primary-contrast);--border-color-focus:var(--gr-color-primary);--background-focus:var(--gr-color-primary-shade);--color-focus:var(--gr-color-primary-contrast);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33)}:host(.button-secondary){--border-color:var(--gr-color-light-shade);--background:transparent;--color:var(--gr-color-primary);--border-color-hover:var(--gr-color-primary);--background-hover:transparent;--color-hover:var(--gr-color-primary);--border-color-focus:var(--gr-color-primary);--background-focus:transparent;--color-focus:var(--gr-color-primary);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33)}:host(.button-danger){--border-color:var(--gr-color-danger);--background:transparent;--color:var(--gr-color-danger);--border-color-hover:var(--gr-color-danger);--background-hover:var(--gr-color-danger);--color-hover:var(--gr-color-danger-contrast);--border-color-focus:var(--gr-color-danger);--background-focus:var(--gr-color-danger);--color-focus:var(--gr-color-danger-contrast);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-danger-rgb), 0.33)}:host(.button-plain){--border-color:transparent;--background:transparent;--color:var(--gr-color-primary);--border-color-hover:transparent;--background-hover:transparent;--color-hover:var(--gr-color-primary-shade);--border-color-focus:transparent;--background-focus:transparent;--color-focus:var(--gr-color-primary-shade);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33)}:host(.button-small){--padding-start:var(--gr-spacing-small);--padding-end:var(--gr-spacing-small);--border-radius:var(--gr-form-element-border-radius-small);--height:var(--gr-form-element-height-small);font-size:var(--gr-form-element-font-size-small)}:host(.button-large){--padding-start:var(--gr-spacing-large);--padding-end:var(--gr-spacing-large);--border-radius:var(--gr-form-element-border-radius-large);--height:var(--gr-form-element-height-large);font-size:var(--gr-form-element-font-size-large)}:host(.button-block){display:block}:host(.button-block) .button-native{margin-left:0;margin-right:0;display:block;width:100%;clear:both;contain:content}:host(.button-block) .button-native::after{clear:both}:host(.button-full){display:block}:host(.button-full) .button-native{margin-left:0;margin-right:0;display:block;width:100%;contain:content;border-radius:0;border-right-width:0;border-left-width:0}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;padding-top:var(--padding-top);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-bottom:var(--padding-bottom);width:100%;height:var(--height);transition:var(--transition);border-radius:var(--border-radius);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:var(--color);box-shadow:var(--shadow);line-height:1;cursor:pointer;z-index:0;text-decoration:none;box-sizing:border-box}.button-native::-moz-focus-inner{border:0}.button-native:focus{outline:none;box-shadow:var(--focus-ring);border-color:var(--border-color-focus);background-color:var(--background-focus);color:var(--color-focus)}.button-native *,.button-native *:before,.button-native *:after{box-sizing:inherit}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}:host(.button-circle) .button-native{padding-top:0;padding-bottom:0;padding-left:0;padding-right:0;border-radius:50%;width:var(--height)}@media (any-hover: hover){.button-native:hover{color:var(--color-hover);background:var(--background-hover);border-color:var(--border-color-hover)}}:host(.button-caret) .caret{display:flex;align-items:center;margin-left:0.3em}:host(.button-caret) .caret svg{width:1em;height:1em}:host(.button-pill) .button-native{border-radius:var(--height)}::slotted(*){pointer-events:none}::slotted([slot=start]){margin-top:0;margin-left:-0.3em;margin-right:0.3em;margin-bottom:0}::slotted([slot=end]){margin-top:0;margin-left:0.3em;margin-right:-0.2em;margin-bottom:0}::slotted([slot=icon-only]){font-size:1.4em;pointer-events:none}:host(.button-loading){position:relative;pointer-events:none}:host(.button-loading) .caret{visibility:hidden}:host(.button-loading) slot[name=start],:host(.button-loading) slot[name=end],:host(.button-loading) slot[name=icon-only],:host(.button-loading) slot:not([name]){visibility:hidden}:host(.button-loading) gr-spinner{--indicator-color:currentColor;position:absolute;height:1em;width:1em;top:calc(50% - 0.5em);left:calc(50% - 0.5em)}@media not all and (min-resolution: 0.001dpcm){@supports (-webkit-appearance: none) and (stroke-color: transparent){:host([type=button]),:host([type=reset]),:host([type=submit]){-webkit-appearance:none !important}}}";

const Button = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.grFocus = index.createEvent(this, "gr-focus", 7);
    this.grBlur = index.createEvent(this, "gr-blur", 7);
    this.inheritedAttributes = {};
    this.handleClick = (ev) => {
      if (this.type !== 'button') {
        // this button wants to specifically submit/reset a form
        // climb up the dom to see if we're in a <form>
        // and if so, then use JS to submit/reset it
        const form = this.el.closest('form');
        if (form) {
          ev.preventDefault();
          const fakeButton = document.createElement('button');
          fakeButton.type = this.type;
          fakeButton.style.display = 'none';
          form.appendChild(fakeButton);
          fakeButton.click();
          fakeButton.remove();
        }
      }
    };
    this.onFocus = () => {
      this.grFocus.emit();
    };
    this.onBlur = () => {
      this.grBlur.emit();
    };
    this.variant = 'default';
    this.disabled = false;
    this.loading = false;
    this.size = 'medium';
    this.caret = false;
    this.pill = false;
    this.expand = undefined;
    this.circle = false;
    this.href = undefined;
    this.target = undefined;
    this.rel = undefined;
    this.type = 'button';
  }
  componentWillLoad() {
    this.inheritedAttributes = helpers.inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
  }
  /** Sets focus on the button. */
  async setFocus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  async removeFocus() {
    this.button.blur();
  }
  render() {
    const { rel, target, href, variant, size, expand, type, inheritedAttributes, disabled } = this;
    const TagType = href === undefined ? 'button' : 'a';
    const attrs = TagType === 'button'
      ? { type }
      : {
        href,
        rel,
        target,
      };
    return (index.h(index.Host, { onClick: this.handleClick, "aria-disabled": disabled ? 'true' : null, class: {
        [`button-${variant}`]: true,
        [`button-${size}`]: true,
        [`button-${expand}`]: expand !== undefined,
        'button-caret': this.caret,
        'button-circle': this.circle,
        'button-pill': this.pill,
        'button-disabled': disabled,
        'button-loading': this.loading,
      } }, index.h(TagType, Object.assign({ ref: el => (this.button = el) }, attrs, { class: "button-native", disabled: disabled, onFocus: this.onFocus, onBlur: this.onBlur }, inheritedAttributes), index.h("span", { class: "button-inner" }, index.h("slot", { name: "icon-only" }), index.h("slot", { name: "start" }), index.h("slot", null), index.h("slot", { name: "end" }), this.caret && (index.h("span", { class: "caret" }, index.h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, index.h("title", null, "Chevron Down"), index.h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "48", d: "M112 184l144 144 144-144" }))))), this.loading && index.h("gr-spinner", null))));
  }
  get el() { return index.getElement(this); }
};
Button.style = buttonCss;

const spinnerCss = ":host{--track-color:var(--gr-color-light-shade);--indicator-color:var(--gr-color-primary);--stroke-width:2px;display:inline-flex;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.spinner{display:inline-block;width:1em;height:1em;border-radius:50%;border:solid var(--stroke-width) var(--track-color);border-top-color:var(--indicator-color);border-right-color:var(--indicator-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const Spinner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return index.h("span", { class: "spinner", "aria-busy": "true", "aria-live": "polite" });
  }
};
Spinner.style = spinnerCss;

exports.gr_button = Button;
exports.gr_spinner = Spinner;

//# sourceMappingURL=gr-button_2.cjs.entry.js.map