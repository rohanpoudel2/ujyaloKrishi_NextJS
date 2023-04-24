import Image from 'next/image';
import styles from './request.module.scss';
import FarmerProfile from '@/public/images/volunteer/farmerProfile.webp'
import { withAuth } from '@/lib/withAuth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const Request = () => {

  const { currentUser } = useContext(AuthContext);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (currentUser.type !== "volunteer") {
      router.push("/");
    } else {
      setIsLoadingUser(false);
    }
  }, [])

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
            Help Needed for Wheat Harvesting !!
          </h2>
          <span className={styles.location}>
            <i className="fa-solid fa-location-dot"></i> Syangja, Nepal
          </span>
        </div>
      </div>
      <button>
        Offer Help
      </button>
    </div>
  )
}

export default withAuth(Request)