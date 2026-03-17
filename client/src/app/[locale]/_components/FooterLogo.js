'use client'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import purpleLogo from '../../../../public/images/nologo.svg'
import whiteLogo from '../../../../public/images/White-logo-no background.svg'

export default function FooterLogo() {
  const { theme } = useTheme()
  const src = theme === 'dark' ? whiteLogo : purpleLogo

  return (
    <Image
      src={src}
      alt="awattsdev logo, web developer"
      width={300}
      className="opacity-90"
    />
  )
}
