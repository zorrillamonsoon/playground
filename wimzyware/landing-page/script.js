/* ============================================================
   Wimzyware Landing Page Scripts
   ============================================================ */

(function () {
  'use strict';

  /* --- Intersection Observer: Fade-in on Scroll --- */
  function initFadeInObserver() {
    var elements = document.querySelectorAll('.fade-in');

    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Smooth Scroll for Anchor Links --- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        // Close mobile nav if open
        var navLinks = document.querySelector('.nav__links');
        var toggle = document.querySelector('.nav__toggle');
        if (navLinks && navLinks.classList.contains('nav__links--open')) {
          navLinks.classList.remove('nav__links--open');
          toggle.setAttribute('aria-expanded', 'false');
        }

        var headerHeight = document.querySelector('.site-header').offsetHeight;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

        window.scrollTo({
          top: top,
          behavior: 'smooth',
        });
      });
    });
  }

  /* --- Mobile Nav Toggle --- */
  function initMobileNav() {
    var toggle = document.querySelector('.nav__toggle');
    var navLinks = document.querySelector('.nav__links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('nav__links--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* --- Waitlist Form Handler --- */
  function initWaitlistForms() {
    var forms = [
      { formId: 'waitlist-form', successId: 'waitlist-success' },
      { formId: 'footer-email-form', successId: null },
    ];

    forms.forEach(function (cfg) {
      var form = document.getElementById(cfg.formId);
      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var input = form.querySelector('input[type="email"]');
        var email = input ? input.value.trim() : '';

        if (!email) return;

        console.log('[Wimzyware] Waitlist signup:', email);

        // Show success message if element exists
        if (cfg.successId) {
          var success = document.getElementById(cfg.successId);
          if (success) {
            success.hidden = false;
          }
        }

        // Reset form and show brief feedback
        input.value = '';
        input.placeholder = 'Thanks! We\'ll be in touch.';

        setTimeout(function () {
          input.placeholder = 'you@company.com';
        }, 3000);
      });
    });
  }

  /* --- Init --- */
  document.addEventListener('DOMContentLoaded', function () {
    initFadeInObserver();
    initSmoothScroll();
    initMobileNav();
    initWaitlistForms();
  });
})();
