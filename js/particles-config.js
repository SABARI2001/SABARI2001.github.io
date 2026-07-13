particlesJS('particles-js', {
    particles: {
        number: {
            value: 70,
            density: { enable: true, value_area: 900 }
        },
        color: { value: '#6366f1' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.45,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.15, sync: false }
        },
        size: {
            value: 2.5,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 140,
            color: '#818cf8',
            opacity: 0.25,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.8,
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
            grab: { distance: 120, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 3 }
        }
    },
    retina_detect: true
});
