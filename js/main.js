/* ============================================================
   main.js — David Cerqueira Personal Brand
   Pure vanilla JS: language toggle, nav scroll, mobile menu
   ============================================================ */

(() => {
  'use strict';

  /* ── Helpers ──────────────────────────────────────────── */

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => ctx.querySelectorAll(selector);

  /* ── Language System ──────────────────────────────────── */

  const LANG_KEY = 'dc-preferred-lang';

  /**
   * Detect preferred language: stored → browser → default PT
   */
  function detectLang() {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
    const nav = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : 'en';
  }

  /**
   * Apply language to entire page.
   * Elements with data-pt / data-en get their textContent set.
   * The html[data-lang] attribute drives any CSS toggles.
   */
  function applyLang(lang) {
    const html = document.documentElement;
    html.lang = lang === 'pt' ? 'pt-BR' : 'en';
    html.dataset.lang = lang;

    $$('[data-pt]').forEach(el => {
      const text = el.dataset[lang];
      if (text !== undefined) el.textContent = text;
    });

    // Update toggle visual state
    const toggle = $('#langToggle');
    if (toggle) {
      const active   = toggle.querySelector('.lang-toggle__active');
      const inactive = toggle.querySelector('.lang-toggle__inactive');
      if (active)   active.textContent   = lang.toUpperCase();
      if (inactive) inactive.textContent = lang === 'pt' ? 'EN' : 'PT';
      toggle.setAttribute('aria-label',
        lang === 'pt' ? 'Switch to English' : 'Mudar para Português');
    }

    // Mirror to mobile menu translatable items
    $$('[data-pt]').forEach(el => {
      const text = el.dataset[lang];
      if (text !== undefined) el.textContent = text;
    });

    localStorage.setItem(LANG_KEY, lang);
  }

  function initLang() {
    applyLang(detectLang());

    $('#langToggle')?.addEventListener('click', () => {
      const current = document.documentElement.dataset.lang || 'pt';
      applyLang(current === 'pt' ? 'en' : 'pt');
    });
  }

  /* ── Navigation Scroll Effect ─────────────────────────── */

  function initNavScroll() {
    const nav = $('#nav');
    if (!nav) return;

    const onScroll = () =>
      nav.classList.toggle('scrolled', window.scrollY > 20);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Menu ──────────────────────────────────────── */

  function initMobileMenu() {
    const burger    = $('#navBurger');
    const mobileNav = $('#navMobile');
    if (!burger || !mobileNav) return;

    function closeMenu() {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function openMenu() {
      burger.classList.add('open');
      mobileNav.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    // Close on any link inside the mobile menu
    $$('a', mobileNav).forEach(a =>
      a.addEventListener('click', closeMenu)
    );

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close when resizing past mobile breakpoint
    const mq = window.matchMedia('(min-width: 820px)');
    mq.addEventListener('change', e => { if (e.matches) closeMenu(); });
  }

  /* ── Smooth Scroll Polyfill for older Safari ──────────── */

  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without triggering scroll
        history.pushState(null, '', `#${id}`);
      });
    });
  }

  /* ── Init ─────────────────────────────────────────────── */

  function init() {
    initLang();
    initNavScroll();
    initMobileMenu();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
