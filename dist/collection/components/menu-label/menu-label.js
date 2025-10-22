/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { Host, h } from '@stencil/core';
/**
 * @slot - The menu label's content.
 */
export class MenuLabel {
  render() {
    return (h(Host, null, h("slot", null)));
  }
  static get is() { return "gr-menu-label"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["menu-label.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["menu-label.css"]
    };
  }
}
//# sourceMappingURL=menu-label.js.map
