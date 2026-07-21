import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../public/locales/en/common.json";
import uk from "../../public/locales/uk/common.json";
import es from "../../public/locales/es/common.json";
import fr from "../../public/locales/fr/common.json";
import de from "../../public/locales/de/common.json";
import it from "../../public/locales/it/common.json";

const resources = {
  en: { translation: en },
  uk: { translation: uk },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",           // язык по умолчанию
  fallbackLng: "en",   // если ключ не найден
  interpolation: { escapeValue: false },
});

export default i18n;
