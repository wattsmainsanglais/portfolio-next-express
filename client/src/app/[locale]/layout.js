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
      ? 'Web Developer France & UK | Small Business Websites'
      : 'Web Developer France & UK | Sites Web pour Entreprises',
    description: isEn
      ? 'Freelance web developer building professional websites for small businesses in France & UK. Based near Civray, serving Vienne, Charente & Greater Manchester. One-time payment from €375, no monthly fees.'
      : 'Développeur web freelance créant des sites web professionnels pour entreprises en France & UK. Basé près de Civray, Vienne 86. Paiement unique à partir de 375€, sans abonnement.',
    keywords: [
      // EN - what customers actually search
      'web developer France', 'web development France', 'freelance web developer',
      'website for small business', 'professional website', 'affordable web development', 'web design and development',
      'web designer France', 'business website', 'website no monthly fees',
      'AI training workshops', 'IT support France', 'Nouvelle-Aquitaine', 'web developer near me',
      'web developer Civray', 'web developer Vienne', 'web developer Ruffec', 'web developer Charroux',
      'web developer Poitiers', 'web developer Angoulême', 'web developer Limoges',
      'web developer Greater Manchester', 'web developer Tameside',
      // FR - what French customers search
      'développeur web France', 'développement web France', 'création site web', 'site internet professionnel',
      'créateur site web', 'site web pas cher', 'développeur web freelance',
      'site web entreprise', 'site internet sans abonnement', 'formation IA',
      'support informatique', 'développeur web Nouvelle-Aquitaine', 'site web Charente', 'site web Vienne',
      'création site web Civray', 'création site web Ruffec', 'création site web Vienne 86',
      'création site web Angoulême', 'création site web Limoges', 'création site web Poitiers',
      'site internet Civray', 'site internet Charroux', 'développeur web Vienne 86',
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
        ? 'awattsdev - Web Development & Professional Websites for Small Businesses'
        : 'awattsdev - Développement Web & Sites Web Professionnels pour Entreprises',
      description: isEn
        ? 'One-time payment, no monthly fees. Web development, AI training & IT support in France & UK.'
        : 'Paiement unique, sans abonnement. Développement web, formations IA & support informatique en France & UK.',
      url: `${baseUrl}/${locale}`,
      siteName: 'awattsdev',
      locale: isEn ? 'en_GB' : 'fr_FR',
      type: 'website',
      images: [{ url: '/images/awattsdev.png', width: 3163, height: 792, alt: 'awattsdev - Web Development' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn
        ? 'awattsdev - Web Development & Professional Websites for Small Businesses'
        : 'awattsdev - Développement Web & Sites Web Professionnels pour Entreprises',
      description: isEn
        ? 'One-time payment, no monthly fees. Web development, AI training & IT support in France & UK.'
        : 'Paiement unique, sans abonnement. Développement web, formations IA & support informatique en France & UK.',
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
                ? "Freelance web developer building professional websites for small businesses. AI training workshops and IT support."
                : "Développeur web freelance créant des sites web professionnels pour petites entreprises. Formations IA et support informatique.",
              "url": "https://www.awattsdev.eu",
              "logo": "https://www.awattsdev.eu/images/awattsdev.png",
              "image": "https://www.awattsdev.eu/images/awattsdev.png",
              "email": "awattsdev@gmail.com",
              "founder": {
                "@type": "Person",
                "name": "Andrew Watts",
                "jobTitle": "Web Developer & Designer",
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
                  "name": locale === 'en' ? "How much does a website cost?" : "Combien coûte un site web ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "Websites start from €375 as a one-time payment — no monthly fees, no subscriptions. This includes a professional responsive design, dual language support (English & French), contact form, and free hosting on Vercel."
                      : "Les sites web commencent à partir de 375 € en paiement unique — sans abonnement mensuel. Cela comprend un design professionnel responsive, le support bilingue (anglais et français), un formulaire de contact et l'hébergement gratuit sur Vercel."
                  }
                },
                {
                  "@type": "Question",
                  "name": locale === 'en' ? "How long does it take to build a website?" : "Combien de temps faut-il pour créer un site web ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "Websites are delivered within 10 days of receiving all content (text, images, logo). The process starts with a planning call, then build, review, and launch."
                      : "Les sites web sont livrés dans les 10 jours suivant la réception de tous les contenus (textes, images, logo). Le processus commence par un appel de planification, puis la construction, la révision et le lancement."
                  }
                },
                {
                  "@type": "Question",
                  "name": locale === 'en' ? "Are there any monthly fees after the website is built?" : "Y a-t-il des frais mensuels après la création du site ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "No monthly fees. The €375 is a one-time payment. Hosting is free on Vercel (client's own account). You own your website, your code, and all your accounts outright."
                      : "Aucun frais mensuel. Les 375 € sont un paiement unique. L'hébergement est gratuit sur Vercel (compte du client). Vous êtes propriétaire de votre site, de votre code et de tous vos comptes."
                  }
                },
                {
                  "@type": "Question",
                  "name": locale === 'en' ? "What areas do you serve?" : "Quelles zones géographiques couvrez-vous ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "Based near Civray in Vienne (86), Nouvelle-Aquitaine, France. Serving businesses across France — particularly Civray, Charroux, Ruffec, Poitiers, Angoulême, Limoges and the wider Vienne, Charente and Haute-Vienne area — and in Greater Manchester and Tameside in the UK. Remote work available across Europe."
                      : "Basé près de Civray dans la Vienne (86), Nouvelle-Aquitaine, France. Je travaille avec des entreprises dans toute la France — notamment Civray, Charroux, Ruffec, Poitiers, Angoulême, Limoges et la région Vienne/Charente/Haute-Vienne — ainsi qu'à Greater Manchester et Tameside au Royaume-Uni. Travail à distance disponible dans toute l'Europe."
                  }
                },
                {
                  "@type": "Question",
                  "name": locale === 'en' ? "Do you offer IT support?" : "Proposez-vous un support informatique ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": locale === 'en'
                      ? "Yes. On-site IT support for businesses and individuals — hardware issues, software problems, email setup, OS upgrades, network troubleshooting. First hour is €55, then €45/hr. No contracts, pay per visit."
                      : "Oui. Support informatique sur site pour entreprises et particuliers — problèmes matériels, logiciels, configuration d'email, mises à jour OS, dépannage réseau. Première heure à 55 €, puis 45 €/h. Sans contrat, paiement à la visite."
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
