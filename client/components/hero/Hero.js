import Image from 'next/image'
import styles from './hero.module.scss'
import HeroImage from '@/public/images/heroimages/hero.jpeg'

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Image
        src={HeroImage}
        alt='HeroImage'
      />
      <h1 className={styles.heroHeading}>
        Level UP your Farming
      </h1>
    </div>
  )
}

export default Hero