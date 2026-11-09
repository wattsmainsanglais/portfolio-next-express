import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { CheckIcon } from '@radix-ui/react-icons'
import { CtaBand } from '../_components/site/blocks'
import { href, pageMetadata } from '@/lib/routes'
import profilePic from '@/public/images/AWattsBrand-46-crop.jpg'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AboutPage' })
  return pageMetadata({ locale, key: 'about', title: t('metaTitle'), description: t('metaDescription') })
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AboutPage' })
  const c = await getTranslations({ locale, namespace: 'Common' })

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[380px_1fr] items-start">
          <Image
            src={profilePic}
            alt="Andrew Watts"
            sizes="(max-width: 1024px) 80vw, 380px"
            placeholder="blur"
            priority
            className="w-full max-w-sm mx-auto aspect-[4/5] object-cover object-top rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
          />
          <div>
            <h1 className="text-5xl md:text-7xl font-light text-slate-900 dark:text-white mb-8">{t('h1')}</h1>
            <div className="flex flex-col gap-6 text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed">
              <p>{t('para1')}</p>
              <p>{t('para2')}</p>
              <p>{t('para3')}</p>
            </div>
            <div className="mt-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">{t('factsHeading')}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {t.raw('facts').map(f => (
                  <li key={f} className="flex items-start gap-3 text-lg text-slate-700 dark:text-slate-200">
                    <CheckIcon className="text-brand-600 dark:text-brand-300 mt-1 shrink-0" width={20} height={20} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
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
