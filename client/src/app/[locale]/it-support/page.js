import { getTranslations } from 'next-intl/server'
import { FaTachometerAlt, FaEnvelope, FaSyncAlt, FaPrint, FaLaptop, FaHdd, FaShieldAlt, FaMobileAlt } from 'react-icons/fa'
import { PageHero, SectionHeading, Steps, Faq, Towns, CtaBand, ServiceJsonLd } from '../_components/site/blocks'
import { href, absUrl, pageMetadata, TOWNS } from '@/lib/routes'

// One icon per problem, same order as ITSupportPage.problems in messages
const PROBLEM_ICONS = [FaTachometerAlt, FaEnvelope, FaSyncAlt, FaPrint, FaLaptop, FaHdd, FaShieldAlt, FaMobileAlt]

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ITSupportPage' })
  return pageMetadata({ locale, key: 'itSupport', title: t('metaTitle'), description: t('metaDescription') })
}

export default async function ITSupportPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ITSupportPage' })
  const c = await getTranslations({ locale, namespace: 'Common' })

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <ServiceJsonLd
        name={t('eyebrow')}
        description={t('metaDescription')}
        url={absUrl(locale, 'itSupport')}
        areaServed={TOWNS}
      />

      <PageHero
        eyebrow={t('eyebrow')}
        title={t('h1')}
        intro={t('intro')}
        price={t('price')}
        priceNote={t('priceNote')}
        ctaHref={href(locale, 'contact')}
        ctaLabel={c('contactMe')}
        secondaryHref="tel:+33782950483"
        secondaryLabel="07 82 95 04 83"
      />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading>{t('problemsHeading')}</SectionHeading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.raw('problems').map((problem, i) => {
            const Icon = PROBLEM_ICONS[i]
            return (
              <li key={problem} className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-brand-400">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-200/50 dark:bg-brand-700/30 text-brand-700 dark:text-brand-200 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="block text-xl text-slate-800 dark:text-slate-100 leading-snug">{problem}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-4">{t('whoHeading')}</h2>
            <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed">{t('whoText')}</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 md:p-10 text-white">
            <h2 className="text-3xl md:text-4xl font-light mb-4">{t('englishHeading')}</h2>
            <p className="text-xl text-white/90 leading-relaxed">{t('englishText')}</p>
          </div>
        </div>
      </section>

      <Steps heading={c('processHeading')} steps={t.raw('steps')} />
      <Towns heading={c('areaHeading')} />
      <Faq heading={c('faqHeading')} items={t.raw('faq')} />

      <CtaBand
        heading={c('ctaHeading')}
        text={c('ctaText')}
        ctaHref={href(locale, 'discoveryCall')}
        ctaLabel={c('bookCall')}
        secondaryHref={href(locale, 'contact')}
        secondaryLabel={c('writeMe')}
      />
    </main>
  )
}
