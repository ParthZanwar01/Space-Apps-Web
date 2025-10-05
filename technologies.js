// ORCA Technologies functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('component-select');
    const descriptionArea = document.getElementById('technologies-description-area');
    let currentActiveComponent = null;

    // Set up dropdown change handler
    dropdown.addEventListener('change', function() {
        const selectedComponent = this.value;

        // If selecting the same component or empty value, hide description
        if (!selectedComponent || currentActiveComponent === selectedComponent) {
            hideDescription();
            return;
        }

        // Show the selected component section
        showComponentSection(selectedComponent);

        // Show the component's description
        const infoSection = document.getElementById(selectedComponent + '-info');

        // Hide all other info sections first
        document.querySelectorAll('.component-info').forEach(info => {
            info.classList.remove('active');
        });

        // Show the selected component's info
        infoSection.classList.add('active');
        descriptionArea.classList.add('active');
        currentActiveComponent = selectedComponent;
    });

    // Function to show a specific component section
    function showComponentSection(component) {
        // Hide all component sections first
        document.querySelectorAll('.component-section').forEach(section => {
            section.style.display = 'none';
        });
        // Show the selected component section
        const targetSection = document.querySelector(`[data-component="${component}"]`);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    // Function to hide description
    function hideDescription() {
        document.querySelectorAll('.component-info').forEach(info => {
            info.classList.remove('active');
        });
        descriptionArea.classList.remove('active');
        currentActiveComponent = null;

        // Hide all component sections
        document.querySelectorAll('.component-section').forEach(section => {
            section.style.display = 'none';
        });
    }

    // Hide description when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.component-dropdown') && !event.target.closest('.component-description-area')) {
            hideDescription();
        }
    });

    // Load navigation script
    const navScript = document.createElement('script');
    navScript.src = 'navigation.js';
    document.head.appendChild(navScript);
});
