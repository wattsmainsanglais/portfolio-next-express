import { CalendarCheck } from 'lucide-react'
import { CheckIcon } from '@radix-ui/react-icons'
import { getTranslations } from 'next-intl/server'

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
        'x-default': `${baseUrl}/fr/discovery-call`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${baseUrl}/${locale}/discovery-call`,
      siteName: 'awattsdev',
      images: [{ url: '/images/awattsdev.png', width: 3163, height: 792, alt: 'awattsdev' }],
    },
  }
}

export default async function DiscoveryCall({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'DiscoveryCall' })
  const points = ['point1', 'point2', 'point3', 'point4']

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">

      {/* Discovery call */}
      <main className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-400/25 dark:bg-brand-600/20 blur-3xl" />
        <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] text-slate-900 dark:text-white mb-6">
            {t('heading')}
          </h1>
          <p className="text-2xl md:text-3xl font-light text-slate-700 dark:text-slate-200 leading-snug mb-12">
            {t('intro')}
          </p>

          <section className="p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
              {t('coverHeading')}
            </h2>
            <ul className="flex flex-col gap-4">
              {points.map(p => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                    <CheckIcon width={18} height={18} />
                  </span>
                  <span className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 leading-snug">{t(p)}</span>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed mb-10">
            {t('noObligation')}
          </p>

          {/* Solid primary CTA with Shine Text (ui-buttons Design 2) */}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-xl font-semibold text-white shadow-lg shadow-brand-700/30 transition-colors"
          >
            <CalendarCheck size={24} aria-hidden="true" />
            <span className="shine-text">{t('cta')}</span>
          </a>
        </div>
      </main>

    </div>
  )
}
