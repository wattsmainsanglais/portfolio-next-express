import { Genos } from 'next/font/google'
import Image from 'next/image'

import awattsdevImg from '../../../../public/images/nologo.svg'

import profilePic from '../../../../public/images/profilebw.jpg'
import linkedIn from '../../../../public/images/linkedin_socialnetwork_17441.png'
import gitHub from '../../../../public/images/github_original_wordmark_logo_icon_146506.png'


export default function CvRoot({children}){

    return(

        <html lang="en" >

            <body>
                {children}
                <p>This will be the cv</p>
            </body>

        </html>
    )
}