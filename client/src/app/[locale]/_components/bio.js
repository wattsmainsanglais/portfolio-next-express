import { Heading } from '@radix-ui/themes'

import styles from './bio.module.css'

export default function Bio(){
    return(
        <section className={styles.bio}>  
                <article className={styles.about}>
                    <Heading weight='light' size='9'>About Me</Heading>
                    <p>Hi i'm Andrew, an English & French speaking web developer based in South West France. If you're looking for web design, site modernization, shopping sites, servers and databases, you've come to the right place. 
                    I'm proficient in full stack development and can get your project off the ground from front-end to back. Please contact me using the below contact form or through my social media outlets - links in the header
                  </p>
                
                
                </article>
                <hr />
                 
        </section>
    )
}