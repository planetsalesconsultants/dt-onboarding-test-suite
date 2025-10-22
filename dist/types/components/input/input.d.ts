import { EventEmitter } from '../../stencil-public-runtime';
import { AutocompleteTypes, TextFieldTypes } from '../../interface';
/**
 * @slot label - The input's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the input.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 * @slot start - Used to prepend an icon or similar element to the input.
 * @slot end - Used to append an icon or similar element to the input.
 */
export declare class Input {
  private input;
  private inputId;
  private labelId;
  private helpTextId;
  private invalidTextId;
  private inheritedAttributes;
  el: HTMLGrInputElement;
  hasFocus: boolean;
  hasHelpTextSlot: boolean;
  hasInvalidTextSlot: boolean;
  hasLabelSlot: boolean;
  isPasswordVisible: boolean;
  /** The input's value attribute. */
  value: string;
  /** The type of control to display. The default type is text. */
  type: TextFieldTypes;
  /** Set to true to draw a pill-style input with rounded edges. */
  pill: boolean;
  /** Set to true to disable the input control. */
  disabled: boolean;
  /** The input's name. */
  name: string;
  /** The input's placeholder text. */
  placeholder: string;
  /** The input's size. */
  size: 'small' | 'medium' | 'large';
  /** The inputs's label. Alternatively, you can use the label slot. */
  label: string;
  /** Set to true to display a required indicator, adds an asterisk to label */
  requiredIndicator: boolean;
  /** The input's help text. Alternatively, you can use the help-text slot. */
  helpText: string;
  /** The input's invalid text. Alternatively, you can use the invalid-text slot. */
  invalidText: string;
  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  invalid: boolean;
  /** Set to true to add a clear button when the input is populated. */
  clearable: boolean;
  /** The input's inputmode attribute. */
  inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /** If `true`, the user cannot modify the value. */
  readonly: boolean;
  /** Specifies how many characters are allowed. */
  maxlength: number;
  /** If `true`, the element will have its spelling and grammar checked. */
  spellcheck: boolean;
  /**
   * The minimum value, which must not be greater than its maximum (max attribute) value.
   */
  min?: string;
  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  max?: string;
  /**
   * Works with the min and max attributes to limit the increments at which a value can be set.
   * Possible values are: `"any"` or a positive floating point number.
   */
  step?: string;
  /**
   * Specifies a regular expression that the input value is checked against.
   */
  pattern?: string;
  /**
   * A hint to the browser for which enter key to display.
   * Possible values: `"enter"`, `"done"`, `"go"`, `"next"`,
   * `"previous"`, `"search"`, and `"send"`.
   */
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
   * Available options: `"off"`, `"none"`, `"on"`, `"sentences"`, `"words"`, `"characters"`.
   */
  autocapitalize: string;
  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  autocomplete: AutocompleteTypes;
  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  autocorrect: 'on' | 'off';
  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  autofocus: boolean;
  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `gr-change` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  debounce: number;
  /**
   * Set to true to add a password toggle button for password inputs.
   */
  togglePassword: boolean;
  /**
   * Set to true to hide input appearances.
   */
  hideAppearance: boolean;
  protected debounceChanged(): void;
  handleLabelChange(): void;
  /**
   * Update the native input element when the value changes
   */
  protected valueChanged(): void;
  /** Emitted when the control's value changes. */
  grChange: EventEmitter<void>;
  /** Emitted when the clear button is activated. */
  grClear: EventEmitter<void>;
  /** Emitted when the control receives input. */
  grInput: EventEmitter<void>;
  /** Emitted when the control gains focus. */
  grFocus: EventEmitter<void>;
  /** Emitted when the control loses focus. */
  grBlur: EventEmitter<void>;
  connectedCallback(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  /** Sets focus on the input. */
  setFocus(options?: FocusOptions): Promise<void>;
  /** Removes focus from the input. */
  removeFocus(): Promise<void>;
  /** Selects all the text in the input. */
  select(): Promise<void>;
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): Promise<void>;
  /** Replaces a range of text with a new string. */
  setRangeText(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): Promise<void>;
  handleChange(): void;
  handleInput(): void;
  handleBlur(): void;
  handleFocus(): void;
  handleClearClick(event: MouseEvent): void;
  handleLabelClick(): void;
  handleSlotChange(): void;
  handlePasswordToggle(): void;
  render(): any;
}
