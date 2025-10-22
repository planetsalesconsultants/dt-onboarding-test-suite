import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot label - The textarea's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the textarea.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
export declare class Textarea {
  private inputId;
  private labelId;
  private helpTextId;
  private invalidTextId;
  private textarea;
  private inheritedAttributes;
  el: HTMLGrTextareaElement;
  hasFocus: boolean;
  hasHelpTextSlot: boolean;
  hasInvalidTextSlot: boolean;
  hasLabelSlot: boolean;
  /** The textarea's size. */
  size: 'small' | 'medium' | 'large';
  /** The textarea's name attribute. */
  name: string;
  /** The textarea's value attribute. */
  value: string;
  /** The textarea's label. Alternatively, you can use the label slot. */
  label: string | undefined;
  /** Set to true to display a required indicator, adds an asterisk to label */
  requiredIndicator: boolean;
  /** The textarea's help text. Alternatively, you can use the help-text slot. */
  helpText: string;
  /** The input's invalid text. Alternatively, you can use the invalid-text slot. */
  invalidText: string;
  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  invalid: boolean;
  /** The textarea's placeholder text. */
  placeholder: string;
  /** The number of rows to display by default. */
  rows: number;
  /** The number of max rows */
  maxHeight: number;
  /** Controls how the textarea can be resized. */
  resize: 'none' | 'vertical' | 'auto';
  /** Set to true to disable the textarea. */
  disabled: boolean;
  /** If `true`, the user cannot modify the value. */
  readonly: boolean;
  /** Specifies how many characters are allowed. */
  maxlength: number;
  /** The textarea's inputmode attribute. */
  inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /** If `true`, the element will have its spelling and grammar checked. */
  spellcheck: boolean;
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
  protected debounceChanged(): void;
  /**
   * Update the native input element when the value changes
   */
  protected valueChanged(): void;
  handleLabelChange(): void;
  handleRowsChange(): void;
  /** Emitted when the textarea's value changes. */
  grChange: EventEmitter<void>;
  /** Emitted when the textarea receives input. */
  grInput: EventEmitter<void>;
  /** Emitted when the textarea has focus. */
  grFocus: EventEmitter<void>;
  /** Emitted when the textarea loses focus. */
  grBlur: EventEmitter<void>;
  connectedCallback(): void;
  componentWillLoad(): void;
  /** Sets focus on the textarea. */
  setFocus(options?: FocusOptions): Promise<void>;
  /** Removes focus fromt the textarea. */
  removeFocus(): Promise<void>;
  /** Selects all the text in the input. */
  select(): Promise<void>;
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): Promise<void>;
  /** Replaces a range of text with a new string. */
  setRangeText(replacement: string, start: number, end: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): Promise<void>;
  setTextareaHeight(): Promise<void>;
  handleChange(): void;
  handleInput(): void;
  handleBlur(): void;
  handleFocus(): void;
  handleLabelClick(): void;
  handleSlotChange(): void;
  render(): any;
}
