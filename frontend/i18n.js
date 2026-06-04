async function loadTranslations(lang) {

  const base = '/frontend/locale/';
  const res = await fetch(`${base}${lang}.json`);
  const data = await res.json();
 
  i18next.addResourceBundle(lang, 'translation', data, true, true);
  await i18next.changeLanguage(lang);
  updatePage();
}
 
function updatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = i18next.t(el.getAttribute('data-i18n'));
  });
 
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = i18next.t(el.getAttribute('data-i18n-placeholder'));
  });
}
 
async function initI18n() {
  const savedLang = localStorage.getItem('lang') || 'en';
 
  await i18next.init({
    lng: savedLang,
    resources: {
      en: { translation: {} },
      es: { translation: {} },
      ja: { translation: {} },
      ko: { translation: {} }
    }
  });
 
  await loadTranslations(savedLang);
 
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      const lang = el.getAttribute('data-lang');
      localStorage.setItem('lang', lang);
      await loadTranslations(lang);
    });
  });
}
 
initI18n();