/**
 * @slot - The default slot where fields are placed.
 * @slot label - The field group label. Recommended for proper accessibility. Alternatively, you can use the label prop.
 */
export declare class FieldGroup {
  el: HTMLElement;
  hasLabelSlot: boolean;
  /** The field group label. Recommended for proper accessibility. Alternatively, you can use the label slot. */
  label: string;
  /** Render the fields horizontal instead of vertical */
  horizontal: boolean;
  handleLabelChange(): void;
  connectedCallback(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  handleSlotChange(): void;
  render(): any;
}
