import { AuthContext } from "@/context/AuthContext";
import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/profile.module.scss";
import { useContext } from "react";
import { withAuth } from "@/lib/withAuth";

const Profile = () => {

  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout()
      .then(() => {
        router.push('/');
      });
  }

  return (
    <GuestLayout>
      <div className={styles.profile}>
        <button onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </GuestLayout>
  )
}

export default withAuth(Profile)