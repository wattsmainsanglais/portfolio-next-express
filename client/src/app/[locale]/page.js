import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FaLaptopCode, FaTools, FaCode, FaChalkboardTeacher, FaStar } from 'react-icons/fa'
// import FloatingBubbles from './_components/ui/FloatingBubbles' // disabled 9 Nov 2026: too busy
import ScrollBlend from './_components/ui/ScrollBlend'
import Coverflow from './_components/ui/Coverflow'
import BeamBorder from './_components/ui/BeamBorder'
import { SectionHeading, Towns, CtaBand } from './_components/site/blocks'
import { href } from '@/lib/routes'
import profilePic from '@/public/images/AWattsBrand-46-crop.jpg'
import anteluxiaThumb from '@/public/images/anteluxia.png'
import popupThumb from '@/public/images/popweddingThumb1.png'
import silsoupThumb from '@/public/images/silsoup.png'
import einvoicerThumb from '@/public/images/einvoicer.png'
import carpetcoThumb from '@/public/images/carpetcothumb.png'

// Homepage = hub. Each service has its own page (lib/routes.js); this page
// introduces them and links out. The old single-page sections (Services, Bio,
// Projects, TechStack, ThemeToggle) are kept as components and reused on the
// service pages.
const SERVICES = [
  { key: 'websites', Icon: FaLaptopCode },
  { key: 'itSupport', Icon: FaTools },
  { key: 'webApps', Icon: FaCode },
  { key: 'aiWorkshop', Icon: FaChalkboardTeacher },
]

export default async function Page({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Home' })
  const c = await getTranslations({ locale, namespace: 'Common' })
  const p = await getTranslations({ locale, namespace: 'Portfolio' })

  const work = [
    { name: 'Anteluxia Resonance', link: 'https://anteluxia-resonance.com', src: anteluxiaThumb, alt: 'Anteluxia Resonance website', tag: p('anteluxia').split('. ')[0] + '.' },
    { name: 'The Pop-up Wedding Crèche', link: 'https://www.thepopupweddingcreche.fr/', src: popupThumb, alt: 'The Pop-up Wedding Crèche website', tag: t('popTag') },
    { name: 'Silicon Soup', link: 'https://www.siliconsoup.com/', src: silsoupThumb, alt: 'Silicon Soup online shop', tag: p('silsoup').split(' — ')[0] + '.' },
    { name: 'einvoicer', link: 'https://www.einvoicer.fr', src: einvoicerThumb, alt: 'einvoicer e-invoicing app', tag: p('einvoicer').split('. ')[0] + '.' },
    { name: 'CarpetCo Dukinfield', link: 'https://www.carpetcodukinfield.co.uk/', src: carpetcoThumb, alt: 'CarpetCo Dukinfield website', tag: p('carpetco').split('. ')[0] + '.' },
  ]

  return (
    <main className="bg-gradient-to-b from-slate-50 via-brand-50/40 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* <FloatingBubbles /> disabled 9 Nov 2026: too busy */}
        <div aria-hidden="true" className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full bg-brand-400/25 dark:bg-brand-700/25 blur-3xl" />
        <div className="relative container mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-5xl mx-auto text-center">
            <p className="inline-block mb-6 px-4 py-1.5 rounded-full text-lg tracking-wide bg-white/70 dark:bg-white/10 text-brand-800 dark:text-brand-200 border border-brand-300/60 dark:border-white/10">
              {t('eyebrow')}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.02] text-slate-900 dark:text-white mb-8">
              {t('h1')}
            </h1>
            <p className="text-2xl md:text-3xl font-light text-slate-700 dark:text-slate-200 max-w-3xl mx-auto leading-snug">
              {t('sub')}
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <Link
                href={href(locale, 'discoveryCall')}
                className="btn-beam inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900 dark:bg-white/5 hover:bg-slate-800 dark:hover:bg-white/10 text-white text-xl md:text-2xl font-semibold border border-white/10 shadow-xl shadow-brand-900/30 transition-colors"
              >
                {c('bookCall')}
                <BeamBorder />
              </Link>
              <a href="#services" className="text-xl md:text-2xl text-brand-700 dark:text-brand-300 hover:underline underline-offset-4">
                {t('ctaSecondary')} ↓
              </a>
            </div>

            <ul className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg md:text-xl text-slate-600 dark:text-slate-300">
              <li className="inline-flex items-center gap-2">
                <span className="inline-flex text-yellow-500" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map(i => <FaStar key={i} size={16} />)}
                </span>
                {t('trust1')}
              </li>
              <li>{t('trust2')}</li>
              <li>{t('trust3')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services hub */}
      <section id="services" className="container mx-auto px-4 py-20 scroll-mt-24">
        <SectionHeading sub={t('servicesSub')} center>{t('servicesHeading')}</SectionHeading>
        <ul className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {SERVICES.map(({ key, Icon }) => (
            <li key={key}>
              <Link
                href={href(locale, key)}
                className="group relative flex h-full flex-col rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 md:p-10 transition-all hover:-translate-y-1 hover:border-brand-400 hover:shadow-2xl hover:shadow-brand-500/10"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/30">
                    <Icon size={28} aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-slate-100 dark:bg-white/10 px-4 py-1.5 text-lg font-semibold text-slate-900 dark:text-white">
                    {t(`${key}.price`)}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-3">{t(`${key}.title`)}</h3>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-snug flex-1">{t(`${key}.desc`)}</p>
                <span className="mt-6 text-xl text-brand-700 dark:text-brand-300 group-hover:translate-x-1 transition-transform">
                  {c('learnMore')} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Work: coverflow */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading sub={t('workSub')} center>{t('workHeading')}</SectionHeading>
        </div>
        <Coverflow items={work} rotateLabel={c('rotate')} />
        <p className="text-center mt-4">
          <Link href={href(locale, 'work')} className="text-xl text-brand-700 dark:text-brand-300 hover:underline underline-offset-4">
            {c('seeAllWork')} →
          </Link>
        </p>
      </section>

      {/* Why: scroll blend band */}
      <ScrollBlend className="my-12">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <h2 className="text-4xl md:text-6xl font-light text-white mb-14 max-w-3xl">{t('whyHeading')}</h2>
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {t.raw('why').map((w, i) => (
              <li key={w.title}>
                <span className="block text-5xl font-light text-brand-200 mb-3" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">{w.title}</h3>
                <p className="text-xl text-white/85 leading-snug">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </ScrollBlend>

      {/* About teaser */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-center">
          <Image
            src={profilePic}
            alt="Andrew Watts, awattsdev"
            sizes="280px"
            placeholder="blur"
            className="w-56 md:w-full mx-auto aspect-square object-cover object-top rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
          />
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-6">{t('aboutHeading')}</h2>
            <p className="text-2xl text-slate-700 dark:text-slate-200 leading-snug mb-6">{t('aboutText')}</p>
            <Link href={href(locale, 'about')} className="text-xl text-brand-700 dark:text-brand-300 hover:underline underline-offset-4">
              {t('aboutLink')} →
            </Link>
          </div>
        </div>
      </section>

      <Towns heading={c('areaHeading')} sub={t('areaSub')} />

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
