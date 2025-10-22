/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { h } from '@stencil/core';
import { scrollIntoView } from '../../utils/scroll';
import { emit } from '../../utils/event';
export class TabGroup {
  constructor() {
    this.tabs = [];
    this.panels = [];
    this.placement = 'top';
    this.tabSize = 'medium';
    this.routeNavigation = false;
  }
  connectedCallback() {
    this.handleClick = this.handleClick.bind(this);
    this.handleTabsPanelsChange = this.handleTabsPanelsChange.bind(this);
    this.resizeObserver = new ResizeObserver(() => {
      this.preventIndicatorTransition();
      this.repositionIndicator();
    });
    this.mutationObserver = new MutationObserver(mutations => {
      // Update aria labels when the DOM changes
      if (mutations.some(m => !['aria-labelledby', 'aria-controls'].includes(m.attributeName))) {
        setTimeout(() => this.setAriaLabels());
      }
    });
    if (this.routeNavigation === true) {
      window.addEventListener('popstate', () => {
        this.handleTabsPanelsChange();
      });
    }
  }
  componentDidLoad() {
    const tabGroup = this.el.shadowRoot.querySelector('.tab-group');
    const nav = this.el.shadowRoot.querySelector('slot[name="nav"]');
    this.handleTabsPanelsChange();
    this.mutationObserver.observe(this.el, { attributes: true, childList: true, subtree: true });
    this.resizeObserver.observe(nav);
    // Set initial tab state when the tabs first become visible
    const intersectionObserver = new IntersectionObserver((entries, observer) => {
      var _a;
      if (entries[0].intersectionRatio > 0) {
        this.setAriaLabels();
        this.setActiveTab((_a = this.getActiveTab()) !== null && _a !== void 0 ? _a : this.tabs[0], { emitEvents: false });
        observer.unobserve(entries[0].target);
      }
    });
    intersectionObserver.observe(tabGroup);
  }
  disconnectedCallback() {
    const nav = this.el.shadowRoot.querySelector('slot[name="nav"]');
    this.mutationObserver.disconnect();
    this.resizeObserver.unobserve(nav);
  }
  getTabs() {
    const slot = this.el.shadowRoot.querySelector('slot[name="nav"]');
    return [...slot.assignedElements({ flatten: true })].filter((el) => {
      return el.tagName.toLowerCase() === 'gr-tab';
    });
  }
  getPanels() {
    var _a;
    const body = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.tab-group__body');
    const slot = body.querySelector('slot');
    return [...slot.assignedElements({ flatten: true })].filter((el) => el.tagName.toLowerCase() === 'gr-tab-panel');
  }
  getActiveTab() {
    return this.tabs.find(el => el.active);
  }
  handleClick(event) {
    const target = event.target;
    const tab = target.closest('gr-tab');
    const tabGroup = tab === null || tab === void 0 ? void 0 : tab.closest('gr-tab-group');
    if (tabGroup !== this.el) {
      return;
    }
    if (tab !== null) {
      this.setActiveTab(tab, { scrollBehavior: 'smooth' });
    }
  }
  setActiveTab(tab, options) {
    const nav = this.el.shadowRoot.querySelector('slot[name="nav"]');
    options = Object.assign({ emitEvents: true, scrollBehavior: 'auto' }, options);
    tab.setFocus();
    if (tab !== this.activeTab) {
      const previousTab = this.activeTab;
      this.activeTab = tab;
      // Sync active tab and panel
      this.tabs.map(el => (el.active = el === this.activeTab));
      this.panels.map(el => { var _a; return (el.active = el.name === ((_a = this.activeTab) === null || _a === void 0 ? void 0 : _a.panel)); });
      this.handleIndicatorChange();
      if (['top', 'bottom'].includes(this.placement)) {
        scrollIntoView(this.activeTab, nav, 'horizontal', options.scrollBehavior);
      }
      // Emit events/
      if (options.emitEvents) {
        if (previousTab) {
          emit(this.el, 'gr-tab-hide', { detail: { name: previousTab.panel } });
        }
        emit(this.el, 'gr-tab-show', { detail: { name: this.activeTab.panel } });
      }
    }
  }
  setAriaLabels() {
    // Link each tab with its corresponding panel
    this.tabs.forEach(tab => {
      const panel = this.panels.find(el => el.name === tab.panel);
      if (panel) {
        tab.setAttribute('aria-controls', panel.getAttribute('id'));
        panel.setAttribute('aria-labelledby', tab.getAttribute('id'));
      }
    });
  }
  handleIndicatorChange() {
    var _a;
    const tab = this.getActiveTab();
    const indicator = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.tab-group__indicator');
    if (tab) {
      indicator.style.display = 'block';
      this.repositionIndicator();
    }
    else {
      indicator.style.display = 'none';
    }
  }
  repositionIndicator() {
    var _a;
    const currentTab = this.getActiveTab();
    const indicator = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.tab-group__indicator');
    if (!currentTab) {
      return;
    }
    const width = currentTab.clientWidth;
    const height = currentTab.clientHeight;
    const allTabs = this.tabs;
    const precedingTabs = allTabs.slice(0, allTabs.indexOf(currentTab));
    const offset = precedingTabs.reduce((previous, current) => ({
      left: previous.left + current.clientWidth,
      top: previous.top + current.clientHeight
    }), { left: 0, top: 0 });
    switch (this.placement) {
      case 'top':
      case 'bottom':
        indicator.style.width = `${width}px`;
        indicator.style.height = 'auto';
        indicator.style.transform = `translateX(${offset.left}px)`;
        break;
      case 'start':
      case 'end':
        indicator.style.width = 'auto';
        indicator.style.height = `${height}px`;
        indicator.style.transform = `translateY(${offset.top}px)`;
        break;
    }
  }
  preventIndicatorTransition() {
    const indicator = this.el.querySelector('.tab-group__indicator');
    const transitionValue = indicator.style.transition;
    indicator.style.transition = 'none';
    requestAnimationFrame(() => {
      indicator.style.transition = transitionValue;
    });
  }
  // Store tabs and panels in a cache.
  handleTabsPanelsChange() {
    this.tabs = this.getTabs();
    this.panels = this.getPanels();
    this.handleIndicatorChange();
  }
  render() {
    const { placement, tabSize } = this;
    return (h("div", { class: {
        'tab-group': true,
        'tab-group--top': placement === 'top',
        'tab-group--bottom': placement === 'bottom',
        'tab-group--start': placement === 'start',
        'tab-group--end': placement === 'end',
      }, onClick: this.handleClick }, h("div", { class: "tab-group__nav-container", part: "nav" }, h("div", { class: "tab-group__nav" }, h("div", { part: "tabs", class: { 'tab-group__tabs': true, [`tab-${tabSize}`]: true, }, role: "tablist" }, h("div", { part: "active-tab-indicator", class: "tab-group__indicator" }), h("slot", { name: "nav", onSlotchange: this.handleTabsPanelsChange })))), h("div", { part: "body", class: "tab-group__body" }, h("slot", { onSlotchange: this.handleTabsPanelsChange }))));
  }
  static get is() { return "gr-tab-group"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["tab-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["tab-group.css"]
    };
  }
  static get properties() {
    return {
      "placement": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'top' | 'bottom' | 'start' | 'end'",
          "resolved": "\"bottom\" | \"end\" | \"start\" | \"top\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "placement",
        "reflect": false,
        "defaultValue": "'top'"
      },
      "tabSize": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'small' | 'medium' | 'large'",
          "resolved": "\"large\" | \"medium\" | \"small\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The tab's size."
        },
        "attribute": "tab-size",
        "reflect": true,
        "defaultValue": "'medium'"
      },
      "routeNavigation": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set to use a popstate eventlistner, to use route navigation."
        },
        "attribute": "route-navigation",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "placement",
        "methodName": "handleIndicatorChange"
      }];
  }
}
//# sourceMappingURL=tab-group.js.map
