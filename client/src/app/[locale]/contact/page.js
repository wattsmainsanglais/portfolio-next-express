import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { Eyebrow } from '../_components/site/blocks'
import ContactForm from '../_components/contact_form'
import { href, pageMetadata } from '@/lib/routes'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContactPage' })
  return pageMetadata({ locale, key: 'contact', title: t('metaTitle'), description: t('metaDescription') })
}

export default async function ContactPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ContactPage' })
  const c = await getTranslations({ locale, namespace: 'Common' })

  const details = [
    { Icon: FaPhoneAlt, label: t('phoneLabel'), value: '07 82 95 04 83', link: 'tel:+33782950483' },
    { Icon: FaEnvelope, label: t('emailLabel'), value: 'awattsdev@gmail.com', link: 'mailto:awattsdev@gmail.com' },
    { Icon: FaMapMarkerAlt, label: t('areaLabel'), value: t('area') },
  ]

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>awattsdev, Andrew Watts</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-light text-slate-900 dark:text-white mb-6">{t('h1')}</h1>
            <p className="text-2xl font-light text-slate-700 dark:text-slate-200 leading-snug mb-10">{t('intro')}</p>

            <ul className="flex flex-col gap-4 mb-10">
              {details.map(({ Icon, label, value, link }) => (
                <li key={label} className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-base text-slate-500 dark:text-slate-400">{label}</span>
                    {link
                      ? <a href={link} className="text-xl text-slate-900 dark:text-white hover:text-brand-700 dark:hover:text-brand-300">{value}</a>
                      : <span className="text-xl text-slate-900 dark:text-white">{value}</span>}
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white">
              <h2 className="text-3xl font-light mb-3">{t('callHeading')}</h2>
              <p className="text-xl text-white/90 mb-6">{t('callText')}</p>
              <Link href={href(locale, 'discoveryCall')} className="inline-flex px-6 py-3 rounded-xl bg-white text-brand-800 text-xl font-semibold hover:bg-brand-200 transition-colors">
                {c('bookCall')}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
