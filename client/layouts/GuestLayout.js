import { Container } from '@mui/material';
import styles from './GuestLayout.module.scss';
import Nav from '@/components/nav/Nav';

const GuestLayout = ({ children }) => {

  return (
    <>
      <Nav />
      <Container maxWidth="xl">
        {children}
      </Container>
    </>
  )
}

export default GuestLayout