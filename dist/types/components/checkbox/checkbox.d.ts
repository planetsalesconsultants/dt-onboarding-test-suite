import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - The checkboxes label.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
export declare class Checkbox {
  private inputId;
  private labelId;
  private invalidTextId;
  private input;
  private inheritedAttributes;
  el: HTMLGrCheckboxElement;
  hasInvalidTextSlot: boolean;
  hasFocus: boolean;
  /**
   * The checkbox's value attribute.
   */
  value: string;
  /**
   * Set to true to disable the checkbox.
   */
  disabled: boolean;
  /**
   * The name of the control, which is submitted with the form data.
   */
  name: string;
  /** Set to true to draw the checkbox in a checked state. */
  checked: boolean;
  /** Set to true to draw the checkbox in an indeterminate state. */
  indeterminate: boolean;
  /** The radio group's invalid text. Alternatively, you can use the invalid-text slot. */
  invalidText: string;
  /** Set to true to indicate this field is invalid. Will display the invalid text. */
  invalid: boolean;
  /** The checkbox's alignment. */
  alignment: 'top' | 'center' | 'bottom';
  /** Emitted when the control loses focus. */
  grBlur: EventEmitter<void>;
  /** Emitted when the control gains focus. */
  grFocus: EventEmitter<void>;
  /** Emitted when the control's checked state changes. */
  grChange: EventEmitter<void>;
  handleCheckedChange(): void;
  handleInvalidTextChange(): void;
  connectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /** Sets focus on the checkbox. */
  setFocus(options?: FocusOptions): Promise<void>;
  /** Removes focus from the checkbox. */
  removeFocus(): Promise<void>;
  handleClick(): void;
  handleBlur(): void;
  handleFocus(): void;
  handleMouseDown(event: MouseEvent): void;
  handleSlotChange(): void;
  render(): any;
}
