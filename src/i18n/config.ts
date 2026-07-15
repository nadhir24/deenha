import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import idTranslations from './locales/id.json';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import zhTranslations from './locales/zh.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            id: { translation: idTranslations },
            en: { translation: enTranslations },
            fr: { translation: frTranslations },
            zh: { translation: zhTranslations }
        },
        fallbackLng: 'id', // Default to Indonesian
        lng: 'id', // Force Indonesian as initial language — prevents auto-dollar/auto-translate
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage', 'cookie']
        }
    });

export default i18n;
