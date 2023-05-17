import { AuthContext } from "@/context/AuthContext";
import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/profile.module.scss";
import { useContext, useEffect, useState } from "react";
import { withAuth } from "@/lib/withAuth";
import Image from "next/image";
import ProfileImage from "@/public/images/profile/default.png"
import { useRouter } from "next/router";
import { makeRequest } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Profile = () => {

  const { logout, currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [showCode, setShowCode] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    await logout()
      .then(() => {
        if (typeof window !== "undefined") {
          router.push('/');
        }
      });
  }

  useEffect(() => {
    if (profile !== null) {
      uploadPic(profile);
    }
  }, [profile])

  const uploadPic = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);

      mutation.mutate({ profilePic: res.data });
      setProfile(null);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      }
    }
  );

  const { isLoading, error, data } = useQuery(['user'], () =>
    makeRequest.get('/users').then((res) => {
      return res.data;
    })
  );

  const verifyEmail = () => {
    makeRequest.post('/auth/verify').then(() => {
      setShowCode(!showCode);
      queryClient.invalidateQueries(["user"]);
      console.log("Email Sent");
    }).catch((err) => console.error(err));
  }

  const verify = (e) => {
    e.preventDefault();
    verifyMutator.mutate({ token: data?.verificationToken });
  }

  const verifyMutator = useMutation(
    (token) => {
      return makeRequest.post('/auth/confirm', token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      }
    }
  );

  return (
    <GuestLayout>
      <div className={styles.profile}>
        <div className={styles.userElements}>
          <div className={styles.left}>
            <span className={styles.type}>
              {data?.type}
            </span>
            <span className={styles.name}>
              {data?.name + " (" + data?.username + ")"}
            </span>
            <span className={styles.city}>
              {data?.city}
            </span>
            <span className={styles.email}>
              {data?.email}
            </span>
            <span className={styles.verified}>
              <div className={styles.true}>
                Verified: {data?.verified ? "True" : "False"}
              </div>
              {
                data?.verified ? "" :
                  <>
                    <button onClick={verifyEmail}>
                      Verify Account
                    </button>
                    {
                      showCode && <form onSubmit={verify}>
                        <input type="text" placeholder="Enter your Verification Code" required />
                        <button type="submit">Verify</button>
                      </form>
                    }

                  </>
              }

            </span>
            <button onClick={handleLogout}>
              LogOut
            </button>
          </div>
          <div className={styles.right}>
            <form>
              <label htmlFor="file">
                {
                  profile ?
                    <img src={URL.createObjectURL(profile)} alt="Profile Pic" style={{ width: "150px", height: "150px" }} />
                    :
                    data?.profilePic !== null ?
                      <img src={`./upload/${data?.profilePic}`} alt="Profile Picture" style={{ width: "150px", height: "150px" }} />
                      :
                      <Image
                        src={ProfileImage}
                        alt="profile"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                }
              </label>
              <input onChange={(e) => setProfile(e.target.files[0])} type="file" name="file" id="file" hidden />
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}

export default withAuth(Profile)