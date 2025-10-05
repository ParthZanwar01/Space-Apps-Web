import { FullScreenManager } from '../utils/fullscreen.js';
export class Navigation {
    constructor() {
        this.isMenuOpen = false;
        this.navElement = document.querySelector('.usa-nav');
        this.menuBtn = document.querySelector('.usa-menu-btn');
        this.closeBtn = document.querySelector('.usa-nav__close');
        this.fullScreenManager = FullScreenManager.getInstance();
        this.init();
    }
    init() {
        this.setupEventListeners();
        this.setupFullScreenToggle();
    }
    setupEventListeners() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleMenu());
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeMenu());
        }
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navElement?.contains(e.target)) {
                this.closeMenu();
            }
        });
        // Handle accordion buttons
        const accordionButtons = document.querySelectorAll('.usa-accordion__button');
        accordionButtons.forEach(button => {
            button.addEventListener('click', () => this.handleAccordionToggle(button));
        });
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }
    setupFullScreenToggle() {
        // Add fullscreen toggle button to navigation
        const navInner = document.querySelector('.usa-nav__inner');
        if (navInner) {
            const fullscreenBtn = document.createElement('button');
            fullscreenBtn.className = 'usa-nav__link fullscreen-toggle';
            fullscreenBtn.innerHTML = '<span>Fullscreen</span>';
            fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen mode');
            fullscreenBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.fullScreenManager.toggleFullScreen();
            });
            // Insert before the close button
            const closeBtn = navInner.querySelector('.usa-nav__close');
            if (closeBtn) {
                navInner.insertBefore(fullscreenBtn, closeBtn);
            }
        }
    }
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        }
        else {
            this.openMenu();
        }
    }
    openMenu() {
        this.isMenuOpen = true;
        this.navElement?.classList.add('is-visible');
        document.body.classList.add('usa-nav-open');
        // Focus first navigation item
        const firstNavItem = this.navElement?.querySelector('.usa-nav__link');
        if (firstNavItem) {
            firstNavItem.focus();
        }
    }
    closeMenu() {
        this.isMenuOpen = false;
        this.navElement?.classList.remove('is-visible');
        document.body.classList.remove('usa-nav-open');
    }
    handleAccordionToggle(button) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const targetId = button.getAttribute('aria-controls');
        if (targetId) {
            const target = document.getElementById(targetId);
            if (target) {
                if (isExpanded) {
                    button.setAttribute('aria-expanded', 'false');
                    target.classList.remove('is-visible');
                }
                else {
                    button.setAttribute('aria-expanded', 'true');
                    target.classList.add('is-visible');
                }
            }
        }
    }
    setActivePage(pageId) {
        // Remove active class from all nav items
        const allNavLinks = document.querySelectorAll('.usa-nav__link');
        allNavLinks.forEach(link => link.classList.remove('active'));
        // Add active class to current page
        const activeLink = document.querySelector(`[href="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    createNavigationItems() {
        return [
            {
                id: 'home',
                label: 'Home',
                href: 'index.html'
            },
            {
                id: 'business-plan',
                label: 'Business Plan with considerations',
                href: '#',
                children: [
                    {
                        id: 'technologies',
                        label: 'Technologies',
                        href: 'innovation-technologies.html'
                    },
                    {
                        id: 'development-plan',
                        label: 'Development Plan',
                        href: 'development-plan.html'
                    },
                    {
                        id: 'financial-plan',
                        label: 'Financial Plan',
                        href: 'financial-plan.html'
                    },
                    {
                        id: 'scalability-sustainability',
                        label: 'Scalability & Sustainability',
                        href: 'scalability-sustainability.html'
                    },
                    {
                        id: 'regulations-cooperation',
                        label: 'Regulations & International Cooperation',
                        href: 'regulations-cooperation.html'
                    },
                    {
                        id: 'future-vision',
                        label: 'Future Vision',
                        href: 'future-vision.html'
                    }
                ]
            },
            {
                id: 'prototypes',
                label: 'Our prototypes & deliverables',
                href: '#',
                children: [
                    {
                        id: 'component-gallery',
                        label: 'Component Gallery',
                        href: 'components.html'
                    },
                    {
                        id: 'orca-overview',
                        label: 'ORCA Overview',
                        href: 'orca-overview.html'
                    },
                    {
                        id: 'ebam',
                        label: 'EBAM',
                        href: 'ebam.html'
                    },
                    {
                        id: 'ebchm',
                        label: 'EBCHM',
                        href: 'ebchm.html'
                    },
                    {
                        id: 'gecko-grippers',
                        label: 'Gecko Grippers',
                        href: 'gecko-grippers.html'
                    }
                ]
            }
        ];
    }
    destroy() {
        // Clean up event listeners if needed
    }
}
//# sourceMappingURL=Navigation.js.map