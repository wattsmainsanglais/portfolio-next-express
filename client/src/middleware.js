import createMiddleware from 'next-intl/middleware';
import { PATHNAMES } from '@/lib/routes';

export default createMiddleware({
  //Add locales you want in the app
  locales: ['en', 'fr'],

  // French-first (Nov 2026). "/" itself is a permanent redirect in next.config.mjs
  defaultLocale: 'fr',

  // Localized slugs, e.g. /fr/creation-site-internet -> app/[locale]/websites
  pathnames: PATHNAMES
});

export const config = {
  // Match only internationalized pathnames, exclude API routes
  matcher: ['/', '/(fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
