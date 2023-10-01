import styles from './Overlay.module.css'
import Bio from './bio'
import Projects from './projects'



export default function Overlay(){
    return (
        <div className={styles.overlay}>

            <Bio />
            <Projects />
            
           

            
        </div>
    )
}