/**
 * ==========================================================================
 * BIND & YIELD — Main JavaScript
 * ==========================================================================
 */

const initBindAndYield = () => {
  // ==========================================================================
  // 1. Navbar Scroll State
  // ==========================================================================
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================================================
  // 2. Mobile Menu Toggle
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenuOpen = document.getElementById('icon-menu-open');
  const iconMenuClose = document.getElementById('icon-menu-close');
  const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

  const setMobileMenuState = (isOpen) => {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.classList.toggle('hidden', !isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));

    if (iconMenuOpen && iconMenuClose) {
      iconMenuOpen.classList.toggle('hidden', isOpen);
      iconMenuClose.classList.toggle('hidden', !isOpen);
    }
  };

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isCurrentlyOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      setMobileMenuState(!isCurrentlyOpen);
    });

    mobileMenuLinks.forEach((link) => {
      link.addEventListener('click', () => setMobileMenuState(false));
    });
  }

  // ==========================================================================
  // 3. Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const showAllRevealElements = () => {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  };

  if (revealElements.length > 0 && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -20px 0px',
        threshold: 0.05
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // Respaldo: asegura que los elementos visibles en pantalla nunca queden en opacity: 0
    setTimeout(() => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('is-visible');
        }
      });
    }, 600);
  } else {
    showAllRevealElements();
  }

  // ==========================================================================
  // 4. Form Validation & Handling
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach((field) => {
        field.classList.remove('is-invalid');

        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        }

        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            isValid = false;
            field.classList.add('is-invalid');
          }
        }
      });

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        setTimeout(() => {
          alert('¡Gracias! Tu mensaje ha sido enviado exitosamente.');
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 1500);
      }
    });

    contactForm.addEventListener('input', function (e) {
      if (e.target.classList.contains('is-invalid')) {
        e.target.classList.remove('is-invalid');
      }
    });
  }

  // ==========================================================================
  // 5. Dynamic Footer Year
  // ==========================================================================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBindAndYield);
} else {
  initBindAndYield();
}
const navbar = document.getElementById('navbar');
  const scrollIndicator = document.getElementById('scroll-indicator');

  const handleScroll = () => {
    const isScrolled = window.scrollY > 20;

    if (navbar) {
      navbar.classList.toggle('is-scrolled', isScrolled);
    }

    if (scrollIndicator) {
      scrollIndicator.classList.toggle('is-hidden', isScrolled);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();