import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { PageHero, SectionHeading, CheckList, CtaBand } from '../_components/site/blocks'
import TechStack from '../_components/techStack'
import { href, pageMetadata } from '@/lib/routes'
import silsoup from '@/public/images/silsoup.png'
import gardapisThumb from '@/public/images/gardapis.png'
import einvoicerThumb from '@/public/images/einvoicer.png'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WebAppsPage' })
  return pageMetadata({ locale, key: 'webApps', title: t('metaTitle'), description: t('metaDescription') })
}

export default async function WebAppsPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WebAppsPage' })
  const c = await getTranslations({ locale, namespace: 'Common' })
  const s = await getTranslations({ locale, namespace: 'Services' })
  const p = await getTranslations({ locale, namespace: 'Portfolio' })

  const examples = [
    { name: 'Silicon Soup', link: 'https://www.siliconsoup.com/', src: silsoup, desc: p('silsoup') },
    { name: "Gard'Apis", link: 'https://www.gardapis.eu', src: gardapisThumb, desc: p('gardapis') },
    { name: 'einvoicer', link: 'https://www.einvoicer.fr', src: einvoicerThumb, desc: p('einvoicer') },
  ]

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('h1')}
        intro={t('intro')}
        price={t('price')}
        priceNote={t('priceNote')}
        ctaHref={href(locale, 'discoveryCall')}
        ctaLabel={c('bookCall')}
      />

      <section className="container mx-auto px-4 py-16 md:py-20 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading>{t('appsHeading')}</SectionHeading>
          <CheckList columns={1} items={['b1', 'b2', 'b3', 'b4'].map(b => s(`apps.${b}`))} />
        </div>
        <div>
          <SectionHeading>{t('aiHeading')}</SectionHeading>
          <CheckList columns={1} items={['b1', 'b2', 'b3'].map(b => s(`ai.${b}`))} />
          <p className="mt-6 text-xl text-brand-700 dark:text-brand-300">{s('ai.note')}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading>{c('examplesHeading')}</SectionHeading>
        <ul className="flex flex-col gap-8">
          {examples.map((ex, i) => (
            <li key={ex.name}>
              <a href={ex.link} target="_blank" rel="noopener noreferrer" className={`group grid md:grid-cols-2 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:border-brand-400 transition-colors`}>
                <div className={`relative aspect-[16/10] overflow-hidden ${i % 2 ? 'md:order-2' : ''}`}>
                  <Image src={ex.src} alt={ex.name} fill sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-4">{ex.name} <span aria-hidden="true">↗</span></h3>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">{ex.desc}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <TechStack heading={t('stackHeading')} />

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
