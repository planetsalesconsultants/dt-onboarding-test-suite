/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { Host, h } from '@stencil/core';
import { inheritAttributes } from '../../utils/helpers';
/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot icon-only - Should be used on an icon in a button that has no text.
 * @slot start - Content is placed to the left of the button text (will be to the right when we support right-to-left direction)
 * @slot end - Content is placed to the right of the button text (will be to the left when we support right-to-left direction)
 */
export class Button {
  constructor() {
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
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
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
    return (h(Host, { onClick: this.handleClick, "aria-disabled": disabled ? 'true' : null, class: {
        [`button-${variant}`]: true,
        [`button-${size}`]: true,
        [`button-${expand}`]: expand !== undefined,
        'button-caret': this.caret,
        'button-circle': this.circle,
        'button-pill': this.pill,
        'button-disabled': disabled,
        'button-loading': this.loading,
      } }, h(TagType, Object.assign({ ref: el => (this.button = el) }, attrs, { class: "button-native", disabled: disabled, onFocus: this.onFocus, onBlur: this.onBlur }, inheritedAttributes), h("span", { class: "button-inner" }, h("slot", { name: "icon-only" }), h("slot", { name: "start" }), h("slot", null), h("slot", { name: "end" }), this.caret && (h("span", { class: "caret" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Chevron Down"), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "48", d: "M112 184l144 144 144-144" }))))), this.loading && h("gr-spinner", null))));
  }
  static get is() { return "gr-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["button.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'default' | 'primary' | 'secondary' | 'danger' | 'plain'",
          "resolved": "\"danger\" | \"default\" | \"plain\" | \"primary\" | \"secondary\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The different variants.\nThe options are: `\"default\"`, `\"primary\"`, `\"secondary\"`, `\"danger\"`, and `\"plain\"`."
        },
        "attribute": "variant",
        "reflect": true,
        "defaultValue": "'default'"
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
          "text": "If `true`, the user cannot interact with the button."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "loading": {
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
          "text": "Set to true to draw the button in a loading state."
        },
        "attribute": "loading",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "The button's size."
        },
        "attribute": "size",
        "reflect": true,
        "defaultValue": "'medium'"
      },
      "caret": {
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
          "text": "Set to true to draw the button with a caret for use with dropdowns, popovers, etc."
        },
        "attribute": "caret",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Set to true to draw a pill-style button with rounded edges."
        },
        "attribute": "pill",
        "reflect": true,
        "defaultValue": "false"
      },
      "expand": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'full' | 'block'",
          "resolved": "\"block\" | \"full\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Set to `\"block\"` for a full-width button or to `\"full\"` for a full-width button\nwithout left and right borders."
        },
        "attribute": "expand",
        "reflect": true
      },
      "circle": {
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
          "text": "Set to true to draw a circle button."
        },
        "attribute": "circle",
        "reflect": true,
        "defaultValue": "false"
      },
      "href": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | undefined",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains a URL or a URL fragment that the hyperlink points to."
        },
        "attribute": "href",
        "reflect": false
      },
      "target": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | undefined",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies where to display the linked URL.\nSpecial keywords: `\"_blank\"`, `\"_self\"`, `\"_parent\"`, `\"_top\"`."
        },
        "attribute": "target",
        "reflect": false
      },
      "rel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | undefined",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies the relationship of the target object to the link object.\nThe value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
        },
        "attribute": "rel",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'submit' | 'reset' | 'button'",
          "resolved": "\"button\" | \"reset\" | \"submit\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The type of the button."
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'button'"
      }
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
          "text": "Sets focus on the button.",
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
          "text": "Removes focus from the button.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=button.js.map
