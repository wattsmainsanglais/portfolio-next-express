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


export const metadata = {
  title: 'Web Developer France | Next.js & React | awattsdev',
  description: 'Professional web development services in France. Custom Next.js websites, e-commerce platforms, and bilingual sites. Fast delivery, transparent pricing. Serving businesses across France and Europe.',
  keywords: [
    'web developer', 'France', 'Next.js', 'React', 'website development', 'e-commerce', 'bilingual websites', 'Nouvelle-Aquitaine', 'web design',
    'développeur web', 'développeur web France', 'création site web', 'développement web', 'site internet', 'site web professionnel',
    'développeur React', 'développeur Next.js', 'site bilingue', 'e-commerce France', 'développeur freelance',
    'agence web', 'création site internet', 'développeur Nouvelle-Aquitaine', 'site responsive', 'développement site web'
  ],
  authors: [{ name: 'Andrew Watts' }],
  openGraph: {
    title: 'awattsdev - Web Development France',
    description: 'Professional web development services. Custom websites, e-commerce, and bilingual solutions.',
    url: 'https://www.awattsdev.eu',
    siteName: 'awattsdev',
    locale: 'en_US',
    type: 'website',
  },
}




export default async function RootLayout({ children, params }) {
  
  const {locale} = await params

  const messages = await getMessages();
  return (
    <html lang={locale} className={genos.className}>
      
      <head>
        <title>awattsdev web development & support</title>
       
      </head>
      <GoogleAnalytics gaId="G-4BVEYN2HGS"/>
      
      <body>
       
      <NextIntlClientProvider messages={messages} >
        <Theme data-is-root-theme='false' grayColor="olive" accentColor="purple" >
        {children}
        </Theme>
      </NextIntlClientProvider>
      
        

      </body>
    </html>
  )
}
