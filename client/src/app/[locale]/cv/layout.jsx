import { Genos } from 'next/font/google'
import Image from 'next/image'

import awattsdevImg from '../../../../public/images/nologo.svg'

import profilePic from '../../../../public/images/profilebw.jpg'
import linkedIn from '../../../../public/images/linkedin_socialnetwork_17441.png'
import gitHub from '../../../../public/images/github_original_wordmark_logo_icon_146506.png'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const baseUrl = 'https://www.awattsdev.eu'

  return {
    title: 'Andrew Watts - CV | Web Developer France',
    description: 'Full Stack Web Developer CV - Next.js, React, TypeScript specialist. View my skills, experience, and projects. Based in France, serving Europe.',
    keywords: [
      'CV', 'web developer CV', 'Andrew Watts', 'developer CV', 'Next.js developer',
      'React developer', 'full stack developer', 'France web developer',
      'CV développeur web', 'développeur full stack', 'CV Andrew Watts'
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/cv`,
      languages: {
        'en': `${baseUrl}/en/cv`,
        'fr': `${baseUrl}/fr/cv`,
      },
    },
    openGraph: {
      title: 'Andrew Watts - Web Developer CV',
      description: 'Full Stack Web Developer specializing in Next.js, React, and TypeScript.',
      url: `${baseUrl}/${locale}/cv`,
      siteName: 'awattsdev',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      type: 'profile',
    },
  }
}


export default function CvRoot({children}){

    return(



            <body style={{backgroundColor: 'black'}}>

                {children}

            </body>


    )
}