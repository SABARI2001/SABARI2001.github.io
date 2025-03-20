// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);

    // Remove loading screen after content is loaded
    window.addEventListener('load', () => {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    });

    // Theme toggling functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon
    const updateThemeIcon = () => {
        const icon = themeToggle.querySelector('i');
        if (body.getAttribute('data-theme') === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };
    
    // Set initial icon
    updateThemeIcon();
    
    // Handle theme toggle click
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress-bar';
    progressBar.appendChild(progressIndicator);
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressIndicator.style.width = `${progress}%`;
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.project-card, .blog-card, .skill-category');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-level') || '0';
                entry.target.style.width = `${width}%`;
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuButton?.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        mobileMenuButton.classList.toggle('active');
    });

    // Testimonials slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const testimonialCount = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    // Initialize testimonials position
    showTestimonial(currentTestimonial);

    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Notification System
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger reflow
        notification.offsetHeight;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Interactive CV
    const cv = document.querySelector('.interactive-cv');
    if (cv) {
        cv.addEventListener('mousemove', (e) => {
            const rect = cv.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cv.style.setProperty('--x', `${x}px`);
            cv.style.setProperty('--y', `${y}px`);
        });
    }

    // Project filter functionality
    const projectFilters = document.querySelectorAll('.project-filter button');
    const projects = document.querySelectorAll('.project-card');

    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-category');
            
            projectFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            projects.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                    setTimeout(() => project.classList.add('fade-in'), 10);
                } else {
                    project.style.display = 'none';
                    project.classList.remove('fade-in');
                }
            });
        });
    });

    // Visitor tracking
    function trackVisitor(visitorName, source) {
        if (typeof gtag === 'function') {
            gtag('event', 'visitor_info', {
                'visitor_name': visitorName,
                'source': source
            });
        }
    }

    // Show visitor popup after a short delay
    setTimeout(() => {
        if (!localStorage.getItem('visitorName')) {
            const visitorName = prompt('Welcome! Please enter your name:');
            if (visitorName) {
                localStorage.setItem('visitorName', visitorName);
                const source = new URLSearchParams(window.location.search).get('utm_source') || 'direct';
                trackVisitor(visitorName, source);
            }
        }
    }, 2000);

    // Track social media clicks
    document.querySelectorAll('.social-icons a, .contact-info a').forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = e.currentTarget.getAttribute('href').includes('linkedin') ? 'LinkedIn' :
                            e.currentTarget.getAttribute('href').includes('github') ? 'GitHub' : 'Email';
            const visitorName = localStorage.getItem('visitorName') || 'Anonymous';
            
            if (typeof gtag === 'function') {
                gtag('event', 'social_click', {
                    'platform': platform,
                    'visitor_name': visitorName
                });
            }
        });
    });

    // Track project clicks
    document.querySelectorAll('.project-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const projectTitle = e.currentTarget.closest('.project-card').querySelector('h3').textContent;
            const visitorName = localStorage.getItem('visitorName') || 'Anonymous';
            
            if (typeof gtag === 'function') {
                gtag('event', 'project_click', {
                    'project_title': projectTitle,
                    'visitor_name': visitorName
                });
            }
        });
    });

    // Track resume download
    const resumeDownload = document.querySelector('.resume-download a');
    if (resumeDownload) {
        resumeDownload.addEventListener('click', () => {
            const visitorName = localStorage.getItem('visitorName') || 'Anonymous';
            
            if (typeof gtag === 'function') {
                gtag('event', 'resume_download', {
                    'visitor_name': visitorName
                });
            }
        });
    }

    // Analytics Enhancement
    function initializeAnalytics() {
        // Session timing tracking
        const sessionStartTime = new Date();
        window.addEventListener('beforeunload', () => {
            const sessionDuration = new Date() - sessionStartTime;
            gtag('event', 'session_duration', {
                'duration_seconds': Math.floor(sessionDuration / 1000)
            });
        });

        // Scroll depth tracking
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll >= 25 && maxScroll < 50) {
                    gtag('event', 'scroll_depth', { 'depth': '25%' });
                } else if (maxScroll >= 50 && maxScroll < 75) {
                    gtag('event', 'scroll_depth', { 'depth': '50%' });
                } else if (maxScroll >= 75 && maxScroll < 90) {
                    gtag('event', 'scroll_depth', { 'depth': '75%' });
                } else if (maxScroll >= 90) {
                    gtag('event', 'scroll_depth', { 'depth': '90%' });
                }
            }
        });

        // Section visibility tracking
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'section_view', {
                        'section_id': entry.target.id,
                        'visitor_name': localStorage.getItem('visitorName') || 'Anonymous'
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => sectionObserver.observe(section));

        // Enhanced project interaction tracking
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const projectTitle = card.querySelector('h3').textContent;
                gtag('event', 'project_hover', {
                    'project_title': projectTitle,
                    'visitor_name': localStorage.getItem('visitorName') || 'Anonymous'
                });
            });

            // Track project link clicks with time spent viewing
            const projectLinks = card.querySelectorAll('.project-links a');
            const projectHoverStart = new Map();

            card.addEventListener('mouseenter', () => {
                projectHoverStart.set(card, new Date());
            });

            projectLinks.forEach(link => {
                link.addEventListener('click', () => {
                    const hoverStart = projectHoverStart.get(card);
                    const timeSpent = hoverStart ? new Date() - hoverStart : 0;
                    const projectTitle = card.querySelector('h3').textContent;
                    
                    gtag('event', 'project_click', {
                        'project_title': projectTitle,
                        'time_spent_seconds': Math.floor(timeSpent / 1000),
                        'visitor_name': localStorage.getItem('visitorName') || 'Anonymous'
                    });
                });
            });
        });

        // Skill section interaction tracking
        document.querySelectorAll('.skill-item').forEach(skill => {
            const skillName = skill.querySelector('span').textContent;
            const skillLevel = skill.querySelector('.skill-level').getAttribute('data-level');
            
            skill.addEventListener('mouseenter', () => {
                gtag('event', 'skill_view', {
                    'skill_name': skillName,
                    'skill_level': skillLevel,
                    'visitor_name': localStorage.getItem('visitorName') || 'Anonymous'
                });
            });
        });

        // Form interaction tracking
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            const formFields = contactForm.querySelectorAll('input, textarea');
            const fieldInteractions = new Map();

            formFields.forEach(field => {
                field.addEventListener('focus', () => {
                    fieldInteractions.set(field.id, new Date());
                });

                field.addEventListener('blur', () => {
                    const startTime = fieldInteractions.get(field.id);
                    if (startTime) {
                        const timeSpent = new Date() - startTime;
                        gtag('event', 'form_field_interaction', {
                            'field_id': field.id,
                            'time_spent_seconds': Math.floor(timeSpent / 1000),
                            'visitor_name': localStorage.getItem('visitorName') || 'Anonymous'
                        });
                    }
                });
            });

            contactForm.addEventListener('submit', () => {
                gtag('event', 'form_submission', {
                    'visitor_name': contactForm.querySelector('#name').value,
                    'visitor_email': contactForm.querySelector('#email').value,
                    'subject': contactForm.querySelector('#subject').value
                });
            });
        }

        // Track external link clicks
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', () => {
                gtag('event', 'external_link_click', {
                    'link_url': link.href,
                    'link_text': link.textContent.trim(),
                    'visitor_name': localStorage.getItem('visitorName') || 'Anonymous'
                });
            });
        });

        // Track resume interactions
        const resumeDownload = document.querySelector('.resume-download a');
        if (resumeDownload) {
            resumeDownload.addEventListener('click', () => {
                gtag('event', 'resume_download', {
                    'visitor_name': localStorage.getItem('visitorName') || 'Anonymous',
                    'timestamp': new Date().toISOString()
                });
            });
        }

        // Track certification views
        document.querySelectorAll('.certification-item').forEach(cert => {
            const certName = cert.querySelector('h4').textContent;
            cert.addEventListener('mouseenter', () => {
                gtag('event', 'certification_view', {
                    'certification_name': certName,
                    'visitor_name': localStorage.getItem('visitorName') || 'Anonymous'
                });
            });
        });
    }

    // Initialize analytics when DOM is loaded
    initializeAnalytics();
}); 