import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from "./offersmodal.module.scss";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '@/utils/axios';
import { AuthContext } from '@/context/AuthContext';
import Offer from '../offer/Offer';

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

export default function OffersModal({ state, setState }) {

  const { currentUser } = React.useContext(AuthContext);

  const [open, setOpen] = React.useState(state);
  const handleClose = () => setOpen(setState(false));

  const { isLoading, error, data } = useQuery(['offers'], () =>
    makeRequest.get('/offers', {
      params: {
        id: currentUser?.id
      }
    }).then((res) => {
      return res.data
    })
  );


  console.log(data);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.offers}>
            {
              data?.length ? data.map((offer) => {
                if (offer.status !== null && offer.status === 0) {
                  return (
                    "No Offers"
                  )
                }
                return <Offer key={offer.id} offer={offer} />
              }
              )
                :
                <div className={styles.noOffer}>
                  <span>No one has offered to help you on your requests yet. Please check back later.</span>
                </div>
            }
          </div>
        </Box>
      </Modal>
    </div>
  );
}