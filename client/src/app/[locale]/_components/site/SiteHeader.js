'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { HiSun, HiMoon, HiMenu, HiX } from 'react-icons/hi'
import { href } from '@/lib/routes'
import { useTheme } from '../ThemeProvider'
import LanguageSwitcher from '../language/LanguageSwitcher'
import purpleLogo from '../../../../../public/images/nologo.svg'
import whiteLogo from '../../../../../public/images/White-logo-no background.svg'

const NAV = ['websites', 'itSupport', 'webApps', 'work', 'blog', 'contact']

// Shared header on every page: own background (sticky, blurred) so it reads on
// the light blog pages and the dark homepage alike.
export default function SiteHeader({ locale }) {
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const isDark = theme === 'dark'

  const isActive = key => {
    const h = href(locale, key)
    return pathname === h || pathname.startsWith(`${h}/`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <Link href={href(locale, 'home')} className="w-36 md:w-40 shrink-0" aria-label="awattsdev">
          <Image
            alt="awattsdev"
            src={isDark ? whiteLogo : purpleLogo}
            className="w-full h-auto"
            sizes="160px"
            priority
          />
        </Link>

        <nav aria-label={t('label')} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map(key => (
              <li key={key}>
                <Link
                  href={href(locale, key)}
                  aria-current={isActive(key) ? 'page' : undefined}
                  className={`px-3 py-2 rounded-lg text-lg transition-colors ${isActive(key)
                    ? 'text-brand-700 dark:text-brand-300 bg-brand-200/40 dark:bg-white/5'
                    : 'text-slate-700 dark:text-slate-200 hover:text-brand-700 dark:hover:text-brand-300'}`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t('toLight') : t('toDark')}
            title={isDark ? t('toLight') : t('toDark')}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? <HiSun size={22} className="text-yellow-400" /> : <HiMoon size={22} className="text-brand-600" />}
          </button>
          <LanguageSwitcher locale={locale} textClassName="text-slate-700 dark:text-white" />
          <Link
            href={href(locale, 'discoveryCall')}
            className="hidden md:inline-flex ml-6 items-center px-4 py-2 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-lg font-medium transition-colors"
          >
            {t('cta')}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            className="lg:hidden p-2 rounded-lg text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10"
          >
            {open ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t('label')} className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900">
          <ul className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {[...NAV, 'aiWorkshop', 'about'].map(key => (
              <li key={key}>
                <Link
                  href={href(locale, key)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(key) ? 'page' : undefined}
                  className="block px-3 py-3 rounded-lg text-xl text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={href(locale, 'discoveryCall')}
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-3 rounded-lg bg-brand-700 text-white text-xl font-medium"
              >
                {t('cta')}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
