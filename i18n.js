(() => {
  "use strict";

  const SUPPORTED_LANGUAGES = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "ca", label: "Català" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
    { code: "hi", label: "हिन्दी" },
    { code: "id", label: "Bahasa Indonesia" },
    { code: "ja", label: "日本語" },
    { code: "ko", label: "한국어" },
    { code: "pt", label: "Português" },
    { code: "tr", label: "Türkçe" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "zh", label: "简体中文" },
    { code: "ar", label: "العربية" },
  ];

  const AVAILABLE_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(({ code }) => code);
  const LANGUAGE_STORAGE_KEY = "happy_animals_lang";
  const FALLBACK_LANGUAGE = "en";

  let language = getInitialLanguage();
  let translations = {};
  let fallbackTranslations = {};

  function isAvailableLanguage(value) {
    return AVAILABLE_LANGUAGE_CODES.includes(value);
  }

  function getInitialLanguage() {
    try {
      const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isAvailableLanguage(storedLanguage)) {
        return storedLanguage;
      }
    } catch {
      // localStorage may be unavailable in restricted browser modes.
    }

    const browserLanguage =
      navigator.language?.split("-")[0]?.toLowerCase() ?? "";

    return isAvailableLanguage(browserLanguage)
      ? browserLanguage
      : FALLBACK_LANGUAGE;
  }

  async function loadLanguage(languageCode) {
    const response = await fetch(`./languages/${languageCode}.json`);

    if (!response.ok) {
      throw new Error(`Could not load language: ${languageCode}`);
    }

    return response.json();
  }

  function t(key, fallback = "", variables = {}) {
    let value = translations[key] ?? fallbackTranslations[key] ?? fallback;

    if (!value) {
      value = key;
    }

    for (const [name, replacement] of Object.entries(variables)) {
      value = value.split(`{${name}}`).join(String(replacement));
    }

    return value;
  }

  function applyDocumentDirection() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (!key) return;
      element.textContent = t(key, element.textContent.trim());
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.dataset.i18nHtml;
      if (!key) return;
      element.innerHTML = t(key, element.innerHTML.trim());
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (!key) return;
      element.setAttribute("aria-label", t(key, element.getAttribute("aria-label") ?? ""));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const key = element.dataset.i18nAlt;
      if (!key) return;
      element.setAttribute("alt", t(key, element.getAttribute("alt") ?? ""));
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const key = element.dataset.i18nTitle;
      if (!key) return;
      element.setAttribute("title", t(key, element.getAttribute("title") ?? ""));
    });

    const titleKey = document.body?.dataset.i18nPageTitle;
    if (titleKey) {
      document.title = t(titleKey, document.title);
    }

    document.querySelectorAll("meta[data-i18n-content]").forEach((element) => {
      const key = element.dataset.i18nContent;
      if (!key) return;
      element.setAttribute("content", t(key, element.getAttribute("content") ?? ""));
    });
  }

  function renderLanguageSelector() {
    const select = document.getElementById("languageSelector");
    if (!(select instanceof HTMLSelectElement)) return;

    select.innerHTML = "";

    for (const { code, label } of SUPPORTED_LANGUAGES) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = t(`language.option.${code}`, label);
      select.appendChild(option);
    }

    select.value = language;
    select.setAttribute(
      "aria-label",
      t("language.selectorAria", "Select language"),
    );
  }

  async function initializeLanguage(nextLanguage = language) {
    language = isAvailableLanguage(nextLanguage)
      ? nextLanguage
      : FALLBACK_LANGUAGE;

    applyDocumentDirection();

    try {
      if (Object.keys(fallbackTranslations).length === 0) {
        fallbackTranslations = await loadLanguage(FALLBACK_LANGUAGE);
      }

      translations =
        language === FALLBACK_LANGUAGE
          ? fallbackTranslations
          : await loadLanguage(language);
    } catch (error) {
      console.warn(error);
      translations = fallbackTranslations;
    }

    applyDocumentDirection();
    applyStaticTranslations();
    renderLanguageSelector();

    window.dispatchEvent(
      new CustomEvent("happy-animals:language-changed", {
        detail: { language },
      }),
    );
  }

  async function setLanguage(nextLanguage) {
    if (!isAvailableLanguage(nextLanguage)) return;

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Language remains active even without localStorage.
    }

    await initializeLanguage(nextLanguage);
  }

  function toAnimalSlug(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }

  function getAnimalNameTranslationKey(name) {
    return `animal.name.${toAnimalSlug(name)}`;
  }

  window.HappyAnimalsI18n = {
    get language() {
      return language;
    },
    t,
    setLanguage,
    getAnimalNameTranslationKey,
  };

  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("languageSelector");

    if (select instanceof HTMLSelectElement) {
      select.addEventListener("change", (event) => {
        void setLanguage(event.target.value);
      });
    }

    void initializeLanguage();
  });
})();
