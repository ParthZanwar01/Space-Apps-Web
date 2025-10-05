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
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');

    if (!carousel || slides.length === 0) return;

    let currentSlide = 0;
    let autoplayInterval;

    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        currentSlide = index;
    }

    // Next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
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
