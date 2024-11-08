
import styles from './Overlay.module.css'
import stylesPage from './page.module.css'
import headerStyle from './header.module.css'
import Bio from './_components/bio'
import Projects from './_components/projects'
import ContactForm from './_components/contact_form'
import Services from './_components/services/services'

import Image from 'next/image'

import { Flex } from '@radix-ui/themes'

import awattsdevImg from '../../../public/images/nologo.svg'

import profilePic from '../../../public/images/profilebw.jpg'
import linkedIn from '../../../public/images/linkedin_socialnetwork_17441.png'
import gitHub from '../../../public/images/github_original_wordmark_logo_icon_146506.png'

import { FaFacebookSquare, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Page() {
  return (
    <div className={stylesPage.main}>
          <header className={headerStyle.headercss}>
            <Flex align='center'>
              <aside className={headerStyle.profile}>
                  <Image
                  style={{
                    width: '80%',
                    height: 'auto'
                  
                  }}
                
                  src={profilePic}
                  alt='Picture of Andrew Watts (awattsdev)'
                  />
                  
                  <div className="mask">
                      
                  </div>
                
              </aside>
              <Image
            
              alt='Awattsdev Logo'
              src={awattsdevImg}
              style={{
                width: '35%',
                height: '10%',
              }}
              sizes="(max-width: 808px) 50vw 30vw"
              />
            </Flex>
            <Flex direction='column' height='100%' align='start' justify='start' >

              <Flex gap='2'>
                <a target='_blank' href='https://www.facebook.com/profile.php?id=61553113778974' ><FaFacebookSquare fontSize={26} /></a>
                <a target='_blank' href='https://www.instagram.com/awattsdev/' ><FaInstagram fontSize={26} /></a>
                <a target='_blank' href='https://www.linkedin.com/in/andrew-watts-9a7145269/' ><FaLinkedinIn fontSize={26} /></a>
                <a target='_blank' href='https://github.com/wattsmainsanglais' ><FaGithub fontSize={26} /></a>
              </Flex>

            </Flex>

        </header> 


        <div className={styles.overlay}>

        <Bio />
        <Services />
        <Projects />
        
        

        
        </div>

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
    </div>
  )
}
