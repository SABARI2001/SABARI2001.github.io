document.addEventListener('DOMContentLoaded', () => {
    // Initialize sections and observers
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '-10% 0px',
        threshold: [0.3, 0.7] // Multiple thresholds for smoother transitions
    };

    // Combined section observer for both fade effects and visibility
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                // Add visible class with a slight delay for smooth transition
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    // Fade out other sections
                    sections.forEach(section => {
                        if (section !== entry.target) {
                            section.classList.add('fade-out');
                        } else {
                            section.classList.remove('fade-out');
                        }
                    });
                }, 100);

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

    // Set initial state for first visible section
    const setInitialState = () => {
        const firstVisible = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        });
        
        if (firstVisible) {
            firstVisible.classList.add('visible');
            sections.forEach(section => {
                if (section !== firstVisible) {
                    section.classList.add('fade-out');
                }
            });
        }
    };

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Set initial state after a short delay
    setTimeout(setInitialState, 100);

    console.log('All interactive elements initialized');
});