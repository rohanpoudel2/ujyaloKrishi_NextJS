import Image from 'next/image';
import styles from './request.module.scss';
import FarmerProfile from '@/public/images/volunteer/farmerProfile.webp'
import { withAuth } from '@/lib/withAuth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '@/utils/axios';

const Request = ({ request }) => {

  const { currentUser } = useContext(AuthContext);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newOffer) => {
      return makeRequest.post('/offers', newOffer);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["offers"]);
      },
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

  return (
    <div className={styles.request}>
      <div className={styles.information}>
        <Image
          src={FarmerProfile}
          alt='Farmers Profile'
          width={100}
          height={100}
        />
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