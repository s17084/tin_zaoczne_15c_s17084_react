import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translationEnglish from './locales/en';
import translationPolish from './locales/pl';

const resources = {
  en: {
    translation: translationEnglish
  },
  pl: {
    translation: translationPolish
  }
};

i18n
.use(initReactI18next) // passes i18n down to react-i18next
.init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export const language = () => {
  return i18n.language;
}


export const handleLanguageChange = (language) => {
  i18n.changeLanguage(language, (err, t) => {
    if (err) {
      return err;
    }
  });
}