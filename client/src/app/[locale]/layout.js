import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import './globals.css'
import { Genos } from 'next/font/google'
import Image from 'next/image'
import { GoogleAnalytics } from '@next/third-parties/google'




import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { ThemeProvider } from './_components/ThemeProvider'

 
const genos = Genos({
  subsets: ['latin'],
  variable: "--font-genos"

})


export async function generateMetadata({ params }) {
  const { locale } = await params
  const baseUrl = 'https://www.awattsdev.eu'

  const isEn = locale === 'en'

  return {
    metadataBase: new URL(baseUrl),
    title: isEn
      ? 'Custom Web Apps, SaaS & AI Integration | Andrew Watts'
      : 'Applications Web Sur Mesure & Intégration IA | Andrew Watts',
    description: isEn
      ? 'Custom web apps, SaaS and AI integration for businesses in Civray, Sud Vienne, Poitiers and Angoulême. Built around how you work, and you own the code.'
      : "Applications web sur mesure, SaaS et intégration IA pour les entreprises de Civray, du Sud Vienne, de Poitiers et d'Angoulême. Vous êtes propriétaire du code.",
    keywords: [
      // EN
      'custom web application development', 'custom software for small business', 'SaaS development',
      'AI integration for business', 'AI automation for small business', 'business process automation',
      'web app developer Poitiers', 'custom software Angoulême', 'software developer Civray',
      'software developer Sud Vienne', 'freelance software developer Nouvelle-Aquitaine',
      // FR
      'application web sur mesure', 'logiciel sur mesure', 'développement SaaS',
      'intégration IA entreprise', 'automatisation IA PME', 'développeur logiciel Poitiers',
      'logiciel sur mesure Angoulême', 'développeur Civray', 'développeur Sud Vienne',
      'développeur logiciel Nouvelle-Aquitaine',
    ],
    authors: [{ name: 'Andrew Watts' }],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'fr': `${baseUrl}/fr`,
      },
    },
    openGraph: {
      title: isEn
        ? 'awattsdev | Custom Web Apps, SaaS & AI Integration'
        : 'awattsdev | Applications Web Sur Mesure & Intégration IA',
      description: isEn
        ? 'Custom software and AI tools for businesses in Civray, Sud Vienne, Poitiers and Angoulême.'
        : 'Logiciels et outils IA sur mesure pour les entreprises de Civray, du Sud Vienne, de Poitiers et d’Angoulême.',
      url: `${baseUrl}/${locale}`,
      siteName: 'awattsdev',
      locale: isEn ? 'en_GB' : 'fr_FR',
      type: 'website',
      images: [{ url: '/images/awattsdev.png', width: 3163, height: 792, alt: 'awattsdev - Custom Web Apps, SaaS & AI Integration' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn
        ? 'awattsdev | Custom Web Apps, SaaS & AI Integration'
        : 'awattsdev | Applications Web Sur Mesure & Intégration IA',
      description: isEn
        ? 'Custom software and AI tools for businesses in Civray, Sud Vienne, Poitiers and Angoulême.'
        : 'Logiciels et outils IA sur mesure pour les entreprises de Civray, du Sud Vienne, de Poitiers et d’Angoulême.',
      images: ['/images/awattsdev.png'],
    },
  }
}




