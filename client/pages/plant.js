import GuestLayout from "@/layouts/GuestLayout";
import styles from '@/styles/plant.module.scss';
import FeatureImage from '@/public/images/plant/featureImage.png';
import Image from "next/image";
import { withAuth } from "@/lib/withAuth";

const Plant = () => {

  return (
    <>
      <GuestLayout>
        <div className={styles.plant}>
          <div className={styles.left}>
            <Image
              src={FeatureImage}
              alt="Plant Disease"
            />
          </div>
          <div className={styles.right}>
            <h1 className={styles.instructions}>
              Upload the Image here ....
            </h1>
            <div className={styles.uploadSection}>
              <form>
                <label htmlFor="plant">
                  <i className="fa-solid fa-arrow-up"></i>
                  <input type="file" required name="plant" id="plant" hidden />
                </label>
              </form>
            </div>
          </div>
        </div>
      </GuestLayout>
    </>
  )
}

export default withAuth(Plant)