import { useTranslations } from 'next-intl'

export default function Intro() {
  const t = useTranslations("Intro")

  return (
    <section className="container mx-auto px-4 py-20 lg:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
          {t("heading1")}
        </h1>
        <p className="text-2xl md:text-3xl font-light text-purple-200">
          {t("heading2")}
        </p>

        {/* CTA Button */}
        <div className="mt-12">
          <a
            href="#contact"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-purple-500/50"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  )
}
