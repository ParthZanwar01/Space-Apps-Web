import { Carousel } from './components/Carousel.js';
import { Navigation } from './components/Navigation.js';
import { ResponsiveManager } from './utils/responsive.js';
export class ORCAApp {
    constructor() {
        this.carousel = null;
        this.navigation = null;
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
            // Setup responsive features
            this.setupResponsiveFeatures();
            console.log('ORCA Technologies App initialized successfully');
        }
        catch (error) {
            console.error('Error initializing ORCA app:', error);
        }
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