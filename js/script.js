/**
 * ==========================================================================
 * BIND & YIELD — Main JavaScript
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. Navbar Scroll State
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (!navbar) return;
    // Añade la clase 'is-scrolled' cuando el usuario baja más de 20px
    if (window.scrollY > 20) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  // Escuchar el evento de scroll (usar passive para mejor rendimiento)
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Ejecutar una vez al cargar por si la página ya está scrolleada
  handleScroll();


  // ==========================================================================
  // 2. Mobile Menu Toggle
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Cerrar el menú móvil al hacer clic en un enlace
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ==========================================================================
  // 3. Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  // Comprueba si el usuario tiene activada la reducción de movimiento
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealElements.length > 0 && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px', // Activa la animación un poco antes de llegar al fondo
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Deja de observar el elemento una vez que ya apareció
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: Si no hay soporte o prefiere no animaciones, mostrar todo
    revealElements.forEach(el => el.classList.add('is-visible'));
  }


  // ==========================================================================
  // 4. Form Validation & Handling
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      // Selecciona todos los inputs y textareas requeridos
      const requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        // Limpia estados previos
        field.classList.remove('is-invalid');
        
        // Validación básica de campos vacíos
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        }

        // Validación específica para email
        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            isValid = false;
            field.classList.add('is-invalid');
          }
        }
      });

      if (isValid) {
        // Aquí iría tu lógica de envío (Fetch API, form action, etc.)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        // Simulación de envío exitoso (reemplazar con API real)
        setTimeout(() => {
          alert('¡Gracias! Tu mensaje ha sido enviado exitosamente.');
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 1500);
      }
    });

    // Remover estado de error al escribir
    contactForm.addEventListener('input', function(e) {
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

});