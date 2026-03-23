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
