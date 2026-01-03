// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements and observe them
// Fade in for service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Slide in from left for feature cards (alternating)
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((el, index) => {
    if (index % 2 === 0) {
        el.classList.add('slide-in-left');
    } else {
        el.classList.add('slide-in-right');
    }
    observer.observe(el);
});

// Scale in for tech items
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach(el => {
    el.classList.add('scale-in');
    observer.observe(el);
});

// Slide in for industry cards
const industryCards = document.querySelectorAll('.industry-card');
industryCards.forEach((el, index) => {
    if (index % 2 === 0) {
        el.classList.add('slide-in-left');
    } else {
        el.classList.add('slide-in-right');
    }
    observer.observe(el);
});

// Slide in from left for contact items
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(el => {
    el.classList.add('slide-in-left');
    observer.observe(el);
});

// Add animation to section headers
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add animation to about text
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    aboutText.classList.add('slide-in-left');
    observer.observe(aboutText);
}

// Add animation to contact form
const contactFormWrapper = document.querySelector('.contact-form-wrapper');
if (contactFormWrapper) {
    contactFormWrapper.classList.add('slide-in-right');
    observer.observe(contactFormWrapper);
}

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Disable submit button and show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Submit form data to Formspree
        const formData = new FormData(contactForm);
        const response = await fetch('https://formspree.io/f/mldzdena', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showNotification('Thank you for contacting us. Our team will get back to you within 24 hours.', 'success');
            contactForm.reset();
        } else {
            const data = await response.json();
            if (data.errors) {
                showNotification('Oops! There was a problem submitting your form. Please try again.', 'error');
            } else {
                showNotification('Oops! There was a problem submitting your form. Please try again.', 'error');
            }
        }
    } catch (error) {
        showNotification('Network error. Please check your connection and try again.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// Notification Function
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation to CTA section
const ctaContent = document.querySelector('.cta-content');
if (ctaContent) {
    ctaContent.classList.add('scale-in');
    observer.observe(ctaContent);
}

// Service Card Hover Effect Enhancement
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Lazy Loading Images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Window Resize Handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }, 250);
});

// Prevent default form submission on Enter key in input fields (except textarea)
document.querySelectorAll('.contact-form input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});

// Add active class style to nav links
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

console.log('Infonixx website loaded successfully!');