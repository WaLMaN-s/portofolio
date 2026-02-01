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
        navMenu.classList.remove('active');
    });
});

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

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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