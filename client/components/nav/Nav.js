import styles from './nav.module.scss'
import Image from 'next/image'
import Logo from '@/public/Logo.svg'
import { Container } from '@mui/material'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

const Nav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className={styles.mainNav}>
      <Container maxWidth="xl" className={styles.navContainer}>
        <div className={styles.navLogo}>
          <Link href={'/'}>
            <Image
              src={Logo}
              alt='Logo'
              width={100}
              height={100}
            />
          </Link>
        </div>
        <ul className={styles.navElements}>
          <li className={styles.navElement}>
            About
          </li>
          <li className={styles.navElement}>
            Features
          </li>
          {currentUser ? (
            <li className={styles.navElement}>
              <Link href={'/profile'}>
                Profile
              </Link>
            </li>
          ) : (
            <li className={styles.navElement}>
              <Link href={'/auth/signup'}>
                SignUp
              </Link>
            </li>
          )}
        </ul>
      </Container>
    </nav>
  )
}

export default Nav
