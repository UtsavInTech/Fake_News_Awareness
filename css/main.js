// main.js — interactions: AOS init, form demos, keyboard navigation, language persistence
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS safely
  try { if (window.AOS) AOS.init({ duration: 900, once: true }); } catch (e) { console.warn('AOS error', e); }

  // Simple demo form handling
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const obj = Object.fromEntries(data.entries());
      console.log('Demo form submission:', obj);
      alert('Thanks — we received your submission. (Demo only)');
      form.reset();
    });
  });

  // Demo send button
  const demo = document.getElementById('demo-send');
  if (demo) demo.addEventListener('click', () => alert('Demo message sent.'));

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      const next = document.querySelector('.slide-nav .next');
      if (next) window.location = next.href;
    }
    if (e.key === 'ArrowLeft') {
      const prev = document.querySelector('.slide-nav .prev');
      if (prev) window.location = prev.href;
    }
  });

  // Set logo gradient per page
  const theme = document.body.getAttribute('data-theme');
  const logo = document.querySelector('.logo-animated');
  if (theme && logo) {
    const grads = {
      home: 'linear-gradient(135deg,var(--blue-start),var(--blue-end))',
      about: 'linear-gradient(135deg,var(--purple-start),var(--purple-end))',
      identify: 'linear-gradient(135deg,var(--teal-start),var(--teal-end))',
      factcheck: 'linear-gradient(135deg,var(--orange-start),var(--orange-end))',
      community: 'linear-gradient(135deg,var(--green-start),var(--green-end))',
      contact: 'linear-gradient(135deg,var(--violet-start),var(--violet-end))'
    };
    logo.style.background = grads[theme] || grads.home;
  }

  // 🌍 Language persistence
  const langKey = 'preferredLanguage';
  const observer = new MutationObserver(() => {
    const iframe = document.querySelector('.goog-te-menu-frame');
    if (iframe && localStorage.getItem(langKey)) {
      const lang = localStorage.getItem(langKey);
      const select = iframe.contentDocument.querySelector('.goog-te-menu2-item span.text:contains("' + lang + '")');
      if (select) select.click();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // When user changes language, save it
  document.addEventListener('change', e => {
    if (e.target.closest('.goog-te-combo')) {
      const selectedLang = e.target.value;
      localStorage.setItem(langKey, selectedLang);
    }
  });
});