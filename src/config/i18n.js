import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa tus archivos de traducción
import Euskera from '../locales/Euskera.json';
import English from '../locales/English.json';
import Español from '../locales/Español.json';

const savedLanguage = localStorage.getItem("language") || "Español";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      Euskera: { translation: Euskera },
      English: { translation: English },
      Español: { translation: Español }
    },
    lng: savedLanguage, // idioma por defecto
    fallbackLng: 'Español', // idioma de reserva
    interpolation: {
      escapeValue: false // react ya hace el escape
    }
  });

export default i18n;