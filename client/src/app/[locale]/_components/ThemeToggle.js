'use client'
import { useTheme } from './ThemeProvider'
import { useTranslations } from 'next-intl'
import { HiSun, HiMoon } from 'react-icons/hi'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const t = useTranslations('ThemeToggle')
  const isDark = theme === 'dark'

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <p className="text-slate-500 dark:text-slate-400 text-xl md:text-2xl font-medium tracking-wide">
        {t('question')}
      </p>
      <button
        onClick={toggleTheme}
        className="flex items-center gap-3 px-6 py-3 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/60 backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-all text-base font-semibold shadow-md hover:shadow-purple-200 dark:hover:shadow-purple-900/40"
        aria-label={t('question')}
      >
        {isDark ? (
          <>
            <HiSun size={22} className="text-yellow-400" />
            {t('toLight')}
          </>
        ) : (
          <>
            <HiMoon size={22} className="text-purple-500" />
            {t('toDark')}
          </>
        )}
      </button>
    </div>
  )
}
