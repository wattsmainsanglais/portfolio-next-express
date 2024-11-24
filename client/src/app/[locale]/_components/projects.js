import SingleProject from "./single-projects/singleProject"

import { Heading } from "@radix-ui/themes"

import ndThumb from '../../../../public/images/nd-background.jpg'
import popupThumb from '../../../../public/images/popweddingThumb.png'
import ptcThumb from '../../../../public/images/PTC.png'
import ndFinder from '../../../../public/images/nd-flower-finder.png'
import spaceThumb from '../../../../public/images/spacescreen.png'

export default function Projects(){

    return(
        <section className='projects'>
            <Heading weight='light' size='9'>Portfolio</Heading>

             <SingleProject link="https://www.naturedopes.com/" heading='Nature Dopes' src={ndThumb} alt='Nature Dopes Thumbnail' desc="Nature Dopes 
             is an ongoing project dedicated to creating a site firstly for the appreciation of natural flora, secondly as an educational tool. 
             To preserve the environment, we first need to understand it. It's a full stack application developed in NextJs 14 Typescipt, It utilizes many of the latest NextJs tools, such as Next-auth for authentification, Next-intl for multi language, Radix Ui, Iagon for decentralized storage and Prisma for Database management.
             Follow the link to view" /> 

            <SingleProject link="https://www.thepopupweddingcreche.fr/" heading='The Popup Wedding Creche' src={popupThumb} alt='The pop up wedding creche thumbnail' desc="This is the homepage page for a new startup business offering childcare options for weddings and large events, please give them a look if you have any major events planned in South West France. 
            The site is a web application developed in NextJs 14 and uses Next-Int for intuitive language switching. Follow the link to view " />

            <SingleProject link="https://pockettowne.io" heading='Pocket Towne' src={ptcThumb} alt='Pocket Towne Thumbnail' desc="This is a complete site redesign for an upcoming Web 3 gaming and NFT project called Pocket Towne. Developed in HTML, CSS , Javascript. Please check them out if you're interested in Metaverse & web 3" />
            
            <SingleProject link="https://s-p-a-c-e.vercel.app/" heading='S.P.A.C.E' src={spaceThumb} alt='S.P.A.C.E is an NFT project' desc="S.P.A.C.E is an NFT Art/ Utility project. I've developed a landing page to serve as the homepage for the project. The site has been developed using NextJs, using React hooks & components to give the site a responsive and animated feel. " />
        </section>
    )
}