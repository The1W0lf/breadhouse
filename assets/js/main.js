/* Bread House — interactions. Small, no dependencies. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Photo slots -------------------------------------------------
     Each .slot holds an <img>. If the file isn't in media/ yet, mark the
     slot empty so it shows which photo belongs there. Drop the file in
     and it renders on the next load — no code change needed.          */
  document.querySelectorAll('.slot').forEach(function (slot) {
    var img = slot.querySelector('img');
    if (!img) return;

    var markEmpty = function () { slot.classList.add('slot--empty'); };
    var markFilled = function () { slot.classList.remove('slot--empty'); };

    if (img.complete) {
      img.naturalWidth > 0 ? markFilled() : markEmpty();
    } else {
      img.addEventListener('load', markFilled);
      img.addEventListener('error', markEmpty);
    }
  });

  /* --- Mobile menu -------------------------------------------------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };

    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* --- Header state on scroll --------------------------------------- */
  var hdr = document.getElementById('hdr');
  if (hdr) {
    var onScroll = function () {
      hdr.classList.toggle('is-stuck', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Scroll reveal ------------------------------------------------ */
  var targets = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach(function (el, i) {
      // Stagger siblings within the same grid so rows cascade.
      el.style.transitionDelay = (i % 3) * 90 + 'ms';
      io.observe(el);
    });

    // Safety net: anything still hidden once the page has fully loaded and
    // settled gets revealed, so a missed observer callback can never leave a
    // section permanently invisible.
    window.addEventListener('load', function () {
      setTimeout(function () {
        targets.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
        });
      }, 400);
    });
  }

  /* --- Footer year -------------------------------------------------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
