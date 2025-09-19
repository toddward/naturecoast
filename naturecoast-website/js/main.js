// Age Verification
function verifyAge(isOver21) {
    const modal = document.getElementById('age-verification');

    if (isOver21) {
        // Set cookie to remember verification for 30 days
        setCookie('age_verified', 'true', 30);
        modal.classList.add('hidden');
    } else {
        // Redirect to appropriate page
        window.location.href = 'https://www.google.com';
    }
}

// Check age verification on page load
window.addEventListener('DOMContentLoaded', function() {
    const ageVerified = getCookie('age_verified');
    const modal = document.getElementById('age-verification');

    if (ageVerified === 'true') {
        modal.classList.add('hidden');
    }
});

// Cookie functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');

    mobileNav.classList.toggle('active');
    toggleBtn.classList.toggle('active');
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Scroll to Top Button (if needed)
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});

// Add scroll effect to header
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;

    // Add shadow on scroll
    if (scrollTop > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form Validation (for contact form)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Remove error class on input
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});