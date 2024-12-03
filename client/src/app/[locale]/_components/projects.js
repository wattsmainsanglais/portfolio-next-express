import SingleProject from "./single-projects/singleProject"

import { Heading } from "@radix-ui/themes"

import ndThumb from '../../../../public/images/nd-background.jpg'
import popupThumb from '../../../../public/images/popweddingThumb.png'
import ptcThumb from '../../../../public/images/PTC.png'
import ndFinder from '../../../../public/images/nd-flower-finder.png'
import spaceThumb from '../../../../public/images/spacescreen.png'
import { useTranslations } from "next-intl"

export default function Projects(){

    const t = useTranslations("Portfolio")
    return(
        <section className='projects'>
            <Heading weight='light' size='9'>Portfolio</Heading>

             <SingleProject link="https://www.naturedopes.com/" heading='Nature Dopes' src={ndThumb} alt='Nature Dopes Thumbnail' desc={t("nd")} /> 

            <SingleProject link="https://www.thepopupweddingcreche.fr/" heading='The Popup Wedding Creche' src={popupThumb} alt='The pop up wedding creche thumbnail' desc={t("pop")} />

            <SingleProject link="https://pockettowne.io" heading='Pocket Towne' src={ptcThumb} alt='Pocket Towne Thumbnail' desc={t("pocket")} />
            
            <SingleProject link="https://s-p-a-c-e.vercel.app/" heading='S.P.A.C.E' src={spaceThumb} alt='S.P.A.C.E is an NFT project' desc={t("space")} />
        </section>
    )
}