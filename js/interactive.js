document.addEventListener('DOMContentLoaded', () => {
    console.log('Interactive elements initialized');
    
    // Disable AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 0,
            once: true,
            mirror: false,
            disable: true
        });
    }
    
    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level') || '0';
            setTimeout(() => {
                bar.style.width = `${level}%`;
            }, 300);
        });
    };
    
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '1';
    });
    
    // Initialize section animations
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
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
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Improved typing animation for hero section
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }
        
        type() {
            // Current index of word
            const current = this.wordIndex % this.words.length;
            // Get full text of current word
            const fullTxt = this.words[current];
            
            // Check if deleting
            if(this.isDeleting) {
                // Remove char
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                // Add char
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            // Insert txt into element with cursor
            this.txtElement.innerHTML = `<span class="wrap">${this.txt}<span class="cursor">|</span></span>`;
            
            // Initial Type Speed
            let typeSpeed = 100;
            
            if(this.isDeleting) {
                typeSpeed /= 2; // Faster when deleting
            }
            
            // If word is complete
            if(!this.isDeleting && this.txt === fullTxt) {
                // Make pause at end
                typeSpeed = this.wait;
                // Set delete to true
                this.isDeleting = true;
            } else if(this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                // Move to next word
                this.wordIndex++;
                // Pause before start typing
                typeSpeed = 500;
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    // Init On DOM Load
    document.addEventListener('DOMContentLoaded', init);
    
    // Init App
    function init() {
        const txtElement = document.querySelector('.txt-rotate');
        if (txtElement) {
            const words = JSON.parse(txtElement.getAttribute('data-rotate'));
            const wait = txtElement.getAttribute('data-period');
            // Init TypeWriter
            new TypeWriter(txtElement, words, wait);
        }
    }
    
    // Call init immediately since we're already in DOMContentLoaded
    init();
    
    // Add scroll progress indicator
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    });
});