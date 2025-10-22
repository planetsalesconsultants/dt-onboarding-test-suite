import { EventEmitter } from '../stencil-public-runtime';
/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner button in `gr-button` should inherit
 * the `aria-label` attribute that developers set directly on `gr-button`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
export declare const inheritAttributes: (el: HTMLElement, attributes?: string[]) => {
  [k: string]: any;
};
/**
 * This method is used to add a hidden input to a host element that contains
 * a Shadow DOM. It does not add the input inside of the Shadow root which
 * allows it to be picked up inside of forms. It should contain the same
 * values as the host element.
 *
 * @param container The element where the input will be added
 * @param name The name of the input
 * @param value The value of the input
 * @param disabled If true, the input is disabled
 */
export declare const renderHiddenInput: (container: HTMLElement, name: string, value: string | undefined | null, disabled: boolean) => void;
export declare const addEventListener: (el: any, eventName: string, callback: any, opts?: any) => any;
export declare const removeEventListener: (el: any, eventName: string, callback: any, opts?: any) => any;
export declare const debounceEvent: (event: EventEmitter, wait: number) => EventEmitter;
export declare const debounce: (func: (...args: any[]) => void, wait?: number) => (...args: any[]) => any;
