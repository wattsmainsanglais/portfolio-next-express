import { getTranslations } from 'next-intl/server'
import { Eyebrow, CtaBand } from '../_components/site/blocks'
import Projects from '../_components/projects'
import { href, pageMetadata } from '@/lib/routes'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WorkPage' })
  return pageMetadata({ locale, key: 'work', title: t('metaTitle'), description: t('metaDescription') })
}

export default async function WorkPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WorkPage' })
  const c = await getTranslations({ locale, namespace: 'Common' })

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <section className="container mx-auto px-4 pt-16 md:pt-24">
        <div className="max-w-4xl">
          <Eyebrow>awattsdev</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-light text-slate-900 dark:text-white mb-6">{t('h1')}</h1>
          <p className="text-2xl md:text-3xl font-light text-slate-700 dark:text-slate-200 leading-snug">{t('intro')}</p>
        </div>
      </section>

      <Projects showHeading={false} />

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
