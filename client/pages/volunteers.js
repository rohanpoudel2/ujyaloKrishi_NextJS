import GuestLayout from '@/layouts/GuestLayout'
import styles from '@/styles/volunteers.module.scss'
import Request from '@/components/request/Request'
import { withAuth } from "@/lib/withAuth";
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import FarmerRequest from '@/lib/farmerRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '@/utils/axios';
import OffersModal from '@/components/offersModal/OffersModal';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import OffersStatusModal from '@/components/offersStatusModal/OffersStatusModal';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Volunteers = () => {

  const [showOffers, setShowOffers] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showOfferStatus, setShowOfferStatus] = useState(false);

  const [inputs, setInputs] = useState({
    title: "",
    desc: ""
  });

  const queryClient = useQueryClient();

  const mutationRequest = useMutation(
    (newRequest) => {
      return makeRequest.post('/requests', newRequest);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["requests"]);
        setShowAlert(true);
      },
    }
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert(false);
  };

  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = (e) => {
    e.preventDefault();
    mutationRequest.mutate(inputs);
    setInputs({
      title: "",
      desc: ""
    });
  }

  const { isLoading, error, data } = useQuery(['requests'], () =>
    makeRequest.get("/requests/all").then((res) => {
      return res.data;
    })
  );

  console.log(data)

  return (
    <>
      <GuestLayout>
        <div className={styles.volunteers}>
          {currentUser?.type !== "farmer" ?
            <>
              {
                showOfferStatus && <OffersStatusModal show={showOfferStatus} setShow={setShowOfferStatus} />
              }
              <div className={styles.topBar}>
                <div className={styles.left}>
                  <h1 className={styles.intro}>
                    Help Farmers in Need ...
                  </h1>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className={styles.right}>
                  <button onClick={() => setShowOfferStatus(!showOfferStatus)}>
                    Offers Status
                  </button>
                </div>
              </div>
              <div className={styles.requests}>
                {
                  data?.map((request) => (
                    <Request request={request} key={request.id} />
                  ))
                }
              </div>
            </>
            :
            <>
              {
                showOffers
                &&
                <OffersModal state={showOffers} setState={setShowOffers} />
              }
              <div className={styles.forFarmers}>
                <div className={styles.left}>
                  <h2>
                    Make a request for Volunteers Here
                  </h2>
                  <form className={styles.requestForm} onSubmit={handleClick}>
                    <input type="text" name="title" placeholder='Help Request Title' onChange={handleChange} value={inputs.title} required />
                    <textarea name="desc" id="desc" cols="30" rows="2" placeholder='Help Request Definition' value={inputs.desc} onChange={handleChange} required></textarea>
                    <button>
                      <i className="fa-solid fa-hand-holding-hand"></i>
                      Make Request
                    </button>
                  </form>
                  <button className={styles.offersReceived} onClick={() => setShowOffers(!showOffers)}>
                    View Offers
                  </button>
                </div>
                <div className={styles.right}>
                  <FarmerRequest />
                </div>
              </div>
            </>
          }

        </div>
        {
          showAlert && (
            <>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Volunteer Request Made Successfully
                </Alert>
              </Snackbar>
            </>
          )
        }
      </GuestLayout>

    </>
  )
}

export default withAuth(Volunteers)