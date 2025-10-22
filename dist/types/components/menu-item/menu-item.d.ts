/**
 * @slot - The menu item's label.
 * @slot start - Content is placed to the left of the menu item's label (will be to the right when we support right-to-left direction)
 * @slot end - Content is placed to the right of the menu item's label (will be to the left when we support right-to-left direction)
 */
export declare class MenuItem {
  el: HTMLElement;
  hasFocus: boolean;
  /** Set to true to draw the item in a checked state. */
  checked: boolean;
  /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
  value: string;
  /** Set to true to draw the menu item in a disabled state. */
  disabled: boolean;
  connectedCallback(): void;
  /** Sets focus on the menu item. */
  setFocus(options?: FocusOptions): Promise<void>;
  /** Removes focus from the menu item. */
  removeFocus(): Promise<void>;
  handleBlur(): void;
  handleFocus(): void;
  handleMouseEnter(): void;
  handleMouseLeave(): void;
  render(): any;
}
