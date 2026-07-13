document.addEventListener('DOMContentLoaded', () => {
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);

    window.addEventListener('load', () => {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 400);
    });

    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const header = document.querySelector('.site-header');

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);

    const updateThemeIcon = () => {
        const icon = themeToggle?.querySelector('i');
        if (!icon) return;
        icon.className = body.getAttribute('data-theme') === 'dark'
            ? 'fas fa-sun'
            : 'fas fa-moon';
    };

    updateThemeIcon();

    themeToggle?.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document.querySelector('.nav-links')?.classList.remove('show');
                document.querySelector('.mobile-menu')?.classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
        document.querySelector('.scroll-progress-bar')?.style.setProperty('width', `${progress}%`);
        header?.classList.toggle('scrolled', window.scrollY > 20);
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', highlightNav);
    highlightNav();

    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinksEl = document.querySelector('.nav-links');

    mobileMenuButton?.addEventListener('click', () => {
        navLinksEl?.classList.toggle('show');
        mobileMenuButton.classList.toggle('active');
    });

    const fadeElements = document.querySelectorAll('.bento-item, .exp-row, .info-panel, .skill-col');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    const projectFilters = document.querySelectorAll('.project-filter button');
    const projects = document.querySelectorAll('.bento-item');

    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-category');
            projectFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            projects.forEach(project => {
                const match = category === 'all' || project.getAttribute('data-category') === category;
                project.style.display = match ? '' : 'none';
                if (match) project.classList.add('fade-in');
            });
        });
    });

    document.querySelectorAll('.social-icons a, .contact-tile, .social-link, .footer-bar a').forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href') || '';
            const platform = href.includes('linkedin') ? 'LinkedIn'
                : href.includes('github') ? 'GitHub' : 'Email';
            if (typeof gtag === 'function') {
                gtag('event', 'social_click', { platform });
            }
        });
    });

    document.querySelectorAll('.bento-link').forEach(link => {
        link.addEventListener('click', () => {
            const title = link.closest('.bento-item')?.querySelector('h3')?.textContent;
            if (typeof gtag === 'function' && title) {
                gtag('event', 'project_click', { project_title: title });
            }
        });
    });

    document.querySelector('.resume-cta a')?.addEventListener('click', () => {
        if (typeof gtag === 'function') {
            gtag('event', 'resume_download');
        }
    });
});
