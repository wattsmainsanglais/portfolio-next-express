

import styles from './bio.module.css'

export default function Bio(){
    return(
        <section className={styles.bio}>  
                <article className={styles.about}>
                    <h2 className='animatedHeader'>About Me</h2>
                    <p>Hi i'm Andrew, an English & French speaking web developer based in South West France.
                    I'm proficient in full stack development and can get your project off the ground from front-end to back.
                    I'm on Github under the username 'wattsmainsanglais'. Please find my tech stack listed below. This site has been developed in NextJS with a custom ExpressJS server. Please contact me using the below contact form for any and all enquiries. </p>
                
                </article>
                <hr />
                   
                <article className={styles.skills}>
                    <h2 className='animatedHeader'>Tech Stack</h2>
                    <aside className={styles.skillsLogo}>
                        <img className={styles.skillsImg} src="images/social_html5_html_71.png" aria-label="html logo" />
                        <img  className={styles.skillsImg} src="images/css_3721.png" aria-label="css logo" />
                        <img className={styles.skillsImg} src="images/javascript_logo_icon_145155.png" aria-label="Javascript logo" />
                        <img  className={styles.skillsImg} src="images/expressjs_logo_icon_169185.png" aria-label="express js logo" />
                        <img  className={styles.skillsImg} src="images/node_icon_196185.png" aria-label="node js logo" />
                        <img  className={styles.skillsImg} src="next.svg" aria-label="NextJs logo" />
                        <img  className={styles.skillsImg} src="images/react_original_wordmark_logo_icon_146375.png" aria-label=" React logo" />
                        <img  className={styles.skillsImg} src="images/postgresql_original_wordmark_logo_icon_146392.png" aria-label="Postgres logo" />
                    </aside>
                </article>
                    <hr />
        </section>
    )
}