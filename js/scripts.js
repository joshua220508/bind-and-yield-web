/**
 * ==========================================================================
 * BIND & YIELD — Main JavaScript
 * ==========================================================================
 */
// ==========================================================================
  // 0. Animación de Bienvenida (Solo en la carga inicial de la sesión)
  // ==========================================================================
  const initPreloader = () => {
    const preloader = document.getElementById('page-preloader');
    if (!preloader || sessionStorage.getItem('by_intro_played')) return;

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      preloader.classList.add('is-leaving');
      document.body.style.overflow = '';
      sessionStorage.setItem('by_intro_played', 'true');

      setTimeout(() => {
        preloader.remove();
      }, 550);
    }, 950);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
  } else {
    initPreloader();
  }
const initBindAndYield = () => {
  // ==========================================================================
  // 1. Navbar Scroll State & Scroll Indicator (Optimizado a 60fps)
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const scrollIndicator = document.getElementById('scroll-indicator');
  let isTicking = false;

  const updateScrollElements = () => {
    const isScrolled = window.scrollY > 30;

    if (navbar) {
      navbar.classList.toggle('is-scrolled', isScrolled);
    }

    if (scrollIndicator) {
      scrollIndicator.classList.toggle('is-hidden', isScrolled);
    }

    isTicking = false;
  };

  const handleScroll = () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateScrollElements);
      isTicking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateScrollElements();

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
  // 3. Scroll Reveal Animations (Aparición temprana y sutil)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const showAllRevealElements = () => {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  };

  if (revealElements.length > 0 && !prefersReducedMotion && 'IntersectionObserver' in window) {
    // Suaviza retrasos largos en tarjetas para evitar apariciones tardías o bruscas
    revealElements.forEach((el) => {
      if (el.style.transitionDelay) {
        const currentDelay = parseInt(el.style.transitionDelay, 10);
        if (!isNaN(currentDelay) && currentDelay > 100) {
          el.style.transitionDelay = '90ms';
        }
      }
    });

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
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.02
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // Respaldo de visibilidad para elementos ya en pantalla
    setTimeout(() => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('is-visible');
        }
      });
    }, 500);
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
// ==========================================================================
  // 1. Navbar Scroll State, Bottom Nav & Scroll Indicator (Optimizado a 60fps)
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const mobileBottomNav = document.getElementById('mobile-bottom-nav');
  let isTicking = false;

  const updateScrollElements = () => {
    const isScrolled = window.scrollY > 30;

    if (navbar) {
      navbar.classList.toggle('is-scrolled', isScrolled);
    }

    if (scrollIndicator) {
      scrollIndicator.classList.toggle('is-hidden', isScrolled);
    }

    if (mobileBottomNav) {
      mobileBottomNav.classList.toggle('is-visible', isScrolled);
    }

    isTicking = false;
  };

  const handleScroll = () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateScrollElements);
      isTicking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateScrollElements();

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

    // Oculta el navbar inferior mientras el menú superior esté desplegado
    if (mobileBottomNav) {
      mobileBottomNav.classList.toggle('hidden', isOpen);
    }
    // ==========================================================================
  // 4. Formulario de Contacto -> Redirección a WhatsApp
  // ==========================================================================
  const WHATSAPP_NUMBER = '50558228147'; // <-- Reemplaza por tu número (código de país + número, sin + ni espacios)

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('client-name');
    const businessInput = document.getElementById('business-name');
    const typeSelect = document.getElementById('project-type');
    const messageInput = document.getElementById('project-message');

    const errorName = document.getElementById('error-name');
    const errorBusiness = document.getElementById('error-business');
    const errorType = document.getElementById('error-type');
    const feedbackBox = document.getElementById('form-feedback');

    const toggleFieldError = (field, errorEl, hasError) => {
      if (!field || !errorEl) return;
      field.classList.toggle('is-invalid', hasError);
      errorEl.classList.toggle('hidden', !hasError);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = nameInput.value.trim();
      const businessName = businessInput.value.trim();
      const projectType = typeSelect.value;
      const projectMessage = messageInput.value.trim();

      // Validación de campos obligatorios
      const isNameInvalid = clientName === '';
      const isBusinessInvalid = businessName === '';
      const isTypeInvalid = projectType === '';

      toggleFieldError(nameInput, errorName, isNameInvalid);
      toggleFieldError(businessInput, errorBusiness, isBusinessInvalid);
      toggleFieldError(typeSelect, errorType, isTypeInvalid);

      if (isNameInvalid || isBusinessInvalid || isTypeInvalid) {
        return;
      }

      // Construcción del mensaje estructurado
      let text = `Hola Bind & Yield, me gustaría consultar por un proyecto web.\n\n`;
      text += `*Nombre:* ${clientName}\n`;
      text += `*Negocio:* ${businessName}\n`;
      text += `*Solución de interés:* ${projectType}`;

      if (projectMessage) {
        text += `\n*Detalles:* ${projectMessage}`;
      }

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

      // Muestra aviso de confirmación y abre WhatsApp
      if (feedbackBox) {
        feedbackBox.classList.remove('hidden');
      }

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
  };