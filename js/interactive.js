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
    
    // Typing animation for hero section
    const txtRotate = document.querySelector('.txt-rotate');
    if (txtRotate) {
        const period = txtRotate.getAttribute('data-period');
        const rotateData = txtRotate.getAttribute('data-rotate');
        
        if (rotateData) {
            try {
                const toRotate = JSON.parse(rotateData);
                new TxtRotate(txtRotate, toRotate, period);
            } catch (e) {
                console.error('Error parsing rotation data', e);
            }
        }
    }
    
    // Text rotation animation
    function TxtRotate(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    
    TxtRotate.prototype.tick = function() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
        
        const that = this;
        let delta = 200 - Math.random() * 100;
        
        if (this.isDeleting) { delta /= 2; }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        
        setTimeout(function() {
            that.tick();
        }, delta);
    };
});