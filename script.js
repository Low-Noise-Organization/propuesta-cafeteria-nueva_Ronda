/* ============================================================
   Nueva Ronda — Bar de Tapas en Córdoba
   JavaScript: menú responsive, scroll, galería, formulario, etc.
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Elements ---- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const scrollProgress = document.getElementById('scrollProgress');
  const lightbox = document.getElementById('lightbox');
  const lightboxSvg = document.getElementById('lightboxSvg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const galleryImgs = document.querySelectorAll('.gallery-img');
  const form = document.getElementById('contactForm');


  /* ============================================================
     1. NAVBAR: scroll effect + hamburger
     ============================================================ */
  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });


  /* ============================================================
     2. SCROLL PROGRESS BAR
     ============================================================ */
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
    scrollProgress.setAttribute('aria-valuenow', Math.round(progress));
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });


  /* ============================================================
     3. BACK TO TOP BUTTON
     ============================================================ */
  function handleBackToTopVisibility() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ============================================================
     4. SCROLL REVEAL ANIMATIONS
     ============================================================ */
  function applyRevealEffects() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
      if (!section.classList.contains('reveal') && !section.classList.contains('reveal-left') && !section.classList.contains('reveal-right')) {
        section.classList.add('reveal');
      }
    });

    const cards = document.querySelectorAll('.menu-card, .gallery-item, .review-item');
    cards.forEach(function (card, index) {
      card.style.transitionDelay = (index % 3) * 0.1 + 's';
    });
  }
  applyRevealEffects();

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ============================================================
     5. GALLERY LIGHTBOX
     ============================================================ */
  galleryImgs.forEach(function (img) {
    img.addEventListener('click', function () {
      const svgContent = this.innerHTML;
      const label = this.getAttribute('data-label') || 'Imagen';
      lightboxSvg.innerHTML = svgContent;
      lightboxCaption.textContent = label;
      lightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    });

    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
      closeLightbox();
    }
  });


  /* ============================================================
     6. FORM VALIDATION
     ============================================================ */
  if (form) {
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const msgInput = document.getElementById('formMessage');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const msgError = document.getElementById('msgError');

    function validateField(input, errorEl, validateFn) {
      const error = validateFn(input.value.trim());
      if (error) {
        input.classList.add('error');
        errorEl.textContent = error;
        return false;
      }
      input.classList.remove('error');
      errorEl.textContent = '';
      return true;
    }

    function validateName(value) {
      if (!value) return 'El nombre es obligatorio.';
      if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres.';
      return '';
    }

    function validateEmail(value) {
      if (!value) return 'El email es obligatorio.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Introduce un email válido.';
      return '';
    }

    function validateMessage(value) {
      if (!value) return 'El mensaje es obligatorio.';
      if (value.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
      return '';
    }

    nameInput.addEventListener('blur', function () {
      validateField(nameInput, nameError, validateName);
    });

    emailInput.addEventListener('blur', function () {
      validateField(emailInput, emailError, validateEmail);
    });

    msgInput.addEventListener('blur', function () {
      validateField(msgInput, msgError, validateMessage);
    });

    nameInput.addEventListener('input', function () {
      if (this.classList.contains('error')) {
        validateField(nameInput, nameError, validateName);
      }
    });

    emailInput.addEventListener('input', function () {
      if (this.classList.contains('error')) {
        validateField(emailInput, emailError, validateEmail);
      }
    });

    msgInput.addEventListener('input', function () {
      if (this.classList.contains('error')) {
        validateField(msgInput, msgError, validateMessage);
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameError, validateName);
      const isEmailValid = validateField(emailInput, emailError, validateEmail);
      const isMsgValid = validateField(msgInput, msgError, validateMessage);

      if (isNameValid && isEmailValid && isMsgValid) {
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando...';
        submitBtn.disabled = true;

        setTimeout(function () {
          form.innerHTML = '<div class="form-success"><div class="form-success-icon" aria-hidden="true">✅</div><h3>Mensaje enviado</h3><p>Gracias por contactar con Nueva Ronda. Te responderemos lo antes posible.</p></div>';
        }, 800);
      } else {
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isMsgValid) msgInput.focus();
      }
    });
  }


  /* ============================================================
     7. LAZY LOADING (maps iframe)
     ============================================================ */
  const mapIframe = document.querySelector('.location-map iframe');
  if (mapIframe) {
    const mapObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const src = mapIframe.getAttribute('src');
          mapIframe.setAttribute('src', src);
          mapObserver.unobserve(mapIframe);
        }
      });
    }, { rootMargin: '200px' });
    mapObserver.observe(mapIframe);
  }


  /* ============================================================
     8. SMOOTH SCROLL FOR ANCHOR LINKS (fallback)
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ============================================================
     9. PERFORMANCE: debounce utility
     ============================================================ */
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  window.addEventListener('resize', debounce(function () {
    if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
      closeMenu();
    }
  }, 200));

});