export default async function RootLayout({ children, params }) {
  
  const {locale} = await params

  const messages = await getMessages();
  return (
    <html lang={locale} className={genos.className}>
      <GoogleAnalytics gaId="G-4BVEYN2HGS"/>
      
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "awattsdev",
              "alternateName": "awattsdev Custom Software & AI Integration",
              "description": locale === 'en'
                ? "Freelance software developer based in Civray. Custom web applications, SaaS and AI integration for businesses in Sud Vienne, Poitiers, Angoulême and across Nouvelle-Aquitaine. Also professional websites, IT support and AI workshops."
                : "Développeur logiciel freelance basé à Civray. Applications web sur mesure, SaaS et intégration IA pour les entreprises du Sud Vienne, de Poitiers, d'Angoulême et de toute la Nouvelle-Aquitaine. Également sites internet, support informatique et ateliers IA.",
              "url": "https://www.awattsdev.eu",
              "logo": "https://www.awattsdev.eu/images/awattsdev.png",
              "image": "https://www.awattsdev.eu/images/awattsdev.png",
              "email": "awattsdev@gmail.com",
              "founder": {
                "@type": "Person",
                "name": "Andrew Watts",
                "jobTitle": "Freelance Software Developer",
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Civray",
                "postalCode": "86400",
                "addressRegion": "Nouvelle-Aquitaine",
                "addressCountry": "FR",
              },
              "areaServed": [
                { "@type": "City", "name": "Civray" },
                { "@type": "AdministrativeArea", "name": "Sud Vienne" },
                { "@type": "City", "name": "Poitiers" },
                { "@type": "City", "name": "Angoulême" },
                { "@type": "AdministrativeArea", "name": "Vienne" },
                { "@type": "AdministrativeArea", "name": "Charente" },
                { "@type": "AdministrativeArea", "name": "Nouvelle-Aquitaine" },
                { "@type": "Country", "name": "France" },
                { "@type": "Country", "name": "United Kingdom" },
              ],
              "priceRange": "€€",
              "currenciesAccepted": "EUR, GBP",
              "paymentAccepted": "Bank Transfer",
              "knowsLanguage": ["English", "French"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": locale === 'en' ? "Custom Web Applications & SaaS" : "Applications Web Sur Mesure & SaaS",
                      "description": locale === 'en'
                        ? "Custom web applications, ecommerce platforms and SaaS products built around how your business works. Admin dashboards, payments, integrations with your existing tools. You own the code."
                        : "Applications web, plateformes e-commerce et produits SaaS sur mesure, conçus autour du fonctionnement de votre entreprise. Tableaux de bord, paiements, intégrations avec vos outils existants. Vous êtes propriétaire du code.",
                    },
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": locale === 'en' ? "AI Integration & Automation" : "Intégration IA & Automatisation",
                      "description": locale === 'en'
                        ? "AI features and automation built into your business tools: document processing, drafting, data extraction and workflow automation."
                        : "Fonctionnalités IA et automatisations intégrées à vos outils : traitement de documents, rédaction, extraction de données et automatisation des tâches.",
                    },
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": locale === 'en' ? "Website Design & Development" : "Création de Sites Web",
                      "description": locale === 'en'
                        ? "Professional websites for small businesses. One-time payment, no monthly fees. Mobile responsive, dual language support."
                        : "Sites web professionnels pour petites entreprises. Paiement unique, sans abonnement. Responsive mobile, support bilingue.",
                    },
                    "price": "650",
                    "priceCurrency": "EUR",
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": locale === 'en' ? "AI Training Workshops" : "Formations IA",
                      "description": locale === 'en'
                        ? "Practical AI workshops for small businesses. Learn to automate admin tasks and save hours every week."
                        : "Formations IA pratiques pour petites entreprises. Apprenez à automatiser vos tâches administratives.",
                    },
                    "price": "50",
                    "priceCurrency": "EUR",
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": locale === 'en' ? "IT Support" : "Support Informatique",
                      "description": locale === 'en'
                        ? "Software, hardware, email, network and security support. No contracts, pay per visit."
                        : "Support logiciel, matériel, email, réseau et sécurité. Sans contrat, paiement à la visite.",
                    },
                  },
                ],
              },
              "sameAs": [
                "https://www.facebook.com/awattsdev",
                "https://www.linkedin.com/in/awattsdev",
                "https://github.com/awatts",
              ],
            }),
          }}
        />
        {/* FAQPage disabled 7 Oct 2026: Google deprecated FAQ rich results (May 2026), and the Q&As pitched agency/contract work.
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": locale === 'en' ? "How much does a freelance Next.js developer charge in France?" : "Combien facture un développeur Next.js freelance en France ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "Senior freelance Next.js developers in France typically charge between €400 and €750 per day depending on project complexity and duration. For fixed-price projects — such as a business website or small web application — I offer project-based rates from €650. Get in touch to discuss your requirements."
                      : "Les développeurs Next.js freelance seniors en France facturent généralement entre 400 et 750 € par jour selon la complexité et la durée du projet. Pour les projets à prix fixe — site vitrine ou petite application web — je propose des tarifs à partir de 650 €. Contactez-moi pour discuter de vos besoins."
                  }
                },
                {
                  "@type": "Question",
                  "name": locale === 'en' ? "Can you work remotely for UK or EU companies?" : "Pouvez-vous travailler à distance pour des entreprises au Royaume-Uni ou en Europe ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "Yes. I'm based in France with a registered French business (SIRET 81996076600023), so I invoice EU clients cleanly under French freelance status with no complications. I'm a UK national and fully bilingual in English and French, making collaboration straightforward across France, the EU and internationally."
                      : "Oui. Je suis basé en France avec un statut d'auto-entrepreneur enregistré (SIRET 81996076600023), ce qui me permet de facturer les clients européens sans complications. Je suis de nationalité britannique et parfaitement bilingue anglais-français, ce qui facilite la collaboration en France, dans l'UE et à l'international."
                  }
                },
                {
                  "@type": "Question",
                  "name": locale === 'en' ? "What is your tech stack?" : "Quelle est votre stack technique ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "Frontend: Next.js, React, TypeScript, Tailwind CSS, Vite. Backend: Go (Fiber), Node.js, PostgreSQL, REST APIs. Infrastructure: Vercel, Docker, Railway, GitHub Actions. I build full-stack — from database schema through to deployed frontend — and can work within an existing codebase or start greenfield."
                      : "Frontend : Next.js, React, TypeScript, Tailwind CSS, Vite. Backend : Go (Fiber), Node.js, PostgreSQL, API REST. Infrastructure : Vercel, Docker, Railway, GitHub Actions. Je développe full-stack — de la base de données jusqu'au frontend déployé — sur un projet existant ou en greenfield."
                  }
                },
                {
                  "@type": "Question",
                  "name": locale === 'en' ? "Do you take on short-term contracts or one-off projects?" : "Acceptez-vous des contrats courts ou des projets ponctuels ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "Yes. I'm available for short-term contracts (a few days to a few weeks), longer engagements, and fixed-price project work. I've delivered ecommerce platforms, SaaS products, and client websites — so I can flex between a targeted sprint and an ongoing retainer depending on what you need."
                      : "Oui. Je suis disponible pour des missions courtes (quelques jours à quelques semaines), des engagements plus longs et des projets à prix fixe. J'ai livré des plateformes e-commerce, des produits SaaS et des sites clients — je m'adapte entre un sprint ciblé et une mission longue durée."
                  }
                },
                {
                  "@type": "Question",
                  "name": locale === 'en' ? "Do you work with agencies on a subcontract or white-label basis?" : "Travaillez-vous avec des agences en sous-traitance ou en marque blanche ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "Yes. I'm comfortable working as a subcontractor or white-label developer for agencies needing Next.js or Go expertise on client projects. I work discreetly, deliver clean documented code, and don't approach your clients directly."
                      : "Oui. Je travaille volontiers en sous-traitance ou en marque blanche pour des agences ayant besoin d'expertise Next.js ou Go. Je travaille discrètement, livre un code propre et documenté, et ne contacte pas vos clients directement."
                  }
                },
              ]
            })
          }}
        />
        */}
      <NextIntlClientProvider messages={messages} >
        <ThemeProvider>
          <Theme data-is-root-theme='false' grayColor="olive" accentColor="purple" >
            {children}
          </Theme>
        </ThemeProvider>
      </NextIntlClientProvider>
      
        

      </body>
    </html>
  )
}
