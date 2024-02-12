
import styles from './Overlay.module.css'
import Bio from '@/components/bio'
import Projects from '@/components/projects'


export default function Page() {
  return (
    <div className={styles.overlay}>

    <Bio />
    <Projects />
    
   

    
    </div>
  )
}
