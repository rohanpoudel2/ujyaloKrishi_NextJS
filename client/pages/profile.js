import { AuthContext } from "@/context/AuthContext";
import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/profile.module.scss";
import { useContext, useState } from "react";
import { withAuth } from "@/lib/withAuth";
import Image from "next/image";
import ProfileImage from "@/public/images/heroimages/hero.jpeg"
import { useRouter } from "next/router";

const Profile = () => {

  const { logout, currentUser } = useContext(AuthContext);

  const router = useRouter();

  const handleLogout = async () => {
    await logout()
      .then(() => {
        if (typeof window !== "undefined") {
          router.push('/');
        }
      });
  }

  return (
    <GuestLayout>
      <div className={styles.profile}>
        <div className={styles.userElements}>
          <div className={styles.left}>
            <span className={styles.type}>
              {currentUser?.type}
            </span>
            <span className={styles.name}>
              {currentUser?.name + " (" + currentUser?.username + ")"}
            </span>
            <span className={styles.city}>
              {currentUser?.city}
            </span>
            <span className={styles.email}>
              {currentUser?.email}
            </span>
            <span className={styles.verified}>
              <div className={styles.true}>
                Verified: {currentUser?.verified ? "True" : "False"}
              </div>
            </span>
            <button onClick={handleLogout}>
              LogOut
            </button>
          </div>
          <div className={styles.right}>
            <label htmlFor="file">
              {
                currentUser?.profilePic ?
                  <img src={currentUser?.profilePic} alt="Profile Picture" style={{ width: "150px", height: "150px" }} />
                  :
                  <Image
                    src={ProfileImage}
                    alt="profile"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
              }
            </label>
            <input type="file" name="file" id="file" hidden />
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}

export default withAuth(Profile)