import Image from 'next/image'
import { FaFacebookSquare, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa"
import Intro from './_components/intro/intro'
import Bio from './_components/bio'
import Projects from './_components/projects'
import ContactForm from './_components/contact_form'
import Services from './_components/services/services'
import LanguageSwitcher from './_components/language/LanguageSwitcher'
import awattsdevImg from '../../../public/images/nologo.svg'
import whiteLogo from '../../../public/images/White-logo-no background.svg'

export default async function Page({params}) {
  const {locale} = await params

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="w-48">
            <Image
              alt='Awattsdev Logo'
              src={awattsdevImg}
              className="w-full h-auto"
              sizes="200px"
              priority
            />
          </div>

          {/* Social Links & Language Switcher */}
          <div className="flex items-center gap-4">
            <a
              href='https://www.facebook.com/profile.php?id=61553113778974'
              target='_blank'
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookSquare size={24} />
            </a>
            <a
              href='https://www.instagram.com/awattsdev/'
              target='_blank'
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href='https://www.linkedin.com/in/andrew-watts-9a7145269/'
              target='_blank'
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={24} />
            </a>
            <a
              href='https://github.com/wattsmainsanglais'
              target='_blank'
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Intro />
        <Services />
        <Bio />
        <Projects />
      </main>

      {/* Footer with Contact */}
      <footer className="w-full bg-slate-950 text-white" >
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row justify-center md:justify-between items-center gap-8">
          <section className="flex w-full md:w-1/2 max-w-2xl">
            <ContactForm />
          </section>

          <div className="flex justify-center w-full md:w-1/2 items-center">
            <Image
              src={whiteLogo}
              alt='awattsdev logo white, web developer'
              width={300}
              className="opacity-80"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
