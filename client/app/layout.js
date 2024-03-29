
import './globals.css'
import { Genos } from 'next/font/google'
import Image from 'next/image'

import profilePic from '../public/images/profilebw.jpg'
import linkedIn from '../public/images/linkedin_socialnetwork_17441.png'
import gitHub from '../public/images/github_original_wordmark_logo_icon_146506.png'

import headerStyle from './header.module.css'
import ContactForm from '@/app/components/contact_form'

 
const genos = Genos({
  subsets: ['latin']

})


export const metadata = {
  title: 'awattsdev',
  description: 'Homepage of Andrew Watts full stack development',
}







export default function RootLayout({ children }) {
  
  
  return (
    <html lang="en" className={genos.className}>

      
      <body>
        <header className={headerStyle.headercss}>
            <aside className="profile">
                <Image
               
                src={profilePic}
                alt='Picture of Andrew Watts (awattsdev)'
                />
                
                <div className="mask">
                    
                </div>
               
            </aside>
            <h1>Andrew Watts Development</h1>
          </header> 
         
      {children}
        <footer>

        <section className='contact'>
          <ContactForm />
         
        </section>


        <section className='links' >
                <h2>Links</h2>
                <h2>I'm also active on the following platforms</h2>
                <aside>
                  <a target="_blank" href="https://www.linkedin.com/in/andrew-watts-9a7145269/">
                    <Image src={linkedIn} 
                    alt='Linkedin Logo and link'
                    width={100}
                    height={90}
                    className='nodelogohover'
                    />
                  </a>

                 <a target="_blank" href="https://github.com/wattsmainsanglais">   
                  <Image src={gitHub} 
                    alt='Linkedin Logo and link'
                    width={100}
                    height={90}
                    className='nodelogohover'
                    />
                  </a>
                    
                </aside>
            </section>
        </footer>

      </body>
    </html>
  )
}
