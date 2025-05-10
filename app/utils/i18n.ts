import { languages, defaultLanguage } from '../layout';

export type Locale = typeof languages[number];

export function getDictionary(locale: Locale) {
  return import(`../dictionaries/${locale}.json`).then((module) => module.default);
}

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export function validateLocale(locale?: string): Locale {
  if (!locale || !languages.includes(locale as Locale)) {
    return defaultLanguage;
  }
  return locale as Locale;
} 