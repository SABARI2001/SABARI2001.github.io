document.addEventListener('DOMContentLoaded', () => {
    console.log('Interactive elements initialized');
    
    // Initialize AOS animations if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    }
    
    // Track section visibility in analytics
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});