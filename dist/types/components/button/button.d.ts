import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot icon-only - Should be used on an icon in a button that has no text.
 * @slot start - Content is placed to the left of the button text (will be to the right when we support right-to-left direction)
 * @slot end - Content is placed to the right of the button text (will be to the left when we support right-to-left direction)
 */
export declare class Button {
  private inheritedAttributes;
  private button;
  el: HTMLElement;
  /**
   * The different variants.
   * The options are: `"default"`, `"primary"`, `"secondary"`, `"danger"`, and `"plain"`.
   */
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'plain';
  /**
   * If `true`, the user cannot interact with the button.
   */
  disabled: boolean;
  /**
   * Set to true to draw the button in a loading state.
   */
  loading: boolean;
  /**
   * The button's size.
   */
  size: 'small' | 'medium' | 'large';
  /**
   * Set to true to draw the button with a caret for use with dropdowns, popovers, etc.
   */
  caret: boolean;
  /**
   * Set to true to draw a pill-style button with rounded edges.
   */
  pill: boolean;
  /**
   * Set to `"block"` for a full-width button or to `"full"` for a full-width button
   * without left and right borders.
   */
  expand?: 'full' | 'block';
  /**
   * Set to true to draw a circle button.
   */
  circle: boolean;
  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   */
  href: string | undefined;
  /**
   * Specifies where to display the linked URL.
   * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
   */
  target: string | undefined;
  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  rel: string | undefined;
  /**
   * The type of the button.
   */
  type: 'submit' | 'reset' | 'button';
  /**
   * Emitted when the button has focus.
   */
  grFocus: EventEmitter<void>;
  /**
   * Emitted when the button loses focus.
   */
  grBlur: EventEmitter<void>;
  componentWillLoad(): void;
  /** Sets focus on the button. */
  setFocus(options?: FocusOptions): Promise<void>;
  /** Removes focus from the button. */
  removeFocus(): Promise<void>;
  private handleClick;
  private onFocus;
  private onBlur;
  render(): any;
}
