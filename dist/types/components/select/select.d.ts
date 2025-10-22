import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - The select's options in the form of menu items.
 * @slot label - The select's label. Alternatively, you can use the label prop.
 * @slot help-text - Help text that describes how to use the select. Alternatively, you can use the help-text prop.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
export declare class Select {
  private box;
  private dropdown;
  private inputId;
  private labelId;
  private helpTextId;
  private invalidTextId;
  private menu;
  private resizeObserver;
  private inheritedAttributes;
  el: HTMLGrSelectElement;
  hasFocus: boolean;
  hasHelpTextSlot: boolean;
  hasInvalidTextSlot: boolean;
  hasLabelSlot: boolean;
  isOpen: boolean;
  items: any[];
  displayLabel: string;
  displayTags: any[];
  /** Set to true to enable multiselect. */
  multiple: boolean;
  /**
   * The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the
   * number of additional items that are selected. Set to -1 to remove the limit.
   */
  maxTagsVisible: number;
  /** Set to true to disable the select control. */
  disabled: boolean;
  /** The select's name. */
  name: string;
  /** The select's placeholder text. */
  placeholder: string;
  /** The select's size. */
  size: 'small' | 'medium' | 'large';
  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`.
   */
  hoist: boolean;
  /** The value of the control. This will be a string or an array depending on `multiple`. */
  value: string | Array<string>;
  /** Set to true to draw a pill-style select with rounded edges. */
  pill: boolean;
  /** The select's label. Alternatively, you can use the label slot. */
  label: string;
  /** Set to true to display a required indicator, adds an asterisk to label */
  requiredIndicator: boolean;
  /** The select's help text. Alternatively, you can use the help-text slot. */
  helpText: string;
  /** The select's invalid text. Alternatively, you can use the invalid-text slot. */
  invalidText: string;
  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  invalid: boolean;
  /** Set to true to add a clear button when the select is populated. */
  clearable: boolean;
  handleDisabledChange(): void;
  handleLabelChange(): void;
  handleMultipleChange(): void;
  handleValueChange(): void;
  /** Emitted when the control's value changes. */
  grChange: EventEmitter<void>;
  /** Emitted when the control gains focus. */
  grFocus: EventEmitter<void>;
  /** Emitted when the control loses focus. */
  grBlur: EventEmitter<void>;
  connectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /** Sets focus on the select. */
  setFocus(): Promise<void>;
  getItemLabel(item: HTMLGrMenuItemElement): string;
  getItems(): HTMLGrMenuItemElement[];
  getValueAsArray(): string[];
  private handleBlur;
  private handleFocus;
  handleClearClick(event: MouseEvent): void;
  handleKeyDown(event: KeyboardEvent): void;
  handleLabelClick(): void;
  handleMenuSelect(event: CustomEvent): void;
  handleMenuShow(event: CustomEvent): void;
  handleMenuHide(): void;
  handleSlotChange(): void;
  handleTagInteraction(event: KeyboardEvent | MouseEvent): void;
  reportDuplicateItemValues(): void;
  resizeMenu(): void;
  syncItemsFromValue(): void;
  syncValueFromItems(): void;
  render(): any;
}
