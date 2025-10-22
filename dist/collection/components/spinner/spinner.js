/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h } from '@stencil/core';
export class Spinner {
  render() {
    return h("span", { class: "spinner", "aria-busy": "true", "aria-live": "polite" });
  }
  static get is() { return "gr-spinner"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["spinner.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["spinner.css"]
    };
  }
}
//# sourceMappingURL=spinner.js.map
