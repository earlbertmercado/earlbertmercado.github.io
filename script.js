const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
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
}

const currentTheme = getPreferredTheme();
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("year").textContent = new Date().getFullYear();
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    revealOnScroll();
    
    window.addEventListener('scroll', revealOnScroll);
    
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (!targetId.startsWith('#')) return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    const highlightCurrentSection = () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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
    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    revealElements.forEach(element => {
        element.classList.remove('active');
    });
    
    setTimeout(() => {
        revealOnScroll();
    }, 100);
});