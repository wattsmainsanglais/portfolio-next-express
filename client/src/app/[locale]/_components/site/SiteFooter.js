import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FaFacebookSquare, FaInstagram, FaLinkedinIn, FaGithub, FaGoogle, FaMedium } from 'react-icons/fa'
import { href } from '@/lib/routes'
import FooterLogo from '../FooterLogo'

const SOCIALS = [
  { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61553113778974', Icon: FaFacebookSquare },
  { label: 'Instagram', url: 'https://www.instagram.com/awattsdev/', Icon: FaInstagram },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/andrew-watts-9a7145269/', Icon: FaLinkedinIn },
  { label: 'GitHub', url: 'https://github.com/wattsmainsanglais', Icon: FaGithub },
  { label: 'Medium', url: 'https://medium.com/@awattsdev', Icon: FaMedium },
  { label: 'Google Business Profile', url: 'https://share.google/PQF5jxwFMfsScMlvu', Icon: FaGoogle },
]

// Name / area / phone kept identical to the Google Business Profile (no street
// address: the profile is a service-area business with the address hidden).
export default function SiteFooter({ locale }) {
  const t = useTranslations('Footer')
  const n = useTranslations('Nav')

  const linkClass = 'text-slate-600 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-300 transition-colors'

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10">
      <div className="container mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-lg">
        <div className="flex flex-col gap-4">
          <div className="w-48"><FooterLogo /></div>
          <p className="text-slate-600 dark:text-slate-300">{t('tagline')}</p>
          <ul className="flex flex-wrap gap-4">
            {SOCIALS.map(({ label, url, Icon }) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className={linkClass}>
                  <Icon size={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t('servicesHeading')}>
          <h2 className="text-xl font-semibold mb-4">{t('servicesHeading')}</h2>
          <ul className="flex flex-col gap-2">
            {['websites', 'itSupport', 'webApps', 'aiWorkshop'].map(key => (
              <li key={key}><Link href={href(locale, key)} className={linkClass}>{n(`${key}Long`)}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('moreHeading')}>
          <h2 className="text-xl font-semibold mb-4">{t('moreHeading')}</h2>
          <ul className="flex flex-col gap-2">
            {['work', 'about', 'blog', 'discoveryCall', 'contact'].map(key => (
              <li key={key}><Link href={href(locale, key)} className={linkClass}>{n(key)}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xl font-semibold mb-4">{t('contactHeading')}</h2>
          <address className="not-italic flex flex-col gap-2 text-slate-600 dark:text-slate-300">
            <span className="text-slate-900 dark:text-white">awattsdev, Andrew Watts</span>
            <span>Civray (86400), Vienne</span>
            <a href="tel:+33782950483" className={linkClass}>07 82 95 04 83</a>
            <a href="mailto:awattsdev@gmail.com" className={linkClass}>awattsdev@gmail.com</a>
            <span className="text-base">SIRET 819 960 766 00031</span>
          </address>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-white/10">
        <p className="container mx-auto px-4 py-6 text-base text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} awattsdev. {t('rights')}
        </p>
      </div>
    </footer>
  )
}
