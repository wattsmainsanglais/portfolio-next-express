import Image from 'next/image'
import profilePic from '../../../../public/images/AWattsBrand-46-s.jpg'
import { useTranslations } from 'next-intl'

export default function Bio() {
  const t = useTranslations("About")

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-white text-center mb-12">
          {t("heading")}
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              width={200}
              height={200}
              src={profilePic}
              alt='Picture of Andrew Watts (awattsdev)'
              className="rounded-full shadow-xl"
            />
          </div>

          {/* Bio Text */}
          <div className="flex-1">
            <p className="text-xl md:text-2xl text-slate-100 leading-relaxed">
              {t("para")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
