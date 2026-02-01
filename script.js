<<<<<<< HEAD
// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function untuk optimize scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// THEME TOGGLE (Dark/Light Mode)
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to system preference
const getThemePreference = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Set theme
const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
};

// Initialize theme
setTheme(getThemePreference());

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
=======
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
>>>>>>> 298ba71441d7a9ba25c516d198c4fb52833c5fcb
        navMenu.classList.remove('active');
    });
});

<<<<<<< HEAD
// ============================================
// HEADER SCROLL EFFECT
// ============================================

const header = document.getElementById('header');
let lastScroll = 0;

const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, 10);

window.addEventListener('scroll', handleScroll);

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const scrollProgress = document.getElementById('scrollProgress');

const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
};

window.addEventListener('scroll', debounce(updateScrollProgress, 10));

// ============================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ============================================

const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', debounce(highlightNavigation, 10));

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

// Smooth scroll untuk semua link internal
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        // Skip jika href hanya "#"
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ============================================
// TYPEWRITER EFFECT
// ============================================

const typewriter = document.getElementById('typewriter');
const texts = [
    'Frontend Developer',
    'UI/UX Designer',
    'Creative Thinker',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

// Start typewriter effect
type();

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.setProperty('--progress-width', progress + '%');
                });
            }
        }
    });
}, observerOptions);

// Observe elements
const elementsToObserve = [
    ...document.querySelectorAll('.section-title'),
    ...document.querySelectorAll('.skill-category'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.timeline-item')
];

elementsToObserve.forEach(el => observer.observe(el));

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollTopBtn = document.getElementById('scrollTop');

const toggleScrollTopButton = debounce(() => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}, 10);

window.addEventListener('scroll', toggleScrollTopButton);

=======
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
>>>>>>> 298ba71441d7a9ba25c516d198c4fb52833c5fcb
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

<<<<<<< HEAD
// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
function validateField(field, validationFn, errorMsg) {
    const formGroup = field.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (!validationFn(field.value.trim())) {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        errorElement.textContent = errorMsg;
        return false;
    } else {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        errorElement.textContent = '';
        return true;
    }
}

function validateName(value) {
    return value.length >= 2;
}

function validateEmail(value) {
    return emailPattern.test(value);
}

function validateMessage(value) {
    return value.length >= 10;
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    validateField(nameInput, validateName, 'Nama harus minimal 2 karakter');
});

emailInput.addEventListener('blur', () => {
    validateField(emailInput, validateEmail, 'Email tidak valid');
});

messageInput.addEventListener('blur', () => {
    validateField(messageInput, validateMessage, 'Pesan harus minimal 10 karakter');
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateField(nameInput, validateName, 'Nama harus minimal 2 karakter');
    const isEmailValid = validateField(emailInput, validateEmail, 'Email tidak valid');
    const isMessageValid = validateField(messageInput, validateMessage, 'Pesan harus minimal 10 karakter');
    
    if (isNameValid && isEmailValid && isMessageValid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Hide loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            alert('✅ Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
            
            // Reset form
            contactForm.reset();
            
            // Remove validation classes
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success', 'error');
            });
        }, 2000);
    }
});

// ============================================
// PREVENT LAYOUT SHIFT FOR TYPEWRITER
// ============================================

// Set min-width based on longest text
const longestText = texts.reduce((a, b) => a.length > b.length ? a : b);
const tempSpan = document.createElement('span');
tempSpan.style.visibility = 'hidden';
tempSpan.style.position = 'absolute';
tempSpan.textContent = longestText;
document.body.appendChild(tempSpan);
const minWidth = tempSpan.offsetWidth;
document.body.removeChild(tempSpan);
typewriter.style.minWidth = minWidth + 'px';

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Set initial scroll progress
    updateScrollProgress();
    
    // Highlight initial navigation
    highlightNavigation();
    
    // Check scroll top button visibility
    toggleScrollTopButton();
    
    // Setup smooth scrolling untuk SEMUA link internal
    setupSmoothScroll();
    
    console.log('🚀 Portfolio website loaded successfully!');
});

// Function untuk setup smooth scroll
function setupSmoothScroll() {
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            
            // Skip jika href hanya "#"
            if (targetId === '#' || !targetId) return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                console.log('Scrolling to:', targetId);
            } else {
                console.warn('Target not found:', targetId);
            }
        });
    });
    
    console.log('✅ Smooth scroll setup complete for', allLinks.length, 'links');
}
=======
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
>>>>>>> 298ba71441d7a9ba25c516d198c4fb52833c5fcb
