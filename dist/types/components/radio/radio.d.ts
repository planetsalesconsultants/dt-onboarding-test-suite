import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @slot - The radio's label.
 */
export declare class Radio {
  private inputId;
  private labelId;
  private input;
  private radioGroup;
  private inheritedAttributes;
  el: HTMLGrRadioElement;
  hasFocus: boolean;
  /** The radio's value attribute. */
  value: string;
  /** Set to true to disable the radio. */
  disabled: boolean;
  /** Set to true to draw the radio in a checked state. */
  checked: boolean;
  /** The radio's alignment attribute. */
  alignment: 'top' | 'center' | 'bottom';
  /**
   * The tabindex of the radio button.
   * @internal
   */
  buttonTabindex: number;
  /** Emitted when the control loses focus. */
  grBlur: EventEmitter;
  /** Emitted when the control gains focus. */
  grFocus: EventEmitter;
  /** @internal */
  setButtonTabindex(value: number): Promise<void>;
  connectedCallback(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  /** Sets focus on the radio. */
  setFocus(options?: FocusOptions): Promise<void>;
  /** Removes focus from the radio. */
  removeFocus(): Promise<void>;
  private updateState;
  handleBlur(): void;
  handleFocus(): void;
  render(): any;
}
