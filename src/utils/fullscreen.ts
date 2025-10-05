import type { FullScreenConfig } from '../types/index.js';

export class FullScreenManager {
  private static instance: FullScreenManager;
  private config: FullScreenConfig;
  private isFullScreen: boolean = false;
  private originalStyles: Map<HTMLElement, string> = new Map();

  private constructor() {
    this.config = {
      enableFullScreen: true,
      hideNavigation: false,
      immersiveMode: true,
      autoHideUI: true
    };
  }

  public static getInstance(): FullScreenManager {
    if (!FullScreenManager.instance) {
      FullScreenManager.instance = new FullScreenManager();
    }
    return FullScreenManager.instance;
  }

  public async enterFullScreen(element?: HTMLElement): Promise<void> {
    if (!this.config.enableFullScreen) return;

    const targetElement = element || document.documentElement;

    try {
      if (targetElement.requestFullscreen) {
        await targetElement.requestFullscreen();
      } else if ((targetElement as any).webkitRequestFullscreen) {
        await (targetElement as any).webkitRequestFullscreen();
      } else if ((targetElement as any).msRequestFullscreen) {
        await (targetElement as any).msRequestFullscreen();
      }
      
      this.isFullScreen = true;
      this.applyFullScreenStyles();
    } catch (error) {
      console.warn('Fullscreen request failed:', error);
    }
  }

  public async exitFullScreen(): Promise<void> {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
      
      this.isFullScreen = false;
      this.restoreOriginalStyles();
    } catch (error) {
      console.warn('Exit fullscreen failed:', error);
    }
  }

  public toggleFullScreen(element?: HTMLElement): void {
    if (this.isFullScreen) {
      this.exitFullScreen();
    } else {
      this.enterFullScreen(element);
    }
  }

  public isInFullScreen(): boolean {
    return this.isFullScreen || !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    );
  }

  private applyFullScreenStyles(): void {
    const body = document.body;
    const html = document.documentElement;

    // Store original styles
    this.originalStyles.set(body, body.style.cssText);
    this.originalStyles.set(html, html.style.cssText);

    // Apply full-screen styles
    body.style.cssText = `
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #000;
    `;

    html.style.cssText = `
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    `;

    // Hide navigation if configured
    if (this.config.hideNavigation) {
      const nav = document.querySelector('.usa-header');
      if (nav) {
        this.originalStyles.set(nav as HTMLElement, (nav as HTMLElement).style.cssText);
        (nav as HTMLElement).style.display = 'none';
      }
    }

    // Apply immersive mode
    if (this.config.immersiveMode) {
      this.applyImmersiveMode();
    }
  }

  private restoreOriginalStyles(): void {
    this.originalStyles.forEach((originalStyle, element) => {
      element.style.cssText = originalStyle;
    });
    this.originalStyles.clear();
  }

  private applyImmersiveMode(): void {
    const mainContent = document.querySelector('.main-container');
    if (mainContent) {
      this.originalStyles.set(mainContent as HTMLElement, (mainContent as HTMLElement).style.cssText);
      (mainContent as HTMLElement).style.cssText = `
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        color: #fff;
      `;
    }

    // Make content take full screen
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
      this.originalStyles.set(contentWrapper as HTMLElement, (contentWrapper as HTMLElement).style.cssText);
      (contentWrapper as HTMLElement).style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        box-sizing: border-box;
      `;
    }
  }

  public setConfig(config: Partial<FullScreenConfig>): void {
    this.config = { ...this.config, ...config };
  }

  public getConfig(): FullScreenConfig {
    return { ...this.config };
  }

  public addFullScreenListeners(): void {
    document.addEventListener('fullscreenchange', this.handleFullScreenChange.bind(this));
    document.addEventListener('webkitfullscreenchange', this.handleFullScreenChange.bind(this));
    document.addEventListener('msfullscreenchange', this.handleFullScreenChange.bind(this));
  }

  private handleFullScreenChange(): void {
    this.isFullScreen = this.isInFullScreen();
    
    if (this.isFullScreen) {
      this.applyFullScreenStyles();
    } else {
      this.restoreOriginalStyles();
    }
  }
}
