/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h } from '@stencil/core';
import { DuetDatePicker } from '@duetds/date-picker/custom-element';
import { DaysOfWeek } from '../../enums';
import { browserLocalization } from './date-localization';
import dateAdapter from './date-adapter';
import { renderHiddenInput } from '../../utils/helpers';
import FormControl from '../../functional-components/form-control/form-control';
import { hasSlot } from '../../utils/slot';
let id = 0;
if (typeof customElements !== 'undefined' && !customElements.get('duet-date-picker')) {
  customElements.define('duet-date-picker', DuetDatePicker);
}
export class DatePicker {
  constructor() {
    this.inputId = `date-picker-${++id}`;
    this.labelId = `date-picker-label-${id}`;
    this.helpTextId = `date-picker-help-text-${id}`;
    this.invalidTextId = `date-picker-invalid-text-${id}`;
    this.hasHelpTextSlot = false;
    this.hasInvalidTextSlot = false;
    this.hasLabelSlot = false;
    this.name = '';
    this.placeholder = '';
    this.disabled = false;
    this.direction = 'right';
    this.value = '';
    this.min = '';
    this.max = '';
    this.firstDayOfWeek = DaysOfWeek.Monday;
    this.isDateDisabled = () => false;
    this.label = '';
    this.requiredIndicator = false;
    this.helpText = '';
    this.invalidText = '';
    this.invalid = false;
    this.localization = browserLocalization;
  }
  handleLabelChange() {
    this.handleSlotChange();
  }
  connectedCallback() {
    this.handleDuetChange = this.handleDuetChange.bind(this);
    this.handleDuetFocus = this.handleDuetFocus.bind(this);
    this.handleDuetBlur = this.handleDuetBlur.bind(this);
    this.handleDuetOpen = this.handleDuetOpen.bind(this);
    this.handleDuetClose = this.handleDuetClose.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }
  componentWillLoad() {
    this.handleSlotChange();
  }
  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  async setFocus() {
    return this.duetDatePicker.setFocus();
  }
  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  async show() {
    this.duetDatePicker.show();
  }
  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  async hide(moveFocusToButton = true) {
    this.duetDatePicker.hide(moveFocusToButton);
  }
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
  }
  handleLabelClick() {
    this.duetDatePicker.setFocus();
  }
  handleDuetChange(event) {
    event.stopPropagation();
    this.value = event.detail.value;
    this.grChange.emit({
      component: 'gr-date-picker',
      value: event.detail.value,
      valueAsDate: event.detail.valueAsDate,
    });
  }
  handleDuetFocus(event) {
    event.stopPropagation();
    this.grFocus.emit();
  }
  handleDuetBlur(event) {
    event.stopPropagation();
    this.grBlur.emit();
  }
  handleDuetOpen(event) {
    event.stopPropagation();
    this.grOpen.emit();
  }
  handleDuetClose(event) {
    event.stopPropagation();
    this.grClose.emit();
  }
  render() {
    renderHiddenInput(this.el, this.name, this.value, this.disabled);
    const helpText = this.helpText ? this.helpText : this.localization.helpText;
    return (h(FormControl, { inputId: this.inputId, label: this.label, labelId: this.labelId, hasLabelSlot: this.hasLabelSlot, helpTextId: this.helpTextId, helpText: helpText, hasHelpTextSlot: this.hasHelpTextSlot, invalidTextId: this.invalidTextId, invalidText: this.invalidText, invalid: this.invalid, size: "medium", hasInvalidTextSlot: this.hasInvalidTextSlot, onLabelClick: this.handleLabelClick, requiredIndicator: this.requiredIndicator }, h("duet-date-picker", { ref: el => (this.duetDatePicker = el), name: this.name, disabled: this.disabled, direction: this.direction, value: this.value, min: this.min, max: this.max, firstDayOfWeek: this.firstDayOfWeek, localization: Object.assign(Object.assign({}, this.localization), { placeholder: this.placeholder }), dateAdapter: dateAdapter, isDateDisabled: this.isDateDisabled, onDuetChange: this.handleDuetChange, onDuetFocus: this.handleDuetFocus, onDuetBlur: this.handleDuetBlur, onDuetOpen: this.handleDuetOpen, onDuetClose: this.handleDuetClose, class: {
        'date-picker-disabled': this.disabled,
        'date-picker-invalid': this.invalid,
      } })));
  }
  static get is() { return "gr-date-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["date-picker.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["date-picker.css"]
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
          "text": "Name of the date picker input."
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
          "text": "The date picker input's placeholder text."
        },
        "attribute": "placeholder",
        "reflect": false,
        "defaultValue": "''"
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
          "text": "Makes the date picker input component disabled. This prevents users from being able to\ninteract with the input, and conveys its inactive state to assistive technologies."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "direction": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GrDatePickerDirection",
          "resolved": "\"left\" | \"right\"",
          "references": {
            "GrDatePickerDirection": {
              "location": "import",
              "path": "../../interface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Forces the opening direction of the calendar modal to be always left or right.\nThis setting can be useful when the input is smaller than the opening date picker\nwould be as by default the picker always opens towards right."
        },
        "attribute": "direction",
        "reflect": false,
        "defaultValue": "'right'"
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Date value. Must be in IS0-8601 format: YYYY-MM-DD."
        },
        "attribute": "value",
        "reflect": true,
        "defaultValue": "''"
      },
      "min": {
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
          "text": "Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.\nThis setting can be used alone or together with the max property."
        },
        "attribute": "min",
        "reflect": false,
        "defaultValue": "''"
      },
      "max": {
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
          "text": "Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.\nThis setting can be used alone or together with the min property."
        },
        "attribute": "max",
        "reflect": false,
        "defaultValue": "''"
      },
      "firstDayOfWeek": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "DaysOfWeek",
          "resolved": "DaysOfWeek.Friday | DaysOfWeek.Monday | DaysOfWeek.Saturday | DaysOfWeek.Sunday | DaysOfWeek.Thursday | DaysOfWeek.Tuesday | DaysOfWeek.Wednesday",
          "references": {
            "DaysOfWeek": {
              "location": "import",
              "path": "../../enums"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.\nDefault is Monday."
        },
        "attribute": "first-day-of-week",
        "reflect": false,
        "defaultValue": "DaysOfWeek.Monday"
      },
      "isDateDisabled": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DateDisabledPredicate",
          "resolved": "(date: Date) => boolean",
          "references": {
            "DateDisabledPredicate": {
              "location": "import",
              "path": "../../interface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Controls which days are disabled and therefore disallowed.\nFor example, this can be used to disallow selection of weekends."
        },
        "defaultValue": "() => false"
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
          "text": "The date picker's label. Alternatively, you can use the label slot."
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
          "text": "The date picker's help text. Alternatively, you can use the help-text slot."
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
          "text": "The date picker's invalid text. Alternatively, you can use the invalid-text slot."
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
      "localization": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "localization",
          "resolved": "localization",
          "references": {
            "localization": {
              "location": "import",
              "path": "./date-localization"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specify date picker's localization.\nCan be used if localization is not supported internally.\nIf not specified, defaulted to use the browser's localization and if not supported, defaulted to english."
        },
        "defaultValue": "browserLocalization"
      }
    };
  }
  static get states() {
    return {
      "hasHelpTextSlot": {},
      "hasInvalidTextSlot": {},
      "hasLabelSlot": {}
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
          "text": "Emitted when a date is selected."
        },
        "complexType": {
          "original": "GrDatePickerChangeEvent",
          "resolved": "{ component: \"gr-date-picker\"; valueAsDate: Date; value: string; }",
          "references": {
            "GrDatePickerChangeEvent": {
              "location": "import",
              "path": "../../interface"
            }
          }
        }
      }, {
        "method": "grFocus",
        "name": "gr-focus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the date picker input gains focus."
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
          "text": "Emitted when the date picker input loses focus."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "grOpen",
        "name": "gr-open",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the panel opens."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "grClose",
        "name": "gr-close",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the panel closes."
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
          "text": "Sets focus on the date picker's input. Use this method instead of the global `focus()`.",
          "tags": []
        }
      },
      "show": {
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
          "text": "Show the calendar modal, moving focus to the calendar inside.",
          "tags": []
        }
      },
      "hide": {
        "complexType": {
          "signature": "(moveFocusToButton?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus\nreturning to the date picker's button. Default is true.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "helpText",
        "methodName": "handleLabelChange"
      }, {
        "propName": "invalidText",
        "methodName": "handleLabelChange"
      }, {
        "propName": "label",
        "methodName": "handleLabelChange"
      }];
  }
}
//# sourceMappingURL=date-picker.js.map
