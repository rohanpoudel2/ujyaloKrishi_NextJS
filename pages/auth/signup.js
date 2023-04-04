import GuestLayout from "@/layouts/GuestLayout"
import styles from "@/styles/signup.module.scss"
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Signup from "@/components/farmerForm/signupForm/Signup";
import Signup1 from "@/components/volunteerForm/signupForm/Signup"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const SignUp = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [state, setState] = React.useState(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {state ?
            <>
              <Signup />
            </>
            :
            <>
              <Signup1 />
            </>
          }
        </Box>
      </Modal>
      <GuestLayout>
        <div className={styles.signupLayout}>
          <div className={styles.top}>
            <h1 className={styles.mainTitle}>
              Who are you going to use this Platform As...
            </h1>
            <p className={styles.mainDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quia. Quae, recusandae nemo? Aliquid pariatur quia quas debitis, omnis inventore labore. Quia quas magnam minima qui at quam ea animi!
            </p>
          </div>
          <div className={styles.userChoices}>
            <div
              className={styles.userChoice}
              onClick={
                () => {
                  handleOpen();
                  setState(true);
                }
              }>
              <i className="fa-solid fa-tractor"></i>
              <span>Farmer</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div
              className={styles.userChoice}
              onClick={
                () => {
                  handleOpen();
                  setState(false);
                }
              }
            >
              <i className="fa-solid fa-handshake-angle"></i>
              <span>Volunteer</span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </GuestLayout>
    </>
  )
}

export default SignUp