import Link from 'next/link'
import Image from 'next/image'
import awattsdevImg from '../../../../public/images/nologo.svg'
import { CalendarCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import LanguageSwitcher from '../_components/language/LanguageSwitcher'

// Free 30 min event type on cal.com
const CAL_URL = 'https://cal.com/andrew-watts-41g3s4/appel-decouverte'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'DiscoveryCall' })
  const baseUrl = 'https://www.awattsdev.eu'

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    // Override the layout's homepage canonical
    alternates: {
      canonical: `${baseUrl}/${locale}/discovery-call`,
      languages: {
        'en': `${baseUrl}/en/discovery-call`,
        'fr': `${baseUrl}/fr/discovery-call`,
        'x-default': `${baseUrl}/en/discovery-call`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${baseUrl}/${locale}/discovery-call`,
    },
  }
}

export default async function DiscoveryCall({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'DiscoveryCall' })
  const points = ['point1', 'point2', 'point3', 'point4']

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`}>
            <Image
              alt="Awattsdev Logo"
              src={awattsdevImg}
              className="w-48 h-auto"
              sizes="200px"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="text-sm text-slate-600 hover:text-brand-600 transition-colors"
            >
              {t('backToSite')}
            </Link>
            <LanguageSwitcher locale={locale} textClassName="text-slate-700" />
          </div>
        </div>
      </header>

      {/* Discovery call */}
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          {t('heading')}
        </h1>
        <p className="text-slate-600 mb-10 text-lg">
          {t('intro')}
        </p>

        <section className="p-6 rounded-xl border border-slate-200 bg-white/60 mb-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {t('coverHeading')}
          </h2>
          <ul className="flex flex-col gap-3 text-slate-700 leading-relaxed list-disc pl-5">
            {points.map(p => (
              <li key={p}>{t(p)}</li>
            ))}
          </ul>
        </section>

        <p className="text-slate-600 mb-8 leading-relaxed">
          {t('noObligation')}
        </p>

        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
        >
          <CalendarCheck size={20} />
          {t('cta')}
        </a>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-12 border-t border-slate-200 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} awattsdev — Andrew Watts, Nouvelle-Aquitaine, France</p>
      </footer>
    </div>
  )
}
