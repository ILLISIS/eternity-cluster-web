// ─── Active nav link ─────────────────────────────────────────────────────────
(function () {
  function normalisePage(pathname) {
    const page = pathname.split('/').pop();
    return page && page !== '' ? page.toLowerCase() : 'index.html';
  }

  const currentPage = normalisePage(window.location.pathname);

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');

    if (!href || href.startsWith('#')) {
      return;
    }

    const linkUrl = new URL(href, window.location.href);

    if (linkUrl.origin !== window.location.origin) {
      return;
    }

    if (normalisePage(linkUrl.pathname) === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

// ─── FAQ accordion ───────────────────────────────────────────────────────────
(function () {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!nav || !navToggle || !navMenu) {
    return;
  }

  function closeNav() {
    nav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  function openNav() {
    nav.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  navToggle.addEventListener('click', () => {
    if (nav.classList.contains('nav-open')) {
      closeNav();
      return;
    }

    openNav();
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  document.addEventListener('click', event => {
    if (!nav.classList.contains('nav-open')) {
      return;
    }

    if (!nav.contains(event.target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  const mobileNavMedia = window.matchMedia('(max-width: 820px)');
  const handleNavMediaChange = event => {
    if (!event.matches) {
      closeNav();
    }
  };

  if (typeof mobileNavMedia.addEventListener === 'function') {
    mobileNavMedia.addEventListener('change', handleNavMediaChange);
  } else {
    mobileNavMedia.addListener(handleNavMediaChange);
  }
})();

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const inner = item.querySelector('.faq-answer-inner');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-answer').style.maxHeight = '0';
    });

    // Open clicked (if it wasn't already open)
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = inner.scrollHeight + 32 + 'px';
    }
  });
});
