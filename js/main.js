// Mobile Navigation Toggle
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobile-nav');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        hamburger.textContent = '☰';
    } else {
        mobileNav.classList.add('active');
        hamburger.textContent = '✕';
    }
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobile-nav');
    const hamburger = document.querySelector('.hamburger');
    
    if (!mobileNav.contains(event.target) && !hamburger.contains(event.target)) {
        mobileNav.classList.remove('active');
        hamburger.textContent = '☰';
    }
});

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Cart management
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount && window.Snipcart) {
        const count = window.Snipcart.api.cart.items().length;
        cartCount.textContent = count;
        
        if (count > 0) {
            cartCount.classList.add('updated');
            setTimeout(() => {
                cartCount.classList.remove('updated');
            }, 600);
        }
    }
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Snipcart to load
    setTimeout(updateCartCount, 1000);
    
    // Add scroll listener
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Set active nav link based on current page
    setActiveNavLink();
    var yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Snipcart event listeners
if (window.Snipcart) {
    // Update cart count when items are added
    window.Snipcart.subscribe('cart.added', function(item) {
        updateCartCount();
    });
    
    // Update cart count when items are removed
    window.Snipcart.subscribe('cart.removed', function(item) {
        updateCartCount();
    });
    
    // Update cart count when cart is updated
    window.Snipcart.subscribe('cart.updated', function(cart) {
        updateCartCount();
    });
}

// Smooth scrolling for anchor links
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

// Form validation and submission
function validateForm(form) {
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

// Add form validation to contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }
});

// Product image lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading states to buttons
function addLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('snipcart-add-item')) {
                this.classList.add('loading');
                this.textContent = 'Adding...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = 'Add to Cart';
                }, 2000);
            }
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Add fade-in animation to elements
function addFadeInAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    const elements = document.querySelectorAll('.product-card, .section');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize fade-in animations
document.addEventListener('DOMContentLoaded', addFadeInAnimation); 