
import './globals.css'
import { Genos } from 'next/font/google'
import Image from 'next/image'


import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

 
const genos = Genos({
  subsets: ['latin']

})


export const metadata = {
  title: 'awattsdev - web developer',
  description: 'Homepage of awattsdev web development',
}




export default async function RootLayout({ children, params:{locale} }) {
  
  const messages = await getMessages();
  return (
    <html lang={locale} className={genos.className}>

      
      <body>
       
      <NextIntlClientProvider messages={messages} >
        {children}
      </NextIntlClientProvider>
      
        

      </body>
    </html>
  )
}
