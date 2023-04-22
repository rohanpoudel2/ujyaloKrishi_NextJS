import Image from 'next/image'
import styles from './tool.module.scss'
import Link from 'next/link'

const Tools = ({ tool }) => {
  return (
    <Link href={tool.link}>
      <div className={styles.tool}>
        <Image
          src={tool.photo}
          alt={tool.name}
        />
      </div>
    </Link>
  )
}

export default Tools