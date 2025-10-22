import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - The tag's content.
 */
export declare class Tag {
  /** The tag's type. */
  type: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  /** The tag's size. */
  size: 'small' | 'medium' | 'large';
  /** Set to true to draw a pill-style tag with rounded edges. */
  pill: boolean;
  /** Set to true to make the tag clearable. */
  clearable: boolean;
  /** Set to true to make the tag truncated. */
  truncate: boolean;
  /** The tag's title. */
  title: string;
  /** Emitted when the clear button is activated. */
  grClear: EventEmitter<void>;
  connectedCallback(): void;
  handleClearClick(): void;
  render(): any;
}
