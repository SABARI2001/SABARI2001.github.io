particlesJS('particles-js', {
    particles: {
        number: {
            value: 55,
            density: { enable: true, value_area: 1000 }
        },
        color: { value: '#0f9c8a' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.35,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 2.2,
            random: true,
            anim: { enable: true, speed: 1.5, size_min: 0.4, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 130,
            color: '#0f9c8a',
            opacity: 0.18,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        },
        modes: {
            grab: { distance: 110, line_linked: { opacity: 0.4 } },
            push: { particles_nb: 2 }
        }
    },
    retina_detect: true
});
