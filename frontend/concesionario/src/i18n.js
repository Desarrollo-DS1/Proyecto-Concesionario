import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import langEs from './locales/es/lang.json';
import langEn from './locales/en/lang.json';
import langPt from './locales/pt/lang.json';

i18n.use(initReactI18next).init({
    resources: {
        es: {
            lang: langEs,
        },
        en: {
            lang: langEn,
        },
        pt: {
            lang: langPt,
        }
    },
    lng: 'es', // idioma predeterminado
    fallbackLng: 'es', // idioma de respaldo si la traducción no está disponible
    interpolation: {
        escapeValue: false, // No necesitas escapar valores traducidos
    },
});

export default i18n;
