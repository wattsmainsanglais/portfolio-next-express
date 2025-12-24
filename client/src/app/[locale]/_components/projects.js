import SingleProject from "./single-projects/singleProject"
import ndThumb from '../../../../public/images/nd-background1.png'
import popupThumb from '../../../../public/images/popweddingThumb1.png'
import ptcThumb from '../../../../public/images/PTC.png'
import spaceThumb from '../../../../public/images/spacescreen.png'
import boisThumb from '@/public/images/boisrenard.png'
import carpetcoThumb from '@/public/images/carpetcothumb.png'
import { useTranslations } from "next-intl"

export default function Projects() {
  const t = useTranslations("Portfolio")

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-white text-center mb-16">
          Portfolio
        </h2>

        <div className="space-y-8">
          <SingleProject
            link="https://giteduboisrenard.fr/en"
            heading="Le Gite du Bois Renard"
            src={boisThumb}
            alt="Bois Renard placeholder"
            desc={t("bois")}
          />

          <SingleProject
            link="https://www.carpetcodukinfield.co.uk/"
            heading="CarpetCo Dukinfield"
            src={carpetcoThumb}
            alt="CarpetCo professional carpet fitting services"
            desc={t("carpetco")}
          />

          <SingleProject
            link="https://www.naturedopes.com/"
            heading='Nature Dopes'
            src={ndThumb}
            alt='Nature Dopes Thumbnail'
            desc={t("nd")}
          />

          <SingleProject
            link="https://www.thepopupweddingcreche.fr/"
            heading='The Popup Wedding Creche'
            src={popupThumb}
            alt='The pop up wedding creche thumbnail'
            desc={t("pop")}
          />

          <SingleProject
            link="https://pockettowne.io"
            heading='Pocket Towne'
            src={ptcThumb}
            alt='Pocket Towne Thumbnail'
            desc={t("pocket")}
          />

          <SingleProject
            link="https://s-p-a-c-e.vercel.app/"
            heading='S.P.A.C.E'
            src={spaceThumb}
            alt='S.P.A.C.E is an NFT project'
            desc={t("space")}
          />
        </div>
      </div>
    </section>
  )
}
