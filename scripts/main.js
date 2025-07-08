// Cart icon update
function updateCartCount() {
  const count = window.Snipcart?.store?.getState().cart?.items.count || 0;
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = count > 0 ? count : '';
    cartCount.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

document.addEventListener('snipcart.ready', updateCartCount);
document.addEventListener('snipcart.cart.closed', updateCartCount);
document.addEventListener('snipcart.cart.opened', updateCartCount);
document.addEventListener('snipcart.items.updated', updateCartCount);

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });
    // Close nav when a link is clicked (on mobile)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 800) {
          nav.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
  // Light/Dark mode toggle (optional)
  const modeToggle = document.querySelector('.mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  // Highlight active nav link
  const navLinks = document.querySelectorAll('.nav a');
  const current = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (href === 'index.html' && (current === '' || current === '/'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}); 