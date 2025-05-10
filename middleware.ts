import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { languages, defaultLanguage } from './app/layout';

export function middleware(request: NextRequest) {
  // Get the pathname from the request
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already includes a language prefix
  const pathnameHasLanguage = languages.some(
    (language) => 
      pathname.startsWith(`/${language}/`) || pathname === `/${language}`
  );

  if (pathnameHasLanguage) return;

  // Get the preferred language from the Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  const preferred = acceptLanguage
    .split(',')
    .map(item => {
      const [lang, priority = '1'] = item.trim().split(';q=');
      return { lang: lang.split('-')[0], priority: parseFloat(priority) || 1.0 };
    })
    .sort((a, b) => b.priority - a.priority)
    .find(item => languages.includes(item.lang))?.lang || defaultLanguage;

  // Create a new URL with the detected language
  const newUrl = new URL(`/${preferred}${pathname}`, request.url);
  
  // Keep the search parameters
  newUrl.search = request.nextUrl.search;
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Skip matching for static assets, api routes, and favicon
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}; 