const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function initParticles(theme) {
    const particleColor = theme === 'dark' ? '#ffffff' : '#0a0a0a';

    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 900 } },
            color: { value: particleColor },
            shape: { type: 'circle' },
            opacity: { value: 0.35, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: particleColor, opacity: 0.25, width: 1 },
            move: { enable: true, speed: 2.5, direction: 'none', out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: false }, resize: true },
            modes: { repulse: { distance: 120, duration: 0.4 } }
        },
        retina_detect: true
    });
}

function initFooterParticles(theme) {
    const particleColor = theme === 'light' ? '#ffffff' : '#0a0a0a';

    particlesJS('footer-particles', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: particleColor },
            shape: { type: 'circle' },
            opacity: { value: 0.35, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: particleColor, opacity: 0.25, width: 1 },
            move: { enable: true, speed: 2.5, direction: 'none', out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: false }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } }
        },
        retina_detect: true
    });
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);

    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeIcon.setAttribute('title', 'Switch to light mode');
    } else {
        themeIcon.className = 'fas fa-moon';
        themeIcon.setAttribute('title', 'Switch to dark mode');
    }

    localStorage.setItem('theme', theme);

    // Destroy existing particles instances
    if (window.pJSDom && window.pJSDom.length) {
        window.pJSDom.forEach(p => p.pJS.fn.vendors.destroypJS());
        window.pJSDom = [];
    }

    initParticles(theme);        // Hero particles
    initFooterParticles(theme);  // Footer particles
}

const currentTheme = getPreferredTheme();
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const style = document.createElement('style');
    style.textContent = `
        .active-nav {
            color: var(--accent-gray) !important;
            font-weight: 600 !important;
        }
        .active-nav::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    const highlightCurrentSection = () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 500;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-nav');
            }
        });
    };

    window.addEventListener('scroll', highlightCurrentSection);
    highlightCurrentSection();
});

