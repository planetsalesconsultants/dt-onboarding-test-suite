import { EventEmitter } from '../../stencil-public-runtime';
export declare class Tab {
  el: HTMLElement;
  hasFocus: boolean;
  /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
  panel: string;
  active: boolean;
  /** Set to true to draw the tab in a disabled state. */
  disabled: boolean;
  /**
   * Emitted when the button has focus.
   */
  grFocus: EventEmitter<void>;
  /**
   * Emitted when the button loses focus.
   */
  grBlur: EventEmitter<void>;
  connectedCallback(): void;
  /** Sets focus on the tab. */
  setFocus(): Promise<void>;
  /** Removes focus from the tab. */
  removeFocus(): Promise<void>;
  onBlur(): void;
  onFocus(): void;
  render(): any;
}
