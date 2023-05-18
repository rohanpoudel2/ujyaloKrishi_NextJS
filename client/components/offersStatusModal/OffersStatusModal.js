import styles from "./offerstatusmodal.module.scss";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { AuthContext } from "@/context/AuthContext";
import AcceptedOffer from "../acceptedOffer/AcceptedOffer";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 200,
  bgcolor: "white",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  '@media (min-width: 600px)': {
    width: 600,
    maxWidth: '80%',
  },
  '@media (min-width: 400px)': {
    width: 400,
    maxWidth: '80%',
  },
};


const OffersStatusModal = ({ show, setShow }) => {

  const [open, setOpen] = React.useState(show);

  const handleClose = () => setShow(false);

  const { currentUser } = React.useContext(AuthContext);

  const { isLoading, error, data } = useQuery(['acceptedOffers'], () =>
    makeRequest.get("/offers/status", {
      params: {
        id: currentUser?.id
      }
    }).then((res) => {
      return res.data;
    })
  );

  console.log(data)

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.offers}>
            {
              data?.length ?
                data?.map((data, index) => {
                  return (
                    <AcceptedOffer data={data} key={index} />
                  )
                })
                :
                <span>
                  Non of your help offers has been accepted yet. Please check back later.
                </span>
            }
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default OffersStatusModal