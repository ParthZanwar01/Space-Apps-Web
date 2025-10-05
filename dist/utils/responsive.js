export class ResponsiveManager {
    constructor() {
        this.breakpoints = {
            mobile: 500,
            tablet: 700,
            desktop: 900,
            large: 1200
        };
    }
    static getInstance() {
        if (!ResponsiveManager.instance) {
            ResponsiveManager.instance = new ResponsiveManager();
        }
        return ResponsiveManager.instance;
    }
    getWindowDimensions() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    getBreakpoint() {
        const width = this.getWindowDimensions().width;
        if (width <= this.breakpoints.mobile)
            return 'mobile';
        if (width <= this.breakpoints.tablet)
            return 'tablet';
        if (width <= this.breakpoints.desktop)
            return 'desktop';
        if (width <= this.breakpoints.large)
            return 'large';
        return 'xl';
    }
    isMobile() {
        return this.getWindowDimensions().width <= this.breakpoints.mobile;
    }
    isTablet() {
        const width = this.getWindowDimensions().width;
        return width > this.breakpoints.mobile && width <= this.breakpoints.tablet;
    }
    isDesktop() {
        const width = this.getWindowDimensions().width;
        return width > this.breakpoints.tablet && width <= this.breakpoints.desktop;
    }
    isLarge() {
        return this.getWindowDimensions().width > this.breakpoints.desktop;
    }
    getSlideWidth() {
        const width = this.getWindowDimensions().width;
        if (width <= this.breakpoints.mobile)
            return 200; // 180px + 20px gap
        if (width <= this.breakpoints.tablet)
            return 240; // 220px + 20px gap
        if (width <= this.breakpoints.desktop)
            return 270; // 250px + 20px gap
        return 420; // 400px + 20px gap
    }
    addResizeListener(callback) {
        window.addEventListener('resize', callback);
    }
    removeResizeListener(callback) {
        window.removeEventListener('resize', callback);
    }
}
//# sourceMappingURL=responsive.js.map