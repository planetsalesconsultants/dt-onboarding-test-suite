/**
 * Given a slot, this function iterates over all of its assigned text nodes and returns the concatenated text as a
 * string. This is useful because we can't use slot.textContent as an alternative.
*/
export declare function getTextContent(slot: HTMLSlotElement): string;
export declare function hasSlot(el: HTMLElement, name?: string): boolean;
