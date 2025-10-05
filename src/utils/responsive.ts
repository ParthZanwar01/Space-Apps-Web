import { WindowDimensions, ResponsiveBreakpoints } from '../types/index.js';

export class ResponsiveManager {
  private static instance: ResponsiveManager;
  private breakpoints: ResponsiveBreakpoints = {
    mobile: 500,
    tablet: 700,
    desktop: 900,
    large: 1200
  };

  private constructor() {}

  public static getInstance(): ResponsiveManager {
    if (!ResponsiveManager.instance) {
      ResponsiveManager.instance = new ResponsiveManager();
    }
    return ResponsiveManager.instance;
  }

  public getWindowDimensions(): WindowDimensions {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  public getBreakpoint(): string {
    const width = this.getWindowDimensions().width;
    
    if (width <= this.breakpoints.mobile) return 'mobile';
    if (width <= this.breakpoints.tablet) return 'tablet';
    if (width <= this.breakpoints.desktop) return 'desktop';
    if (width <= this.breakpoints.large) return 'large';
    return 'xl';
  }

  public isMobile(): boolean {
    return this.getWindowDimensions().width <= this.breakpoints.mobile;
  }

  public isTablet(): boolean {
    const width = this.getWindowDimensions().width;
    return width > this.breakpoints.mobile && width <= this.breakpoints.tablet;
  }

  public isDesktop(): boolean {
    const width = this.getWindowDimensions().width;
    return width > this.breakpoints.tablet && width <= this.breakpoints.desktop;
  }

  public isLarge(): boolean {
    return this.getWindowDimensions().width > this.breakpoints.desktop;
  }

  public getSlideWidth(): number {
    const width = this.getWindowDimensions().width;
    
    if (width <= this.breakpoints.mobile) return 200; // 180px + 20px gap
    if (width <= this.breakpoints.tablet) return 240; // 220px + 20px gap
    if (width <= this.breakpoints.desktop) return 270; // 250px + 20px gap
    return 420; // 400px + 20px gap
  }

  public addResizeListener(callback: () => void): void {
    window.addEventListener('resize', callback);
  }

  public removeResizeListener(callback: () => void): void {
    window.removeEventListener('resize', callback);
  }
}
