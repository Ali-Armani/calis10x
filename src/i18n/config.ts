// To add a language: add an entry here and a matching dictionary file in ./locales.
export const LOCALES = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "fa", label: "فارسی", short: "FA", dir: "rtl" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];
export const DEFAULT_LOCALE: Locale = "en";
export const isLocale = (v: unknown): v is Locale => LOCALES.some((l) => l.code === v);
export const localeDir = (code: Locale) => LOCALES.find((l) => l.code === code)!.dir;
