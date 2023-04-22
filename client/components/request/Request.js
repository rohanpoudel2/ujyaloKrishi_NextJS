import Image from 'next/image';
import styles from './request.module.scss';
import FarmerProfile from '@/public/images/volunteer/farmerProfile.webp'

const Request = () => {
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

export default Request