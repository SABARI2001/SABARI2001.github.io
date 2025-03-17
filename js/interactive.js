document.addEventListener('DOMContentLoaded', () => {
    console.log('Interactive elements initialized');
    
    // Initialize AOS animations with no fade effects
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 0,
            once: true,
            mirror: false,
            disable: true // Disable AOS animations completely
        });
    }
    
    // Remove fade-in classes from elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.remove('fade-in');
        el.style.opacity = '1';
    });
    
    // Track section visibility in analytics only
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