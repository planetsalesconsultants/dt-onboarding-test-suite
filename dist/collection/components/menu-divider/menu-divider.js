/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { Host, h } from '@stencil/core';
export class MenuDivider {
  render() {
    return (h(Host, null, h("div", { class: "menu-divider", role: "separator", "aria-hidden": "true" })));
  }
  static get is() { return "gr-menu-divider"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["menu-divider.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["menu-divider.css"]
    };
  }
}
//# sourceMappingURL=menu-divider.js.map
