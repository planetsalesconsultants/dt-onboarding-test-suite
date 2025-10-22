/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-e8cb22d3.js';
import { s as scrollIntoView } from './scroll-30882dab.js';

const tabCss = ":host{display:inline-block;--color:var(--gr-color-dark);--color-focused:var(--gr-color-primary-contrast);--color-disabled:var(--gr-color-medium);display:inline-flex;align-items:center;font-family:var(--gr-font-family);font-size:var(--gr-font-size-medium);font-weight:var(--gr-font-weight-normal);color:var(--color);padding:var(--gr-spacing-x-small) var(--gr-spacing-medium);white-space:nowrap;user-select:none;cursor:pointer;transition:500ms box-shadow, 500ms color}:host:hover:not(.tab-disabled){color:var(--color-disabled)}:host(.tab-focused:not(.tab-disabled)){outline:none}:host(.tab-active:not(.tab-disabled)){color:var(--gr-color-primary)}:host(.tab-disabled){opacity:0.5;cursor:not-allowed}";

const Tab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.grFocus = createEvent(this, "gr-focus", 7);
    this.grBlur = createEvent(this, "gr-blur", 7);
    this.hasFocus = false;
    this.panel = '';
    this.active = false;
    this.disabled = false;
  }
  connectedCallback() {
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /** Sets focus on the tab. */
  async setFocus() {
    this.el.focus();
  }
  /** Removes focus from the tab. */
  async removeFocus() {
    this.el.blur();
  }
  onBlur() {
    this.hasFocus = false;
    this.grBlur.emit();
  }
  onFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
  }
  render() {
    const { active, disabled } = this;
    return (h(Host, { class: {
        tab: true,
        'tab-active': active,
        'tab-disabled': disabled,
        'tab-focused': this.hasFocus,
      }, role: "tab", "aria-disabled": disabled ? 'true' : 'false', "aria-selected": active ? 'true' : 'false', tabIndex: disabled || !active ? 0 : null, onFocus: this.onFocus, onBlur: this.onBlur, slot: "nav" }, h("slot", null)));
  }
  get el() { return getElement(this); }
};
Tab.style = tabCss;

//
// Emits a custom event with more convenient defaults.
//
function emit(el, name, options) {
  const event = new CustomEvent(name, Object.assign({ bubbles: true, cancelable: false, composed: true, detail: {} }, options));
  el.dispatchEvent(event);
  return event;
}

const tabGroupCss = ":host{--track-color:var(--gr-color-light-shade);--indicator-color:var(--gr-color-primary);--border-track-width:var(--gr-border-width-small);--border-width:var(--gr-border-width-medium);display:block}.tab-group{display:flex;border:solid 1px transparent;border-radius:0}.tab-group .tab-group__tabs{display:flex;position:relative}.tab-group .tab-group__indicator{position:absolute;left:0;box-sizing:border-box;transition:150ms transform ease, 150ms width ease}.tab-group--has-scroll-controls .tab-group__nav-container{position:relative;padding:0 var(--gr-spacing-x-large)}.tab-group--top{flex-direction:column}.tab-group--top .tab-group__nav-container{order:1}.tab-group--top .tab-group__nav{display:flex;overflow-x:auto;scrollbar-width:none}.tab-group--top .tab-group__nav::-webkit-scrollbar{width:0;height:0}.tab-group--top .tab-group__tabs{flex:1 1 auto;position:relative;flex-direction:row;border-bottom:solid var(--border-track-width) var(--track-color)}.tab-group--top .tab-group__indicator{bottom:0;border-bottom:solid var(--border-width) var(--indicator-color)}.tab-group--top .tab-group__body{order:2}.tab-group--top ::slotted(gr-tab-panel){--padding:var(--gr-spacing-medium) 0}.tab-group--bottom{flex-direction:column}.tab-group--bottom .tab-group__nav-container{order:2}.tab-group--bottom .tab-group__nav{display:flex;overflow-x:auto;scrollbar-width:none}.tab-group--bottom .tab-group__nav::-webkit-scrollbar{width:0;height:0}.tab-group--bottom .tab-group__tabs{flex:1 1 auto;position:relative;flex-direction:row;border-top:solid var(--border-track-width) var(--track-color)}.tab-group--bottom .tab-group__indicator{top:0;border-top:solid var(--border-width) var(--indicator-color)}.tab-group--bottom .tab-group__body{order:1}.tab-group--bottom ::slotted(gr-tab-panel){--padding:var(--gr-spacing-medium) 0}.tab-group--start{flex-direction:row}.tab-group--start .tab-group__nav-container{order:1}.tab-group--start .tab-group__tabs{flex:0 0 auto;flex-direction:column;border-right:solid var(--border-track-width) var(--track-color)}.tab-group--start .tab-group__indicator{right:0;border-right:solid var(--border-width) var(--indicator-color)}.tab-group--start .tab-group__body{flex:1 1 auto;order:2}.tab-group--start ::slotted(gr-tab-panel){--padding:0 var(--gr-spacing-medium)}.tab-group--end{flex-direction:row}.tab-group--end .tab-group__nav-container{order:2}.tab-group--end .tab-group__tabs{flex:0 0 auto;flex-direction:column;border-left:solid var(--border-track-width) var(--track-color)}.tab-group--end .tab-group__indicator{left:0;border-left:solid var(--border-width) var(--indicator-color)}.tab-group--end .tab-group__body{flex:1 1 auto;order:1}.tab-group--end ::slotted(gr-tab-panel){--padding:0 var(--gr-spacing-medium)}.tab-small slot[name=nav]::slotted(.tab){padding:var(--gr-spacing-xxx-small) var(--gr-spacing-medium)}.tab-large slot[name=nav]::slotted(.tab){padding:var(--gr-spacing-medium)}";

const TabGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "placement": ["handleIndicatorChange"]
  }; }
};
TabGroup.style = tabGroupCss;

const tabPanelCss = ":host{--padding:0;display:block}.tab-panel{border:solid 1px transparent;padding:var(--padding)}";

const TabPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.active = false;
  }
  render() {
    const { active } = this;
    this.el.style.display = this.active ? 'block' : 'none';
    return (h("div", { part: "base", class: "tab-panel", role: "tabpanel", "aria-hidden": active ? 'false' : 'true' }, h("slot", null)));
  }
  get el() { return getElement(this); }
};
TabPanel.style = tabPanelCss;

export { Tab as gr_tab, TabGroup as gr_tab_group, TabPanel as gr_tab_panel };

//# sourceMappingURL=gr-tab_3.entry.js.map