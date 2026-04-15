'use client'

import { CheckIcon } from "@radix-ui/react-icons"
import { FaLaptop } from "react-icons/fa"
import { MdOutlineSupportAgent } from "react-icons/md"
import { RiRobot2Line } from "react-icons/ri"
import { useTranslations } from "next-intl"

export default function Services() {
  const t = useTranslations("Services")

  return (
    <section className="container mx-auto px-4 py-20" id="services">
      <h2 className="text-5xl md:text-6xl font-light text-slate-900 dark:text-white text-center mb-16">
        Services
      </h2>

      {/* Main service cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-8">

        {/* Web Design */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-brand-400/50 dark:border-brand-500/50 flex flex-col">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-600/20 rounded-full flex items-center justify-center">
              <FaLaptop className="text-brand-400" size={32} />
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white text-center mb-2">Web Development</h3>

          {/* Price badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-brand-600 rounded-xl px-6 py-3 text-center">
              <span className="text-3xl font-bold text-white">from €375</span>
            </div>
          </div>

          <ul className="space-y-3 flex-1">
            {["b1", "b2", "b3", "b4"].map((key) => (
              <li key={key} className="flex items-start gap-3">
                <CheckIcon className="text-brand-400 flex-shrink-0 mt-1" width={20} height={20} />
                <span className="text-slate-700 dark:text-slate-200 text-2xl">{t(`dev.${key}`)}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-brand-700 dark:text-brand-300 font-medium text-lg">
            {t("dev.price_note")}
          </p>
        </div>

        {/* IT Support */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 transition-all flex flex-col">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-600/20 rounded-full flex items-center justify-center">
              <MdOutlineSupportAgent className="text-brand-400" size={32} />
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white text-center mb-2">IT Support</h3>

          {/* Price badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-slate-700 rounded-xl px-6 py-3 text-center">
              <span className="text-3xl font-bold text-white">from €45<span className="text-xl font-normal text-slate-300"> / hr</span></span>
            </div>
          </div>

          <ul className="space-y-3 flex-1">
            {["b1", "b2", "b3"].map((key) => (
              <li key={key} className="flex items-start gap-3">
                <CheckIcon className="text-brand-400 flex-shrink-0 mt-1" width={20} height={20} />
                <span className="text-slate-700 dark:text-slate-200 text-2xl">{t(`support.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Workshop strip */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-50 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 transition-all flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 bg-brand-600/20 rounded-full flex items-center justify-center flex-shrink-0">
            <RiRobot2Line className="text-brand-400" size={28} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">{t("workshop.title")}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-2xl">{t("workshop.desc")}</p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">€40<span className="text-base font-normal text-slate-500 dark:text-slate-300"> / person</span></span>
          </div>
        </div>
      </div>

    </section>
  )
}
