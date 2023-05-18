import GuestLayout from "@/layouts/GuestLayout";
import styles from '@/styles/plant.module.scss';
import FeatureImage from '@/public/images/plant/featureImage.png';
import Image from "next/image";
import { withAuth } from "@/lib/withAuth";
import Head from "next/head";

const Plant = () => {

  return (
    <>
      <GuestLayout>
        <Head>
          <title>Plant Disease Detection - Ujyalo Krishi</title>
        </Head>
        <div className={styles.plant}>
          <div className={styles.left}>
            <Image
              src={FeatureImage}
              alt="Plant Disease"
            />
          </div>
          <div className={styles.right}>
            <iframe
              src="https://hacksberg-plant.hf.space/"
              width="100%"
              height="600px"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </GuestLayout >
    </>
  )
}

export default withAuth(Plant)