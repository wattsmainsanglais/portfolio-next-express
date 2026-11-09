import { getTranslations } from 'next-intl/server'
import { PageHero, SectionHeading, CheckList, CtaBand } from '../_components/site/blocks'
import { href, pageMetadata } from '@/lib/routes'

// Workshop booking page on cal.com (business/products/CLAUDE_PROJECTS_WORKSHOP.md)
const WORKSHOP_CAL_URL = 'https://cal.com/andrew-watts-41g3s4/ai-assistant-workshop'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WorkshopPage' })
  return pageMetadata({ locale, key: 'aiWorkshop', title: t('metaTitle'), description: t('metaDescription') })
}

export default async function WorkshopPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'WorkshopPage' })
  const c = await getTranslations({ locale, namespace: 'Common' })

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('h1')}
        intro={t('intro')}
        price={t('price')}
        priceNote={t('priceNote')}
        ctaHref={WORKSHOP_CAL_URL}
        ctaLabel={t('bookCta')}
        secondaryHref={href(locale, 'contact')}
        secondaryLabel={c('writeMe')}
      />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading>{t('learnHeading')}</SectionHeading>
        <CheckList items={t.raw('learn')} />
      </section>

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
