import { FunctionalComponent } from '../../stencil-public-runtime';
export interface FormControlProps {
  /** The input id, used to map the input to the label */
  inputId: string;
  /** The size of the form control */
  size: 'small' | 'medium' | 'large';
  /** The label id, used to map the label to the input */
  labelId?: string;
  /** The label text (if the label slot isn't used) */
  label?: string;
  /** Whether or not a label slot has been provided. */
  hasLabelSlot?: boolean;
  /** The help text id, used to map the input to the help text */
  helpTextId?: string;
  /** The help text (if the help-text slot isn't used) */
  helpText?: string;
  /** Whether or not a help text slot has been provided. */
  hasHelpTextSlot?: boolean;
  /** The invalid text id, used to map the input to the invalid text */
  invalidTextId?: string;
  /** The invalid text (if the invalid-text slot isn't used) */
  invalidText?: string;
  /** Whether or not a invalid text slot has been provided. */
  hasInvalidTextSlot?: boolean;
  /** Whether or not the invalid text should be shown instead of the help text */
  invalid?: boolean;
  /** Whether or not to display a required indicator should be shown (asterisk) */
  requiredIndicator?: boolean;
  /** A function that gets called when the label is clicked. */
  onLabelClick?: (event: MouseEvent) => void;
}
declare const FormControl: FunctionalComponent<FormControlProps>;
export default FormControl;
