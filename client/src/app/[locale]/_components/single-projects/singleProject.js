import Image from "next/image"
import styles from './singleProject.module.css'

import { Flex } from "@radix-ui/themes"

export default function SingleProject({heading ,src, alt, desc, link}){

    return(
        
        <section className={styles.projectSection}>

            <h2 className={styles.projectSection_heading}>{heading}</h2>

            <article className={styles.projectSection_project}>
                <Flex width='20%'  >
                    <a href={link} target='_blank' className={styles.projectLink} >
                    <Image
                    src={src}
                    alt={alt}
                    width={320}
                    
                    height={180} 
                    
                    />
                    </a>
                </Flex>
                <Flex width='80%'>
                    <p className={styles.description}>{desc}</p>
                </Flex>
                
            </article>
        
        </section>
        
    )


}