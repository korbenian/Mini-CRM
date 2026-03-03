import createMiddleware from 'next-intl/middleware';

export default createMiddleware({

  locales: ['en', 'ru', 'de', 'fr', 'nl', 'pl'],
  

  defaultLocale: 'en',

  localePrefix: 'always' 
});

export const config = {
  matcher: ['/', '/(ru|en|de|fr|nl|pl)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};