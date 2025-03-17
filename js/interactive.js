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
    
    // Professional typewriter effect
    class TypeWriter {
        constructor(element) {
            this.element = element;
            this.words = JSON.parse(element.getAttribute('data-text'));
            this.wait = 3000; // Wait time after typing a word
            this.currentWordIndex = 0;
            this.txt = '';
            this.isDeleting = false;
            this.type();
        }
        
        type() {
            // Current word index
            const current = this.currentWordIndex % this.words.length;
            // Get full text of current word
            const fullTxt = this.words[current];
            
            // Check if deleting
            if (this.isDeleting) {
                // Remove character
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                // Add character
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            // Update element text
            this.element.textContent = this.txt;
            
            // Type speed
            let typeSpeed = this.isDeleting ? 50 : 100;
            
            // If word is complete
            if (!this.isDeleting && this.txt === fullTxt) {
                // Pause at end
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                // Move to next word
                this.currentWordIndex++;
                // Pause before typing
                typeSpeed = 500;
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    // Initialize typewriter
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        new TypeWriter(typewriterElement);
    }
    
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