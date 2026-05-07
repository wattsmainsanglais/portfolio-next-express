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
      ? 'Freelance Next.js Developer | Full-Stack | France & Europe'
      : 'Développeur Next.js Freelance | Full-Stack | France & Europe',
    description: isEn
      ? 'Freelance full-stack developer for remote contracts across France, UK and Europe. Next.js, React, Go and PostgreSQL. Available for agency and startup projects.'
      : 'Développeur full-stack freelance pour contrats à distance en France, UK et Europe. Spécialisé Next.js, React, Go et PostgreSQL. Agences et startups bienvenus.',
    keywords: [
      // EN - what customers actually search
      'web developer France', 'web development France', 'freelance web developer',
      'website for small business', 'professional website', 'affordable web development', 'web design and development',
      'web designer France', 'business website', 'website no monthly fees',
      'AI training workshops', 'IT support France', 'Nouvelle-Aquitaine', 'web developer near me',
      'web developer Civray', 'web developer Vienne', 'web developer Ruffec', 'web developer Charroux',
      'web developer Poitiers', 'web developer Angoulême', 'web developer Limoges',
      'web developer Greater Manchester', 'web developer Tameside',
      // EN - specialist / B2B
      'full-stack developer France', 'custom web application developer', 'freelance developer Europe',
      'JavaScript developer freelance France', 'Next.js freelance developer', 'Vite developer freelance',
      'Go developer freelance Europe', 'bespoke web development France', 'web application development France',
      'freelance web developer Europe', 'custom web development company France',
      // FR - what French customers search
      'développeur web France', 'développement web France', 'création site web', 'site internet professionnel',
      'créateur site web', 'site web pas cher', 'développeur web freelance',
      'site web entreprise', 'site internet sans abonnement', 'formation IA',
      'support informatique', 'développeur web Nouvelle-Aquitaine', 'site web Charente', 'site web Vienne',
      'création site web Civray', 'développeur web Ruffec', 'création site web Vienne 86',
      'développeur web Angoulême', 'développeur web Limoges', 'développeur web Poitiers',
      'site internet Civray', 'site internet Charroux', 'développeur web Vienne 86',
      // FR - specialist / B2B
      'développeur full-stack France', 'développeur JavaScript freelance', 'développeur Next.js freelance',
      'développeur Go freelance', 'application web sur mesure France', 'développement web sur mesure',
      'développeur React Europe', 'contrat freelance développeur web',
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
        ? 'awattsdev — Freelance Next.js & Go Developer | France & Europe'
        : 'awattsdev — Développeur Next.js & Go Freelance | France & Europe',
      description: isEn
        ? 'Freelance full-stack developer for remote contracts across France, UK and Europe. Next.js, React, Go and PostgreSQL. Available for agency and startup projects.'
        : 'Développeur full-stack freelance pour contrats à distance en France, UK et Europe. Spécialisé Next.js, React, Go et PostgreSQL. Agences et startups bienvenus.',
      url: `${baseUrl}/${locale}`,
      siteName: 'awattsdev',
      locale: isEn ? 'en_GB' : 'fr_FR',
      type: 'website',
      images: [{ url: '/images/awattsdev.png', width: 3163, height: 792, alt: 'awattsdev - Web Development' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn
        ? 'awattsdev — Freelance Next.js & Go Developer | France & Europe'
        : 'awattsdev — Développeur Next.js & Go Freelance | France & Europe',
      description: isEn
        ? 'Freelance full-stack developer for remote contracts across France, UK and Europe. Next.js, React, Go and PostgreSQL. Available for agency and startup projects.'
        : 'Développeur full-stack freelance pour contrats à distance en France, UK et Europe. Spécialisé Next.js, React, Go et PostgreSQL. Agences et startups bienvenus.',
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
              "alternateName": "Awattsdev Web Development",
              "description": locale === 'en'
                ? "Freelance full-stack web developer available for remote contracts across France, UK and Europe. Specialising in Next.js, React, Go and PostgreSQL. Also builds professional websites for small businesses from €375."
                : "Développeur web full-stack freelance disponible pour des contrats à distance en France, UK et Europe. Spécialisé en Next.js, React, Go et PostgreSQL. Création de sites web pour petites entreprises à partir de 375€.",
              "url": "https://www.awattsdev.eu",
              "logo": "https://www.awattsdev.eu/images/awattsdev.png",
              "image": "https://www.awattsdev.eu/images/awattsdev.png",
              "email": "awattsdev@gmail.com",
              "founder": {
                "@type": "Person",
                "name": "Andrew Watts",
                "jobTitle": "Freelance Full-Stack Web Developer",
              },
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Nouvelle-Aquitaine",
                "addressCountry": "FR",
              },
              "areaServed": [
                { "@type": "Country", "name": "France" },
                { "@type": "Country", "name": "United Kingdom" },
                { "@type": "AdministrativeArea", "name": "Nouvelle-Aquitaine" },
                { "@type": "City", "name": "Civray" },
                { "@type": "City", "name": "Charroux" },
                { "@type": "City", "name": "Ruffec" },
                { "@type": "City", "name": "Poitiers" },
                { "@type": "City", "name": "Angoulême" },
                { "@type": "City", "name": "Limoges" },
                { "@type": "AdministrativeArea", "name": "Vienne" },
                { "@type": "AdministrativeArea", "name": "Greater Manchester" },
                { "@type": "City", "name": "Tameside" },
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
                      "name": locale === 'en' ? "Website Design & Development" : "Création de Sites Web",
                      "description": locale === 'en'
                        ? "Professional websites for small businesses. One-time payment, no monthly fees. Mobile responsive, dual language support."
                        : "Sites web professionnels pour petites entreprises. Paiement unique, sans abonnement. Responsive mobile, support bilingue.",
                    },
                    "price": "375",
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
                    "price": "35",
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
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": locale === 'en' ? "Custom Web Application Development" : "Développement d'Applications Web Sur Mesure",
                      "description": locale === 'en'
                        ? "Full-stack custom web application development for agencies, startups and larger organisations. Modern JavaScript frameworks including Next.js, Vite and React, Go backend services, PostgreSQL. Available for remote freelance contracts across France, UK and Europe."
                        : "Développement full-stack d'applications web sur mesure pour agences, startups et grandes organisations. Frameworks JavaScript modernes dont Next.js, Vite et React, services backend Go, PostgreSQL. Disponible pour des contrats freelance à distance en France, UK et Europe.",
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
                      ? "Senior freelance Next.js developers in France typically charge between €400 and €750 per day depending on project complexity and duration. For fixed-price projects — such as a business website or small web application — I offer project-based rates from €375. Get in touch to discuss your requirements."
                      : "Les développeurs Next.js freelance seniors en France facturent généralement entre 400 et 750 € par jour selon la complexité et la durée du projet. Pour les projets à prix fixe — site vitrine ou petite application web — je propose des tarifs à partir de 375 €. Contactez-moi pour discuter de vos besoins."
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
