import { AuthContext } from "@/context/AuthContext";
import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/profile.module.scss";
import { useContext } from "react";
import { withAuth } from "@/lib/withAuth";
import Image from "next/image";
import ProfileImage from "@/public/images/heroimages/hero.jpeg"
import { useRouter } from "next/router";

const Profile = () => {

  const { logout } = useContext(AuthContext);

  const router = useRouter();

  const handleLogout = async () => {
    await logout()
      .then(() => {
        router.push('/');
      });
  }

  return (
    <GuestLayout>
      <div className={styles.profile}>
        <div className={styles.userElements}>
          <div className={styles.left}>
            <span className={styles.type}>
              Farmer
            </span>
            <span className={styles.name}>
              Rohan Poudel (rohan)
            </span>
            <span className={styles.city}>
              Syangja, Nepal
            </span>
            <span className={styles.email}>
              nsrapoudel@gmail.com
            </span>
            <span className={styles.verified}>
              <div className={styles.true}>
                Verified: True
              </div>
            </span>
            <button onClick={handleLogout}>
              LogOut
            </button>
          </div>
          <div className={styles.right}>
            <label htmlFor="file">
              <Image
                src={ProfileImage}
                alt="hello"
                width={150}
                height={150}
              />
            </label>
            <input type="file" name="file" id="file" hidden />
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}

export default withAuth(Profile)