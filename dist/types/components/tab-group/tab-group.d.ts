export declare class TabGroup {
  private resizeObserver;
  private mutationObserver;
  private tabs;
  private panels;
  private activeTab?;
  el: HTMLGrTabGroupElement;
  placement: 'top' | 'bottom' | 'start' | 'end';
  /**
  * The tab's size.
  */
  tabSize: 'small' | 'medium' | 'large';
  /**
   * Set to use a popstate eventlistner, to use route navigation.
   */
  routeNavigation: boolean;
  connectedCallback(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  getTabs(): [HTMLGrTabElement];
  getPanels(): [HTMLGrTabPanelElement];
  getActiveTab(): HTMLGrTabElement;
  handleClick(event: MouseEvent): void;
  setActiveTab(tab: HTMLGrTabElement, options?: {
    emitEvents?: boolean;
    scrollBehavior?: 'auto' | 'smooth';
  }): void;
  setAriaLabels(): void;
  handleIndicatorChange(): void;
  repositionIndicator(): void;
  preventIndicatorTransition(): void;
  handleTabsPanelsChange(): void;
  render(): any;
}
