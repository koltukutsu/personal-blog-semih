'use client';

import { usePathname, useRouter } from 'next/navigation';
import { languages } from '../layout';
import { useCallback } from 'react';

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const router = useRouter();

  const switchLanguage = useCallback((locale: string) => {
    // Get the current path without the locale prefix
    const segments = pathName.split('/');
    const isCurrentPathWithLocale = languages.some(lang => segments[1] === lang);
    
    // If the current path starts with a locale, replace it
    if (isCurrentPathWithLocale) {
      segments[1] = locale;
    } else {
      // Otherwise, prepend the locale
      segments.splice(1, 0, locale);
    }
    
    router.push(segments.join('/'));
  }, [pathName, router]);

  return (
    <div className="flex space-x-2">
      {languages.map((locale) => {
        // Check if this is the current language
        const segments = pathName.split('/');
        const isCurrentLang = segments[1] === locale;
        
        return (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`px-2 py-1 text-sm rounded ${
              isCurrentLang
                ? 'bg-gray-200 dark:bg-gray-700 font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            aria-current={isCurrentLang}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
} 