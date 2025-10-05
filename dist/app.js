import { Carousel } from './components/Carousel.js';
import { Navigation } from './components/Navigation.js';
import { FullScreenManager } from './utils/fullscreen.js';
import { ResponsiveManager } from './utils/responsive.js';
export class ORCAApp {
    constructor() {
        this.carousel = null;
        this.navigation = null;
        this.fullScreenManager = FullScreenManager.getInstance();
        this.responsiveManager = ResponsiveManager.getInstance();
        this.init();
    }
    init() {
        console.log('ORCA Technologies App initializing...');
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        }
        else {
            this.initializeComponents();
        }
    }
    initializeComponents() {
        try {
            // Initialize navigation
            this.navigation = new Navigation();
            // Initialize carousel if on components page
            if (document.querySelector('.carousel-wrapper')) {
                this.carousel = new Carousel();
            }
            // Setup fullscreen functionality
            this.setupFullScreenFeatures();
            // Setup responsive features
            this.setupResponsiveFeatures();
            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();
            console.log('ORCA Technologies App initialized successfully');
        }
        catch (error) {
            console.error('Error initializing ORCA app:', error);
        }
    }
    setupFullScreenFeatures() {
        // Configure fullscreen settings
        this.fullScreenManager.setConfig({
            enableFullScreen: true,
            hideNavigation: false,
            immersiveMode: true,
            autoHideUI: true
        });
        // Add fullscreen button to page if not in navigation
        this.addFullScreenButton();
    }
    addFullScreenButton() {
        // Check if fullscreen button already exists
        if (document.querySelector('.fullscreen-toggle'))
            return;
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'fullscreen-toggle-btn';
        fullscreenBtn.innerHTML = '⛶ Fullscreen';
        fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen mode');
        fullscreenBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border: 1px solid #fff;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
    `;
        fullscreenBtn.addEventListener('click', () => {
            this.fullScreenManager.toggleFullScreen();
        });
        fullscreenBtn.addEventListener('mouseenter', () => {
            fullscreenBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        fullscreenBtn.addEventListener('mouseleave', () => {
            fullscreenBtn.style.background = 'rgba(0, 0, 0, 0.8)';
        });
        document.body.appendChild(fullscreenBtn);
    }
    setupResponsiveFeatures() {
        // Add responsive class to body
        this.updateResponsiveClass();
        // Listen for resize events
        this.responsiveManager.addResizeListener(() => {
            this.updateResponsiveClass();
        });
    }
    updateResponsiveClass() {
        const breakpoint = this.responsiveManager.getBreakpoint();
        document.body.className = document.body.className.replace(/breakpoint-\w+/g, '');
        document.body.classList.add(`breakpoint-${breakpoint}`);
    }
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // F11 or Ctrl+F for fullscreen
            if (e.key === 'F11' || (e.key === 'f' && e.ctrlKey)) {
                e.preventDefault();
                this.fullScreenManager.toggleFullScreen();
            }
            // Escape to exit fullscreen
            if (e.key === 'Escape' && this.fullScreenManager.isInFullScreen()) {
                this.fullScreenManager.exitFullScreen();
            }
        });
    }
    destroy() {
        if (this.carousel) {
            this.carousel.destroy();
        }
        if (this.navigation) {
            this.navigation.destroy();
        }
    }
}
// Initialize the app when the script loads
const app = new ORCAApp();
// Export for potential external use
export default app;
//# sourceMappingURL=app.js.map