import { EventEmitter } from '../../stencil-public-runtime';
import { RadioGroupChangeEventDetail } from './radio-group-interface';
/**
 * @slot - The default slot where radio controls are placed.
 * @slot label - The radio group label. Required for proper accessibility. Alternatively, you can use the label prop.
 * @slot invalid-text - Invalid text tells a user how to fix the error. Alternatively, you can use the invalid-text prop.
 */
export declare class RadioGroup {
  private inputId;
  private invalidTextId;
  el: HTMLElement;
  hasLabelSlot: boolean;
  hasInvalidTextSlot: boolean;
  /** If `true`, the radios can be deselected. */
  allowEmptySelection: boolean;
  /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
  label: string;
  /** Set to true to display a required indicator, adds an asterisk to label */
  requiredIndicator: boolean;
  /** The radio group's invalid text. Alternatively, you can use the invalid-text slot. */
  invalidText: string;
  /** Set to true to indicate this field is invalid. Will display the invalid text. */
  invalid: boolean;
  /** Render the radios horizontal instead of vertical */
  horizontal: boolean;
  /** The name of the control, which is submitted with the form data. */
  name: string;
  /** the value of the radio group. */
  value?: any | null;
  valueChanged(value: any | undefined): void;
  handleLabelChange(): void;
  /** Emitted when the value has changed. */
  grChange: EventEmitter<RadioGroupChangeEventDetail>;
  connectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private setRadioTabindex;
  private getRadios;
  private onClick;
  onKeydown(ev: any): void;
  handleSlotChange(): void;
  render(): any;
}
