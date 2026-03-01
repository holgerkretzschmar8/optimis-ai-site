import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  de: {
    translation: deTranslations,
  },
};

// Custom detector for domain-based language
const domainDetector = {
  name: 'domainDetector',
  lookup() {
    const hostname = window.location.hostname;
    if (hostname.endsWith('.de') || hostname.includes('optimis-ai.de')) {
      return 'de';
    }
    if (hostname.endsWith('.com') || hostname.includes('optimis-ai.com')) {
      return 'en';
    }
    return undefined;
  },
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(domainDetector);

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'domainDetector', 'cookie', 'localStorage', 'navigator', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
