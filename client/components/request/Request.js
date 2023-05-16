import Image from 'next/image';
import styles from './request.module.scss';
import FarmerProfile from '@/public/images/volunteer/farmerProfile.webp'
import { withAuth } from '@/lib/withAuth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '@/utils/axios';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const Request = ({ request }) => {

  const { currentUser } = useContext(AuthContext);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [msg, setMsg] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  const [alert, setAlert] = useState("info");

  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newOffer) => {
      return makeRequest.post('/offers', newOffer);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["offers"]);
        setAlert("success");
        setMsg("Help Offer Sent Successfully");
        handleClick({
          vertical: 'bottom',
          horizontal: 'center',
        });
      },
      onError: (err) => {
        setAlert("error");
        setMsg(err.response.data);
        handleClick({
          vertical: 'bottom',
          horizontal: 'center',
        })
      }
    }
  );

  useEffect(() => {
    if (currentUser.type !== "volunteer") {
      router.push("/");
    } else {
      setIsLoadingUser(false);
    }
  }, [])

  const handleOffer = () => {
    mutation.mutate({ requestId: request?.id });
  }

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }


  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  return (
    <div className={styles.request}>
      <div className={styles.information}>
        <Image
          src={FarmerProfile}
          alt='Farmers Profile'
          width={100}
          height={100}
        />
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={5000}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity={alert}>
            {msg}
          </Alert>
        </Snackbar>
        <div className={styles.info}>
          <h2 className={styles.title}>
            {request?.title}
          </h2>
          <p>
            {request?.desc}
          </p>
          <span className={styles.location}>
            <i className="fa-solid fa-location-dot"></i> {request?.city}
          </span>
        </div>
      </div>
      <button onClick={handleOffer}>
        Offer Help
      </button>
    </div>
  )
}

export default withAuth(Request)