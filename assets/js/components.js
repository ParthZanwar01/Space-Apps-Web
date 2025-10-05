// Carousel functionality for Component Gallery
document.addEventListener('DOMContentLoaded', function() {
    console.log('Component carousel loaded');

    // Load navigation script
    const navScript = document.createElement('script');
    navScript.src = 'assets/js/navigation.js';
    if (document.head) {
        document.head.appendChild(navScript);
    }

    // Initialize carousel
    initCarousel();

    console.log('Component carousel script initialized');
});

// Carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.carousel-wrapper');
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');

    if (!carousel || !carouselContainer || slides.length === 0) return;

    let currentSlide = 0;
    let autoplayInterval;
    
    // Calculate slide width based on screen size
    function getSlideWidth() {
        if (window.innerWidth <= 500) return 200; // 180px + 20px gap
        if (window.innerWidth <= 700) return 240; // 220px + 20px gap
        if (window.innerWidth <= 900) return 270; // 250px + 20px gap
        return 420; // 400px + 20px gap
    }
    
    let slideWidth = getSlideWidth();
    let visibleSlides = Math.floor(carousel.offsetWidth / slideWidth);
    let maxSlide = Math.max(0, slides.length - visibleSlides);

    // Show specific slide
    function showSlide(index) {
        // Clamp index to valid range
        index = Math.max(0, Math.min(index, maxSlide));
        
        // Update active states
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        // Move carousel container
        const translateX = -index * slideWidth;
        carouselContainer.style.transform = `translateX(${translateX}px)`;

        currentSlide = index;
        
        // Update navigation button states
        updateNavigationButtons();
    }

    // Next slide
    function nextSlide() {
        const nextIndex = Math.min(currentSlide + 1, maxSlide);
        showSlide(nextIndex);
    }

    // Previous slide
    function prevSlide() {
        const prevIndex = Math.max(currentSlide - 1, 0);
        showSlide(prevIndex);
    }

    // Update navigation button states
    function updateNavigationButtons() {
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentSlide >= maxSlide;
        }
    }

    // Auto-play functionality
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 10000); // Restart autoplay after 10 seconds
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 10000);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoplay();
            setTimeout(startAutoplay, 10000);
        });
    });

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 10000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 10000);
        }
    });

    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        stopAutoplay();
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only trigger if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isDragging = false;
        setTimeout(startAutoplay, 10000);
    });

    // Mouse drag support
    let mouseStartX = 0;
    let isMouseDragging = false;

    carousel.addEventListener('mousedown', (e) => {
        mouseStartX = e.clientX;
        isMouseDragging = true;
        stopAutoplay();
        e.preventDefault();
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isMouseDragging) return;
        e.preventDefault();
    });

    carousel.addEventListener('mouseup', (e) => {
        if (!isMouseDragging) return;
        
        const mouseEndX = e.clientX;
        const diffX = mouseStartX - mouseEndX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isMouseDragging = false;
        setTimeout(startAutoplay, 10000);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = getSlideWidth();
        visibleSlides = Math.floor(carousel.offsetWidth / slideWidth);
        maxSlide = Math.max(0, slides.length - visibleSlides);
        
        if (currentSlide > maxSlide) {
            showSlide(maxSlide);
        } else {
            // Recalculate position with new slide width
            const translateX = -currentSlide * slideWidth;
            carouselContainer.style.transform = `translateX(${translateX}px)`;
            updateNavigationButtons();
        }
    });

    // Initialize component card interactions
    initComponentCards();

    // Start autoplay
    startAutoplay();

    // Show first slide
    showSlide(0);
}

// Component card interactions
function initComponentCards() {
    const cards = document.querySelectorAll('.component-card');

    cards.forEach(card => {
        // Add click handler to show component details
        card.addEventListener('click', function() {
            const componentType = this.getAttribute('data-component');
            if (componentType) {
                showComponentDetails(componentType);
            }
        });

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}
