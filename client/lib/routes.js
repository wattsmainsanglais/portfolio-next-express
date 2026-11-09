// Site map: one entry per page. The key is the internal route (the folder
// under app/[locale]), the values are the public URL per language.
// Used by the middleware (localized slugs), the nav, the language switcher,
// page metadata and the sitemap, so a slug only ever changes here.
export const BASE_URL = 'https://www.awattsdev.eu'

export const ROUTES = {
  home:          { path: '/',               en: '',                fr: '' },
  websites:      { path: '/websites',       en: '/websites',       fr: '/creation-site-internet' },
  itSupport:     { path: '/it-support',     en: '/it-support',     fr: '/depannage-informatique' },
  webApps:       { path: '/web-apps',       en: '/web-apps',       fr: '/applications-web' },
  aiWorkshop:    { path: '/ai-workshop',    en: '/ai-workshop',    fr: '/atelier-ia' },
  work:          { path: '/work',           en: '/portfolio',      fr: '/realisations' },
  about:         { path: '/about',          en: '/about',          fr: '/a-propos' },
  contact:       { path: '/contact',        en: '/contact',        fr: '/contact' },
  blog:          { path: '/blog',           en: '/blog',           fr: '/blog' },
  discoveryCall: { path: '/discovery-call', en: '/discovery-call', fr: '/discovery-call' },
}

// next-intl middleware `pathnames` config, built from ROUTES
export const PATHNAMES = {
  ...Object.fromEntries(
    Object.values(ROUTES).map(r => [r.path, { en: r.en || '/', fr: r.fr || '/' }])
  ),
  '/blog/[slug]': '/blog/[slug]',
}

export const href = (locale, key) => `/${locale}${ROUTES[key][locale]}`
export const absUrl = (locale, key) => `${BASE_URL}${href(locale, key)}`

// Same path in the other language. Unknown paths (blog posts) keep their slug.
export function switchLocalePath(pathname, toLocale) {
  const [, from, ...rest] = pathname.split('/')
  const tail = rest.length ? `/${rest.join('/')}` : ''
  const route = Object.values(ROUTES).find(r => r[from] === tail)
  return `/${toLocale}${route ? route[toLocale] : tail}`
}

// Page metadata with canonical, hreflang (x-default = French) and Open Graph.
// openGraph replaces the layout's one entirely, so siteName/images go here too.
export function pageMetadata({ locale, key, title, description }) {
  const url = absUrl(locale, key)
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absUrl('en', key),
        fr: absUrl('fr', key),
        'x-default': absUrl('fr', key),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'awattsdev',
      locale: locale === 'en' ? 'en_GB' : 'fr_FR',
      type: 'website',
      images: [{ url: '/images/awattsdev.png', width: 3163, height: 792, alt: 'awattsdev' }],
    },
  }
}

// Towns served on site (dépannage à domicile) and for remote/web work
export const TOWNS = [
  'Civray', 'Charroux', 'Savigné', 'Saint-Pierre-d\'Exideuil', 'Couhé', 'Gençay',
  'Sommières-du-Clain', 'Sauzé-Vaussais', 'Ruffec', 'Champagne-Mouton', 'Chef-Boutonne', 'Poitiers', 'Angoulême',
]
