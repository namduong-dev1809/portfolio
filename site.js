  // shortcut: no-IO browsers just show everything, which is fine
  const io = 'IntersectionObserver' in window && new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  // VI/EN: elements with data-vi hold the Vietnamese HTML; English stays in the markup.
  // shortcut: only client-facing parts (nav, hero, services, contact, headings) are translated, extend data-vi if needed
  const langBtn = document.querySelector('.lang');
  const tr = [...document.querySelectorAll('[data-vi]')];
  tr.forEach(el => el.dataset.en = el.innerHTML);
  function setLang(lang) {
    tr.forEach(el => el.innerHTML = el.dataset[lang]);
    document.documentElement.lang = lang;
    langBtn.textContent = lang === 'vi' ? 'EN' : 'VI';
    langBtn.setAttribute('aria-label', lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt');
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved || (navigator.language.startsWith('vi') ? 'vi' : 'en'));
  langBtn.addEventListener('click', () => setLang(document.documentElement.lang === 'vi' ? 'en' : 'vi'));
