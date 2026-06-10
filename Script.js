/* ============================================================
   AGROVERDE — script.js
   Features:
   - Preloader
   - Sticky navbar with scroll class
   - Hamburger mobile menu
   - Active nav link highlighting
   - Smooth scroll
   - Back to top button
   - Scroll fade-in animations
   - Contact form validation
   - Blog filter buttons
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ─────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 1700);
    });
  }

  /* ── NAVBAR SCROLL ──────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ── HAMBURGER / MOBILE NAV ─────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── ACTIVE NAV LINK ────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── BACK TO TOP ────────────────────────────────────── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    }, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── FADE-IN ON SCROLL ──────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ── COUNTER ANIMATION (hero stats) ────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current.toLocaleString() + suffix;
          }, 25);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObserver.observe(el));
  }

  /* ── CONTACT FORM VALIDATION ─────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const formSuccess = document.getElementById('form-success');

    const validate = (field) => {
      const group = field.closest('.form-group');
      const val = field.value.trim();
      let valid = true;

      if (!val) {
        valid = false;
      } else if (field.type === 'email') {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      } else if (field.type === 'tel') {
        valid = /^[\d\s\+\-\(\)]{7,}$/.test(val);
      }

      if (!valid) {
        group.classList.add('error');
      } else {
        group.classList.remove('error');
      }
      return valid;
    };

    // Real-time validation
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', () => validate(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-group').classList.contains('error')) validate(field);
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      contactForm.querySelectorAll('[required]').forEach(field => {
        if (!validate(field)) allValid = false;
      });

      if (allValid) {
        // Simulate submit
        const submitBtn = contactForm.querySelector('.btn[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
          if (formSuccess) {
            formSuccess.classList.add('show');
            setTimeout(() => formSuccess.classList.remove('show'), 5000);
          }
        }, 1800);
      }
    });
  }

  /* ── BLOG FILTER BUTTONS ───────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        blogCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── TESTIMONIAL HOVER STAR FILL ──────────────────── */
  // Already handled in CSS, but if you want JS-driven effects, extend here.

  /* ── SERVICE CARD RIPPLE ─────────────────────────── */
  document.querySelectorAll('.service-card, .benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.willChange = 'transform';
    });
    card.addEventListener('mouseleave', function () {
      this.style.willChange = '';
    });
  });

  /* ── HERO IMAGE CAROUSEL ─────────────────────────── */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots   = document.querySelectorAll('.hero-dot');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    let carouselTimer;

    const goToSlide = (index) => {
      heroSlides[currentSlide].classList.remove('active');
      if (heroDots[currentSlide]) heroDots[currentSlide].classList.remove('active');
      currentSlide = (index + heroSlides.length) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
      if (heroDots[currentSlide]) heroDots[currentSlide].classList.add('active');
    };

    const startTimer = () => {
      clearInterval(carouselTimer);
      carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    };

    heroDots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.getAttribute('data-slide')));
        startTimer();
      });
    });

    startTimer();
  }

});