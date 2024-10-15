import { Genos } from 'next/font/google'
import Image from 'next/image'

import awattsdevImg from '../../../../public/images/nologo.svg'

import profilePic from '../../../../public/images/profilebw.jpg'
import linkedIn from '../../../../public/images/linkedin_socialnetwork_17441.png'
import gitHub from '../../../../public/images/github_original_wordmark_logo_icon_146506.png'

import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function CvRoot({children}){

    return(

   
          
            <body style={{backgroundColor: 'black'}}>
                  <Theme>
                {children}
                 </Theme>
            </body>
            
  
    )
}