// Component Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.component-image');
    const descriptionArea = document.getElementById('components-description-area');
    let currentActiveComponent = null;

    // Set up click handlers for component images
    images.forEach(image => {
        image.addEventListener('click', function() {
            const component = this.getAttribute('data-component');
            const infoSection = document.getElementById(component + '-info');

            // If clicking the same component, hide the description
            if (currentActiveComponent === component) {
                hideDescription();
                return;
            }

            // Hide all other info sections first
            document.querySelectorAll('.component-info').forEach(info => {
                info.classList.remove('active');
            });

            // Show the clicked component's info
            infoSection.classList.add('active');
            descriptionArea.classList.add('active');
            currentActiveComponent = component;
        });
    });

    // Function to hide description
    function hideDescription() {
        document.querySelectorAll('.component-info').forEach(info => {
            info.classList.remove('active');
        });
        descriptionArea.classList.remove('active');
        currentActiveComponent = null;
    }

    // Hide description when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.component-image') && !event.target.closest('.component-description-area')) {
            hideDescription();
        }
    });

    // Load navigation script
    const navScript = document.createElement('script');
    navScript.src = 'assets/js/navigation.js';
    document.head.appendChild(navScript);
});
