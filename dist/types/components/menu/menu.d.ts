import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - The menu's content, including menu items, menu dividers, and menu labels.
 */
export declare class Menu {
  private typeToSelectString;
  private typeToSelectTimeout;
  private menu;
  /** Emitted when a menu item is selected. */
  grSelect: EventEmitter<{
    item: HTMLGrMenuItemElement;
  }>;
  connectedCallback(): void;
  /**
   * Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.
   * The key passed will be appended to the internal query and the selection will be updated. After a brief period, the
   * internal query is cleared automatically. This method is intended to be used with the keydown event. Useful for
   * enabling type-to-select when the menu doesn't have focus.
   */
  typeToSelect(key: string): Promise<void>;
  getItems(): [HTMLGrMenuItemElement];
  getActiveItem(): HTMLGrMenuItemElement;
  setActiveItem(item: HTMLGrMenuItemElement): void;
  handleClick(event: MouseEvent): void;
  handleKeyDown(event: KeyboardEvent): void;
  render(): any;
}
