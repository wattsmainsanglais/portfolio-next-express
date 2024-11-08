import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import './globals.css'
import { Genos } from 'next/font/google'
import Image from 'next/image'




import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

 
const genos = Genos({
  subsets: ['latin'],
  variable: "--font-genos"

})


export const metadata = {
  title: 'awattsdev - web developer',
  description: 'Homepage of awattsdev web development',
}




export default async function RootLayout({ children, params }) {
  
  const {locale} = await params

  const messages = await getMessages();
  return (
    <html lang={locale} className={genos.className}>

      
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
