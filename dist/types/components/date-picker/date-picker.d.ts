import { EventEmitter } from '../../stencil-public-runtime';
import { DaysOfWeek } from '../../enums';
import { localization } from './date-localization';
import { DateDisabledPredicate, GrDatePickerChangeEvent, GrDatePickerDirection } from '../../interface';
import { DuetDatePickerChangeEvent } from '@duetds/date-picker/dist/types/components/duet-date-picker/duet-date-picker';
export declare class DatePicker {
  private inputId;
  private labelId;
  private helpTextId;
  private invalidTextId;
  private duetDatePicker;
  el: HTMLGrDatePickerElement;
  hasHelpTextSlot: boolean;
  hasInvalidTextSlot: boolean;
  hasLabelSlot: boolean;
  /**
   * Name of the date picker input.
   */
  name: string;
  /** The date picker input's placeholder text. */
  placeholder: string;
  /**
   * Makes the date picker input component disabled. This prevents users from being able to
   * interact with the input, and conveys its inactive state to assistive technologies.
   */
  disabled: boolean;
  /**
   * Forces the opening direction of the calendar modal to be always left or right.
   * This setting can be useful when the input is smaller than the opening date picker
   * would be as by default the picker always opens towards right.
   */
  direction: GrDatePickerDirection;
  /**
   * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  value: string;
  /**
   * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the max property.
   */
  min: string;
  /**
   * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the min property.
   */
  max: string;
  /**
   * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
   * Default is Monday.
   */
  firstDayOfWeek: DaysOfWeek;
  /**
   * Controls which days are disabled and therefore disallowed.
   * For example, this can be used to disallow selection of weekends.
   */
  isDateDisabled: DateDisabledPredicate;
  /** The date picker's label. Alternatively, you can use the label slot. */
  label: string;
  /** Set to true to display a required indicator, adds an asterisk to label */
  requiredIndicator: boolean;
  /** The date picker's help text. Alternatively, you can use the help-text slot. */
  helpText: string;
  /** The date picker's invalid text. Alternatively, you can use the invalid-text slot. */
  invalidText: string;
  /** Set to true to indicate this field is invalid. Will display the invalid text instead of the help text */
  invalid: boolean;
  /**
   * Specify date picker's localization.
   * Can be used if localization is not supported internally.
   * If not specified, defaulted to use the browser's localization and if not supported, defaulted to english.
   */
  localization: localization;
  handleLabelChange(): void;
  /** Emitted when a date is selected. */
  grChange: EventEmitter<GrDatePickerChangeEvent>;
  /** Emitted when the date picker input gains focus. */
  grFocus: EventEmitter<void>;
  /** Emitted when the date picker input loses focus. */
  grBlur: EventEmitter<void>;
  /** Emitted when the panel opens. */
  grOpen: EventEmitter<void>;
  /** Emitted when the panel closes. */
  grClose: EventEmitter<void>;
  connectedCallback(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  setFocus(): Promise<void>;
  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  show(): Promise<void>;
  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  hide(moveFocusToButton?: boolean): Promise<void>;
  handleSlotChange(): void;
  handleLabelClick(): void;
  handleDuetChange(event: CustomEvent<DuetDatePickerChangeEvent>): void;
  handleDuetFocus(event: CustomEvent): void;
  handleDuetBlur(event: CustomEvent): void;
  handleDuetOpen(event: CustomEvent): void;
  handleDuetClose(event: CustomEvent): void;
  render(): any;
}
