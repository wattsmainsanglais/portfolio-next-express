import Image from "next/image"
import styles from './singleProject.module.css'

export default function SingleProject({heading ,src, alt, desc}){

    return(
        
        <section className={styles.projectSection}>

            <h2 className={styles.projectSection_heading}>{heading}</h2>

            <article className={styles.projectSection_project}>
            <Image
            src={src}
            alt={alt}
            width={320}
            
            height={200} 
            />

            <p>{desc}</p>
            </article>
        
        </section>
        
    )


}