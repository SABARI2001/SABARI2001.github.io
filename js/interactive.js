document.addEventListener('DOMContentLoaded', () => {
    // Initialize sections and observers
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 // Simplified threshold
    };

    // Make all sections visible by default
    sections.forEach(section => {
        section.style.opacity = '1';
    });

    // Combined section observer for both fade effects and visibility
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class with a slight delay for smooth transition
                entry.target.classList.add('visible');
                entry.target.classList.remove('fade-out');
                
                // Apply subtle fade to other sections
                sections.forEach(section => {
                    if (section !== entry.target && !isElementInViewport(section)) {
                        section.classList.add('fade-out');
                    }
                });

                // Handle special effects for About section
                if (entry.target.id === 'about') {
                    entry.target.classList.add('about-visible');
                }

                // Track section visibility in analytics
                if (typeof gtag === 'function') {
                    gtag('event', 'section_view', {
                        'section_id': entry.target.id,
                        'visitor_name': localStorage.getItem('visitorName') || 'Anonymous'
                    });
                }
            }
        });
    }, options);

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    console.log('All interactive elements initialized');
});