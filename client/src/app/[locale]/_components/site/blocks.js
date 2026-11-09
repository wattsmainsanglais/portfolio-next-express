// Presentational building blocks shared by the service pages.
// Pages fetch their own copy and pass plain strings in.
import Link from 'next/link'
import { CheckIcon } from '@radix-ui/react-icons'
import { FaMapMarkerAlt } from 'react-icons/fa'
import BeamBorder from '../ui/BeamBorder'
import { TOWNS } from '@/lib/routes'

export function Eyebrow({ children }) {
  return (
    <p className="inline-block mb-5 px-4 py-1.5 rounded-full text-base md:text-lg tracking-wide bg-brand-200/50 dark:bg-white/10 text-brand-800 dark:text-brand-200 border border-brand-300/60 dark:border-white/10">
      {children}
    </p>
  )
}

// Solid primary button with the Shine Text sweep (ui-buttons Design 2)
export function ShineButton({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-xl font-semibold shadow-lg shadow-brand-700/30 transition-colors"
    >
      <span className="shine-text">{children}</span>
    </Link>
  )
}

// Dark button with the moving beam border (ui-buttons Design 1)
export function BeamButton({ href, children }) {
  return (
    <Link
      href={href}
      className="btn-beam inline-flex items-center justify-center px-7 py-4 rounded-xl bg-slate-900 dark:bg-white/5 hover:bg-slate-800 dark:hover:bg-white/10 text-white text-xl font-semibold border border-white/10 shadow-lg shadow-brand-900/30 transition-colors"
    >
      {children}
      <BeamBorder />
    </Link>
  )
}

export function PageHero({ eyebrow, title, intro, price, priceNote, ctaHref, ctaLabel, secondaryHref, secondaryLabel }) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-400/25 dark:bg-brand-600/20 blur-3xl" />
      <div className="relative container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-slate-900 dark:text-white mb-6">
            {title}
          </h1>
          <p className="text-2xl md:text-3xl font-light text-slate-700 dark:text-slate-200 max-w-3xl leading-snug">
            {intro}
          </p>
        </div>

        <div className="mt-10 flex flex-col lg:flex-row lg:items-end gap-8">
          {price && (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-6 max-w-xl">
              <p className="text-4xl font-semibold text-slate-900 dark:text-white">{price}</p>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-300 leading-snug">{priceNote}</p>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <ShineButton href={ctaHref}>{ctaLabel}</ShineButton>
            {secondaryHref && (
              <Link href={secondaryHref} className="text-xl text-brand-700 dark:text-brand-300 hover:underline underline-offset-4">
                {secondaryLabel} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({ children, sub, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      <h2 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white">{children}</h2>
      {sub && <p className="mt-4 text-xl md:text-2xl text-slate-600 dark:text-slate-300">{sub}</p>}
    </div>
  )
}

export function CheckList({ items, columns = 2 }) {
  return (
    <ul className={`grid gap-4 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
      {items.map(item => (
        <li key={item} className="flex items-start gap-3 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
            <CheckIcon width={18} height={18} />
          </span>
          <span className="text-xl text-slate-800 dark:text-slate-100">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Steps({ heading, steps }) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <SectionHeading>{heading}</SectionHeading>
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <span className="block text-6xl font-light text-brand-600 dark:text-brand-400 leading-none mb-4" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">{s.title}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-snug">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Faq({ heading, items }) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <SectionHeading>{heading}</SectionHeading>
      <div className="max-w-3xl flex flex-col gap-4">
        {items.map(({ q, a }) => (
          <details key={q} className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 open:border-brand-400">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl md:text-2xl font-medium text-slate-900 dark:text-white">
              <h3>{q}</h3>
              <span className="text-brand-600 dark:text-brand-300 text-3xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function Towns({ heading, sub }) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <SectionHeading sub={sub}>{heading}</SectionHeading>
      <ul className="flex flex-wrap gap-3">
        {TOWNS.map(town => (
          <li key={town} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-lg text-slate-800 dark:text-slate-100">
            <FaMapMarkerAlt className="text-brand-600 dark:text-brand-300" size={14} aria-hidden="true" />
            {town}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function CtaBand({ heading, text, ctaHref, ctaLabel, secondaryHref, secondaryLabel }) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-14 md:px-16 md:py-20 text-center">
        <div aria-hidden="true" className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-brand-500/30 blur-3xl" />
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-light text-white mb-5">{heading}</h2>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-10">{text}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <BeamButton href={ctaHref}>{ctaLabel}</BeamButton>
            {secondaryHref && (
              <Link href={secondaryHref} className="text-xl text-brand-200 hover:text-white underline-offset-4 hover:underline">
                {secondaryLabel} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Light per-page Service schema (the site-wide ProfessionalService lives in layout.js)
export function ServiceJsonLd({ name, description, url, price, areaServed }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@type': 'ProfessionalService', name: 'awattsdev', url: 'https://www.awattsdev.eu', telephone: '+33782950483' },
    areaServed: areaServed.map(n => ({ '@type': 'Place', name: n })),
    ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'EUR' } } : {}),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
