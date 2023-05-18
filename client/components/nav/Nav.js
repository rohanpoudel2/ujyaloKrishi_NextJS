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
    <div className={styles.navCont}>
      <nav className={styles.mainNav} data-theme-nav="dark">
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
            {currentUser ? (
              <Link href={'/profile'}>
                <li className={styles.navElement}>
                  Profile
                </li>
              </Link>
            ) : (
              <Link href={'/auth/register'}>
                <li className={styles.navElement}>
                  SignUp
                </li>
              </Link>
            )}
          </ul>
        </Container>
      </nav>
    </div>

  )
}

export default Nav
