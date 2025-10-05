import type { WindowDimensions } from '../types/index.js';
export declare class ResponsiveManager {
    private static instance;
    private breakpoints;
    private constructor();
    static getInstance(): ResponsiveManager;
    getWindowDimensions(): WindowDimensions;
    getBreakpoint(): string;
    isMobile(): boolean;
    isTablet(): boolean;
    isDesktop(): boolean;
    isLarge(): boolean;
    getSlideWidth(): number;
    addResizeListener(callback: () => void): void;
    removeResizeListener(callback: () => void): void;
}
//# sourceMappingURL=responsive.d.ts.map