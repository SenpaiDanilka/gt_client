import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_ru from "./translations/common/ru.json";
import common_en from "./translations/common/en.json";
import validations_ru from "./translations/validations/ru.json";
import validations_en from "./translations/validations/en.json";

const resources = {
  en: {
    common: common_en,
    validations: validations_en
  },
  ru: {
    common: common_ru,
    validations: validations_ru
  }
};

i18n
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    lng: "en",
    resources
  });

export default i18n;