'use client'

import { useState } from 'react'
import { CheckIcon } from "@radix-ui/react-icons"
import { FaLaptop } from "react-icons/fa"
import { MdOutlineSupportAgent } from "react-icons/md"
import { useTranslations } from "next-intl"

export default function Services() {
  const [activeTab, setActiveTab] = useState('dev')
  const t = useTranslations("Services")

  const devServices = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const supportServices = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <section className="container mx-auto px-4 py-20" id="services">
      {/* Heading */}
      <h2 className="text-xl md:text-6xl font-light text-white text-center mb-16">
        Services
      </h2>

      {/* Service Overview Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8  mb-16">
        {/* Web Development Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
              <FaLaptop className="text-purple-400" size={32} />
            </div>
          </div>

          <div className="text-center text-lg md:text-2xl text-slate-300 space-y-4">
            <p>{t("dev.1")}</p>
            <p>{t("dev.2")}</p>
            <p>{t("dev.3")}</p>
          </div>

          <p className="text-center mt-6 text-2xl font-semibold text-white">
            {t("dev.end")}
          </p>
        </div>

        {/* Web Support Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
              <MdOutlineSupportAgent className="text-purple-400" size={32} />
            </div>
          </div>

          <div className="text-center text-lg md:text-2xl text-slate-300 space-y-4">
            <p>{t("support.1")}</p>
            <p>{t("support.2")}</p>
            <p>{t("support.3")}</p>
          </div>

          <p className="text-center mt-6 text-2xl font-semibold text-white">
            {t("support.end")}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('dev')}
            className={`px-8 py-3 rounded-lg font-medium text-lg transition-all ${
              activeTab === 'dev'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Web Development
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-8 py-3 rounded-lg font-medium text-lg transition-all ${
              activeTab === 'support'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Web Support
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          {activeTab === 'dev' && (
            <ul className="space-y-3">
              {devServices.map((_, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200 text-lg md:text-2xl">
                  <CheckIcon className="text-purple-400 flex-shrink-0 mt-1" width={20} height={20} />
                  <span className="text-2xl">{t(`tabs.dev.${index + 1}`)}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'support' && (
            <ul className="space-y-3">
              {supportServices.map((_, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200">
                  <CheckIcon className="text-purple-400 flex-shrink-0 mt-1" width={20} height={20} />
                  <span className="text-lg md:text-2xl">{t(`tabs.support.${index + 1}`)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
