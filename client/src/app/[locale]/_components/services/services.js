'use client'

import { CheckIcon } from "@radix-ui/react-icons"
import { FaCode, FaLaptop, FaChalkboardTeacher } from "react-icons/fa"
import { MdOutlineSupportAgent } from "react-icons/md"
import { RiRobot2Line } from "react-icons/ri"
import { useTranslations } from "next-intl"

export default function Services() {
  const t = useTranslations("Services")

  const mainServices = [
    { key: "apps", icon: FaCode, bullets: ["b1", "b2", "b3", "b4"], featured: true },
    { key: "ai", icon: RiRobot2Line, bullets: ["b1", "b2", "b3"] },
  ]

  const smallServices = [
    { key: "web", icon: FaLaptop },
    { key: "support", icon: MdOutlineSupportAgent },
    { key: "workshop", icon: FaChalkboardTeacher },
  ]

  return (
    <section className="container mx-auto px-4 py-20" id="services">
      <h2 className="text-5xl md:text-6xl font-light text-slate-900 dark:text-white text-center mb-16">
        {t("heading")}
      </h2>

      {/* Main service cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-8">
        {mainServices.map(({ key, icon: Icon, bullets, featured }) => (
          <div
            key={key}
            className={featured
              ? "bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-brand-400/50 dark:border-brand-500/50 flex flex-col"
              : "bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 transition-all flex flex-col"}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-600/20 rounded-full flex items-center justify-center">
                <Icon className="text-brand-400" size={32} />
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white text-center mb-2">{t(`${key}.title`)}</h3>

            {/* Price badge */}
            <div className="flex justify-center mb-6">
              <div className={`${featured ? "bg-brand-600" : "bg-slate-700"} rounded-xl px-6 py-3 text-center`}>
                <span className="text-2xl font-bold text-white">{t(`${key}.price`)}</span>
              </div>
            </div>

            <ul className="space-y-3 flex-1">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckIcon className="text-brand-400 flex-shrink-0 mt-1" width={20} height={20} />
                  <span className="text-slate-700 dark:text-slate-200 text-2xl">{t(`${key}.${b}`)}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-center text-brand-700 dark:text-brand-300 font-medium text-lg">
              {t(`${key}.note`)}
            </p>
          </div>
        ))}
      </div>

      {/* Websites, IT support, AI workshop */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {smallServices.map(({ key, icon: Icon }) => (
          <div
            key={key}
            className="bg-slate-50 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 transition-all flex flex-col items-center text-center gap-4"
          >
            <div className="w-14 h-14 bg-brand-600/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon className="text-brand-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{t(`${key}.title`)}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xl flex-1">{t(`${key}.desc`)}</p>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{t(`${key}.price`)}</span>
          </div>
        ))}
      </div>

    </section>
  )
}
