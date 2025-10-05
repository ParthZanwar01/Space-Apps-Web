// Satellite component data based on actual components
const componentData = {
    'spool': {
        name: 'Spool',
        function: 'A rotating mechanism that manages and dispenses materials or components within the satellite system. Provides controlled deployment and retraction capabilities.',
        specs: [
            'Diameter: 150mm',
            'Capacity: 500m of material',
            'Motor: Stepper motor drive',
            'Material: Carbon fiber composite',
            'Control: Precision positioning system'
        ]
    },
    'printer': {
        name: 'Printer',
        function: 'An advanced manufacturing system capable of 3D printing components or materials in space. Uses additive manufacturing technology for on-demand production.',
        specs: [
            'Print volume: 200mm × 200mm × 200mm',
            'Resolution: 0.1mm layer height',
            'Materials: Thermoplastic polymers',
            'Power consumption: 200W',
            'Temperature range: 180-280°C'
        ]
    },
    'centrifuge': {
        name: 'Centrifuge',
        function: 'A high-speed rotating device used for separating materials, processing samples, or creating artificial gravity conditions within the satellite.',
        specs: [
            'Max RPM: 10,000',
            'Capacity: 6 sample tubes',
            'Force: Up to 10,000g',
            'Control: Variable speed',
            'Safety: Automatic imbalance detection'
        ]
    },
    'slag-waste': {
        name: 'Slag/Waste Containment',
        function: 'A specialized containment system designed to safely store and manage waste materials, slag, or byproducts from manufacturing processes.',
        specs: [
            'Volume: 5 liters',
            'Material: Stainless steel',
            'Temperature range: -50°C to +200°C',
            'Pressure rating: 15 bar',
            'Seal: Hermetic sealing system'
        ]
    },
    'decontamination': {
        name: 'Decontamination',
        function: 'A cleaning and sterilization system that removes contaminants, sterilizes surfaces, and maintains sterile conditions within the satellite environment.',
        specs: [
            'Method: UV sterilization + chemical cleaning',
            'Coverage: 360° surface treatment',
            'Cycle time: 30 minutes',
            'Power: 50W UV lamp',
            'Safety: Automatic shutdown systems'
        ]
    },
    'satellite-deposition': {
        name: 'Satellite Deposition',
        function: 'A precision deposition system that applies coatings, materials, or protective layers to satellite components using advanced deposition techniques.',
        specs: [
            'Deposition method: Physical vapor deposition',
            'Thickness range: 0.1-10 microns',
            'Materials: Metals, ceramics, polymers',
            'Vacuum level: 10^-6 Torr',
            'Substrate heating: Up to 400°C'
        ]
    }
};

// Initialize the hotspot annotation system
document.addEventListener('DOMContentLoaded', function() {
    const hotspots = document.querySelectorAll('.hotspot');
    
    // Add click event listeners to all hotspots
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function(e) {
            e.preventDefault();
            const componentType = this.getAttribute('data-component');
            showComponentInfo(componentType);
            highlightHotspot(this);
        });
        
        // Add hover effects
        hotspot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
        });
        
        hotspot.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '6') {
            const componentIndex = parseInt(e.key) - 1;
            const componentTypes = ['spool', 'printer', 'centrifuge', 'slag-waste', 'decontamination', 'satellite-deposition'];
            if (componentTypes[componentIndex]) {
                const hotspot = document.querySelector(`[data-component="${componentTypes[componentIndex]}"]`);
                if (hotspot) {
                    hotspot.click();
                }
            }
        }
    });
});

// Show component details in popup
function showComponentDetails(componentType) {
    const data = componentData[componentType];

    if (!data) return;

    const popup = document.getElementById('details-popup');
    const details = document.getElementById('popup-details');

    // Get the image source for this component
    let imageSrc = '';
    const componentCards = document.querySelectorAll(`[data-component="${componentType}"]`);
    if (componentCards.length > 0) {
        const img = componentCards[0].querySelector('.component-image');
        if (img) {
            imageSrc = img.src;
        }
    }

    details.innerHTML = `
        <h3>${data.name}</h3>
        ${imageSrc ? `
        <div class="component-preview">
            <img src="${imageSrc}" alt="${data.name}" />
        </div>` : ''}
        <div class="function">
            <h4>Function</h4>
            <p>${data.function}</p>
        </div>
        <div class="specs">
            <h4>Technical Specifications</h4>
            <ul>
                ${data.specs.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
        </div>
    `;

    popup.style.display = 'block';
}

// Close details popup
function closeDetails() {
    const popup = document.getElementById('details-popup');
    popup.style.display = 'none';
}

// Close popup when clicking outside
window.onclick = function(event) {
    const popup = document.getElementById('details-popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
}

// Add CSS animations for popup and pulse effects
const popupStyle = document.createElement('style');
popupStyle.textContent = `
    @keyframes fadeInScale {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes fadeOutScale {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
if (document.head) {
    document.head.appendChild(popupStyle);
}

// Initialize card-based interaction system
document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animations for cards
    const cards = document.querySelectorAll('.component-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
});

// Tooltip functionality removed to prevent JavaScript errors

