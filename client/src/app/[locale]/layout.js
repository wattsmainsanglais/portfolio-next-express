import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import './globals.css'
import { Genos } from 'next/font/google'
import Image from 'next/image'
import { GoogleAnalytics } from '@next/third-parties/google'




import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

 
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
      ? 'Web Designer France & UK | Small Business Websites | awattsdev'
      : 'Web Designer France & UK | Sites Web pour Entreprises | awattsdev',
    description: isEn
      ? 'Web designer & developer building professional websites for small businesses in France & UK. One-time payment from €375, no monthly fees. AI training & IT support.'
      : 'Web designer créant des sites web professionnels pour entreprises en France & UK. Paiement unique à partir de 375€, sans abonnement. Formations IA & support informatique.',
    keywords: [
      // EN - what customers actually search
      'web designer France', 'web developer France', 'web development France', 'website designer',
      'website for small business', 'professional website', 'affordable web design', 'web design and development',
      'freelance web designer', 'business website', 'website no monthly fees', 'web design France',
      'AI training workshops', 'IT support France', 'Nouvelle-Aquitaine', 'website designer near me',
      // FR - what French customers search
      'web designer France', 'développement web France', 'création site web', 'site internet professionnel',
      'créateur site web', 'site web pas cher', 'web designer freelance',
      'site web entreprise', 'site internet sans abonnement', 'formation IA',
      'support informatique', 'web designer Nouvelle-Aquitaine', 'site web Charente', 'site web Vienne',
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
        ? 'awattsdev - Web Design & Professional Websites for Small Businesses'
        : 'awattsdev - Web Design & Sites Web Professionnels pour Entreprises',
      description: isEn
        ? 'One-time payment, no monthly fees. Web design, AI training & IT support in France & UK.'
        : 'Paiement unique, sans abonnement. Web design, formations IA & support informatique en France & UK.',
      url: `${baseUrl}/${locale}`,
      siteName: 'awattsdev',
      locale: isEn ? 'en_GB' : 'fr_FR',
      type: 'website',
      images: [{ url: '/images/awattsdev.png', width: 3163, height: 792, alt: 'awattsdev - Web Design' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn
        ? 'awattsdev - Web Design & Professional Websites for Small Businesses'
        : 'awattsdev - Web Design & Sites Web Professionnels pour Entreprises',
      description: isEn
        ? 'One-time payment, no monthly fees. Web design, AI training & IT support in France & UK.'
        : 'Paiement unique, sans abonnement. Web design, formations IA & support informatique en France & UK.',
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
                ? "Web designer & developer building professional websites for small businesses. AI training workshops and IT support."
                : "Web designer & développeur créant des sites web professionnels pour petites entreprises. Formations IA et support informatique.",
              "url": "https://www.awattsdev.eu",
              "logo": "https://www.awattsdev.eu/images/awattsdev.png",
              "image": "https://www.awattsdev.eu/images/awattsdev.png",
              "email": "awattsdev@gmail.com",
              "founder": {
                "@type": "Person",
                "name": "Andrew Watts",
                "jobTitle": "Web Designer & Developer",
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
      <NextIntlClientProvider messages={messages} >
        <Theme data-is-root-theme='false' grayColor="olive" accentColor="purple" >
        {children}
        </Theme>
      </NextIntlClientProvider>
      
        

      </body>
    </html>
  )
}
