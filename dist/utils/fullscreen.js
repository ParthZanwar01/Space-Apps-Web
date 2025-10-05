export class FullScreenManager {
    constructor() {
        this.isFullScreen = false;
        this.originalStyles = new Map();
        this.config = {
            enableFullScreen: true,
            hideNavigation: false,
            immersiveMode: true,
            autoHideUI: true
        };
    }
    static getInstance() {
        if (!FullScreenManager.instance) {
            FullScreenManager.instance = new FullScreenManager();
        }
        return FullScreenManager.instance;
    }
    async enterFullScreen(element) {
        if (!this.config.enableFullScreen)
            return;
        const targetElement = element || document.documentElement;
        try {
            if (targetElement.requestFullscreen) {
                await targetElement.requestFullscreen();
            }
            else if (targetElement.webkitRequestFullscreen) {
                await targetElement.webkitRequestFullscreen();
            }
            else if (targetElement.msRequestFullscreen) {
                await targetElement.msRequestFullscreen();
            }
            this.isFullScreen = true;
            this.applyFullScreenStyles();
        }
        catch (error) {
            console.warn('Fullscreen request failed:', error);
        }
    }
    async exitFullScreen() {
        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
            else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            }
            else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }
            this.isFullScreen = false;
            this.restoreOriginalStyles();
        }
        catch (error) {
            console.warn('Exit fullscreen failed:', error);
        }
    }
    toggleFullScreen(element) {
        if (this.isFullScreen) {
            this.exitFullScreen();
        }
        else {
            this.enterFullScreen(element);
        }
    }
    isInFullScreen() {
        return this.isFullScreen || !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement);
    }
    applyFullScreenStyles() {
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
                this.originalStyles.set(nav, nav.style.cssText);
                nav.style.display = 'none';
            }
        }
        // Apply immersive mode
        if (this.config.immersiveMode) {
            this.applyImmersiveMode();
        }
    }
    restoreOriginalStyles() {
        this.originalStyles.forEach((originalStyle, element) => {
            element.style.cssText = originalStyle;
        });
        this.originalStyles.clear();
    }
    applyImmersiveMode() {
        const mainContent = document.querySelector('.main-container');
        if (mainContent) {
            this.originalStyles.set(mainContent, mainContent.style.cssText);
            mainContent.style.cssText = `
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
            this.originalStyles.set(contentWrapper, contentWrapper.style.cssText);
            contentWrapper.style.cssText = `
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
    setConfig(config) {
        this.config = { ...this.config, ...config };
    }
    getConfig() {
        return { ...this.config };
    }
    addFullScreenListeners() {
        document.addEventListener('fullscreenchange', this.handleFullScreenChange.bind(this));
        document.addEventListener('webkitfullscreenchange', this.handleFullScreenChange.bind(this));
        document.addEventListener('msfullscreenchange', this.handleFullScreenChange.bind(this));
    }
    handleFullScreenChange() {
        this.isFullScreen = this.isInFullScreen();
        if (this.isFullScreen) {
            this.applyFullScreenStyles();
        }
        else {
            this.restoreOriginalStyles();
        }
    }
}
//# sourceMappingURL=fullscreen.js.map