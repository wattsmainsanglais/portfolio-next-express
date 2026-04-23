import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/factures')) {
    const isLoginPage = pathname === '/factures/login';
    const sessionCookie = request.cookies.get('factures_session')?.value;
    const isAuthenticated = sessionCookie === process.env.FACTURES_SESSION_TOKEN;

    if (!isAuthenticated && !isLoginPage) {
      return NextResponse.redirect(new URL('/factures/login', request.url));
    }
    if (isAuthenticated && isLoginPage) {
      return NextResponse.redirect(new URL('/factures', request.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
