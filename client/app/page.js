
import styles from './Overlay.module.css'
import Bio from '@/app/_components/bio'
import Projects from '@/app/_components/projects'


export default function Page() {
  return (
    <div className={styles.overlay}>

    <Bio />
    <Projects />
    
   

    
    </div>
  )
}
