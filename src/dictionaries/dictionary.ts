import "server-only";

// Map all three locales to their respective JSON files
const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  ar: () => import("./ar.json").then((module) => module.default),
  fr: () => import("./fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "ar" | "fr") => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
