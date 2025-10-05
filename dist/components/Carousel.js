import { ResponsiveManager } from '../utils/responsive.js';
export class Carousel {
    constructor(containerSelector = '.carousel-wrapper') {
        this.autoplayInterval = null;
        this.carousel = document.querySelector(containerSelector);
        this.carouselContainer = document.querySelector('.carousel-container');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.prevBtn = document.querySelector('.carousel-nav.prev');
        this.nextBtn = document.querySelector('.carousel-nav.next');
        this.responsiveManager = ResponsiveManager.getInstance();
        this.config = {
            autoplayInterval: 5000,
            slideWidth: this.responsiveManager.getSlideWidth(),
            visibleSlides: 0,
            maxSlide: 0
        };
        this.state = {
            currentSlide: 0,
            isAutoplayActive: false,
            isDragging: false,
            touchStart: { startX: 0, startY: 0, endX: 0, endY: 0, isDragging: false },
            mouseStart: { startX: 0, isDragging: false }
        };
        this.init();
    }
    init() {
        if (!this.carousel || !this.carouselContainer || this.slides.length === 0) {
            console.warn('Carousel elements not found');
            return;
        }
        this.calculateDimensions();
        this.setupEventListeners();
        this.initComponentCards();
        this.startAutoplay();
        this.showSlide(0);
    }
    calculateDimensions() {
        this.config.slideWidth = this.responsiveManager.getSlideWidth();
        this.config.visibleSlides = Math.floor(this.carousel.offsetWidth / this.config.slideWidth);
        this.config.maxSlide = Math.max(0, this.slides.length - this.config.visibleSlides);
    }
    setupEventListeners() {
        // Navigation buttons
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.handleUserInteraction();
            });
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.handleUserInteraction();
            });
        }
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showSlide(index);
                this.handleUserInteraction();
            });
        });
        // Hover events
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        // Touch events
        this.carousel.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.carousel.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.carousel.addEventListener('touchend', this.handleTouchEnd.bind(this));
        // Mouse drag events
        this.carousel.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.carousel.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.carousel.addEventListener('mouseup', this.handleMouseUp.bind(this));
        // Window resize
        this.responsiveManager.addResizeListener(this.handleResize.bind(this));
    }
    showSlide(index) {
        // Clamp index to valid range
        index = Math.max(0, Math.min(index, this.config.maxSlide));
        // Update active states
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        // Show current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
        // Move carousel container
        const translateX = -index * this.config.slideWidth;
        if (this.carouselContainer) {
            this.carouselContainer.style.transform = `translateX(${translateX}px)`;
        }
        this.state.currentSlide = index;
        this.updateNavigationButtons();
    }
    nextSlide() {
        const nextIndex = Math.min(this.state.currentSlide + 1, this.config.maxSlide);
        this.showSlide(nextIndex);
    }
    prevSlide() {
        const prevIndex = Math.max(this.state.currentSlide - 1, 0);
        this.showSlide(prevIndex);
    }
    updateNavigationButtons() {
        if (this.prevBtn) {
            this.prevBtn.toggleAttribute('disabled', this.state.currentSlide === 0);
        }
        if (this.nextBtn) {
            this.nextBtn.toggleAttribute('disabled', this.state.currentSlide >= this.config.maxSlide);
        }
    }
    startAutoplay() {
        if (this.state.isAutoplayActive)
            return;
        this.state.isAutoplayActive = true;
        this.autoplayInterval = window.setInterval(() => {
            this.nextSlide();
        }, this.config.autoplayInterval);
    }
    stopAutoplay() {
        this.state.isAutoplayActive = false;
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    handleUserInteraction() {
        this.stopAutoplay();
        setTimeout(() => this.startAutoplay(), 10000);
    }
    handleKeydown(e) {
        if (e.key === 'ArrowLeft') {
            this.prevSlide();
            this.handleUserInteraction();
        }
        else if (e.key === 'ArrowRight') {
            this.nextSlide();
            this.handleUserInteraction();
        }
    }
    handleTouchStart(e) {
        if (e.touches.length === 0)
            return;
        this.state.touchStart.startX = e.touches[0].clientX;
        this.state.touchStart.startY = e.touches[0].clientY;
        this.state.touchStart.isDragging = true;
        this.state.isDragging = true;
        this.stopAutoplay();
    }
    handleTouchMove(e) {
        if (!this.state.touchStart.isDragging)
            return;
        e.preventDefault();
    }
    handleTouchEnd(e) {
        if (!this.state.touchStart.isDragging)
            return;
        if (e.changedTouches.length === 0)
            return;
        this.state.touchStart.endX = e.changedTouches[0].clientX;
        this.state.touchStart.endY = e.changedTouches[0].clientY;
        const diffX = this.state.touchStart.startX - this.state.touchStart.endX;
        const diffY = this.state.touchStart.startY - this.state.touchStart.endY;
        // Only trigger if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                this.nextSlide();
            }
            else {
                this.prevSlide();
            }
        }
        this.state.touchStart.isDragging = false;
        this.state.isDragging = false;
        setTimeout(() => this.startAutoplay(), 10000);
    }
    handleMouseDown(e) {
        this.state.mouseStart.startX = e.clientX;
        this.state.mouseStart.isDragging = true;
        this.state.isDragging = true;
        this.stopAutoplay();
        e.preventDefault();
    }
    handleMouseMove(e) {
        if (!this.state.mouseStart.isDragging)
            return;
        e.preventDefault();
    }
    handleMouseUp(e) {
        if (!this.state.mouseStart.isDragging)
            return;
        const diffX = this.state.mouseStart.startX - e.clientX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                this.nextSlide();
            }
            else {
                this.prevSlide();
            }
        }
        this.state.mouseStart.isDragging = false;
        this.state.isDragging = false;
        setTimeout(() => this.startAutoplay(), 10000);
    }
    handleResize() {
        this.calculateDimensions();
        if (this.state.currentSlide > this.config.maxSlide) {
            this.showSlide(this.config.maxSlide);
        }
        else {
            // Recalculate position with new slide width
            const translateX = -this.state.currentSlide * this.config.slideWidth;
            if (this.carouselContainer) {
                this.carouselContainer.style.transform = `translateX(${translateX}px)`;
            }
            this.updateNavigationButtons();
        }
    }
    initComponentCards() {
        const cards = document.querySelectorAll('.component-card');
        cards.forEach(card => {
            // Add click handler to show component details
            card.addEventListener('click', () => {
                const componentType = card.getAttribute('data-component');
                if (componentType) {
                    this.showComponentDetails(componentType);
                }
            });
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
                card.style.transition = 'transform 0.3s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
            });
        });
    }
    showComponentDetails(componentType) {
        console.log(`Showing details for component: ${componentType}`);
        // Implement component details modal or navigation
    }
    destroy() {
        this.stopAutoplay();
        this.responsiveManager.removeResizeListener(this.handleResize.bind(this));
    }
}
//# sourceMappingURL=Carousel.js.map