import type { NavigationItem } from '../types/index.js';
export declare class Navigation {
    private navElement;
    private menuBtn;
    private closeBtn;
    private fullScreenManager;
    private isMenuOpen;
    constructor();
    private init;
    private setupEventListeners;
    private setupFullScreenToggle;
    private toggleMenu;
    private openMenu;
    private closeMenu;
    private handleAccordionToggle;
    setActivePage(pageId: string): void;
    createNavigationItems(): NavigationItem[];
    destroy(): void;
}
//# sourceMappingURL=Navigation.d.ts.map