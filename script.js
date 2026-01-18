// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const progressBar = document.getElementById('progressBar');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Active Link Highlighting based on Scroll Position
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Update scroll progress bar
    updateProgressBar();
    
    // Show/hide scroll to top button
    toggleScrollTopButton();
});

// Update Progress Bar
function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
}

// Toggle Scroll Top Button
function toggleScrollTopButton() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
}

// Scroll to Top Functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation and Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Mohon lengkapi semua field yang wajib diisi.');
        return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid.');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    document.querySelector('.btn-text').style.display = 'none';
    document.querySelector('.btn-loading').style.display = 'inline';
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('Terima kasih! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda.');
        
        // Reset button state
        submitBtn.classList.remove('loading');
        document.querySelector('.btn-text').style.display = 'inline';
        document.querySelector('.btn-loading').style.display = 'none';
    }, 2000);
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Initialize Skill Bars Animation
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-progress');

const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill bars
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

skillsObserver.observe(skillsSection);

// Typewriter Effect for Hero Section Role Text
function typewriterEffect() {
    const roleText = document.getElementById('typewriter');
    const roles = ['Frontend Developer', 'UI Designer', 'Web Developer', 'Creative Thinker'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Removing characters
            roleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 100;
        } else {
            // Adding characters
            roleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Initialize typewriter effect
typewriterEffect();

// Dark Mode Toggle (Optional Feature)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.title = 'Toggle Dark Mode';
    
    // Add dark mode toggle to header
    const logo = document.querySelector('.logo');
    logo.parentNode.insertBefore(darkModeToggle, logo.nextSibling);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Initialize dark mode toggle
initDarkMode();

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    // Add fade-in animation with delay
    card.style.animationDelay = `${index * 0.2}s`;
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize other animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should animate
    const fadeElements = [
        ...document.querySelectorAll('.about-content'),
        ...document.querySelectorAll('.skills-grid'),
        ...document.querySelectorAll('.projects-grid'),
        ...document.querySelectorAll('.contact-content')
    ];
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });
});