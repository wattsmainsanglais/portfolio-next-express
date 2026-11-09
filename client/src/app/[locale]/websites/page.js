import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { PageHero, SectionHeading, CheckList, Steps, Faq, Towns, CtaBand, ServiceJsonLd } from '../_components/site/blocks'
import ThemeToggle from '../_components/ThemeToggle'
import { href, absUrl, pageMetadata, TOWNS } from '@/lib/routes'
import tcThumb from '@/public/images/tcphoto.png'
import anteluxiaThumb from '@/public/images/anteluxia.png'
import popupThumb from '@/public/images/popweddingThumb1.png'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WebsitesPage' })
  return pageMetadata({ locale, key: 'websites', title: t('metaTitle'), description: t('metaDescription') })
}

export default async function WebsitesPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WebsitesPage' })
  const c = await getTranslations({ locale, namespace: 'Common' })
  const p = await getTranslations({ locale, namespace: 'Portfolio' })

  const examples = [
    { name: 'TC Photography', link: 'https://www.terrycarrollphoto.com', src: tcThumb, desc: p('tc') },
    { name: 'Anteluxia Resonance', link: 'https://anteluxia-resonance.com', src: anteluxiaThumb, desc: p('anteluxia') },
    { name: 'The Pop-up Wedding Crèche', link: 'https://www.thepopupweddingcreche.fr/', src: popupThumb, desc: p('pop') },
  ]

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <ServiceJsonLd
        name={t('eyebrow')}
        description={t('metaDescription')}
        url={absUrl(locale, 'websites')}
        price="650"
        areaServed={TOWNS}
      />

      <PageHero
        eyebrow={t('eyebrow')}
        title={t('h1')}
        intro={t('intro')}
        price={t('price')}
        priceNote={t('priceNote')}
        ctaHref={href(locale, 'discoveryCall')}
        ctaLabel={c('bookCall')}
        secondaryHref={href(locale, 'contact')}
        secondaryLabel={c('writeMe')}
      />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading>{c('includedHeading')}</SectionHeading>
        <CheckList items={t.raw('included')} />
      </section>

      <Steps heading={c('processHeading')} steps={t.raw('steps')} />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading>{c('examplesHeading')}</SectionHeading>
        <ul className="grid gap-8 md:grid-cols-3">
          {examples.map(ex => (
            <li key={ex.name}>
              <a href={ex.link} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:border-brand-400 transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={ex.src} alt={ex.name} fill sizes="(max-width: 768px) 100vw, 33vw" placeholder="blur" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">{ex.name} <span aria-hidden="true">↗</span></h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-snug line-clamp-4">{ex.desc}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href={href(locale, 'work')} className="text-xl text-brand-700 dark:text-brand-300 hover:underline underline-offset-4">{c('seeAllWork')} →</Link>
        </p>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-4">{t('vsHeading')}</h2>
            <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-6">{t('vsText')}</p>
            <Link href={`/${locale}/blog/should-i-get-a-wordpress-website`} className="text-xl text-brand-700 dark:text-brand-300 hover:underline underline-offset-4">
              {t('vsLink')} →
            </Link>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white text-center">{t('darkModeHeading')}</h2>
            <ThemeToggle />
          </div>
        </div>
      </section>

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
