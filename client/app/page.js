
import styles from './Overlay.module.css'
import Bio from '@/app/components/bio'
import Projects from '@/app/components/projects'


export default function Page() {
  return (
    <div className={styles.overlay}>

    <Bio />
    <Projects />
    
   

    
    </div>
  )
}
