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
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Head from "next/head";

const Profile = () => {

  const { logout, currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [alert, setAlert] = useState("info");
  const [msg, setMsg] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

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
      setAlert("success");
      setMsg("An Email with verification code has been sent successfully. Please check your email.");
      handleClick({
        vertical: 'bottom',
        horizontal: 'center',
      });
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
        setAlert("success");
        setMsg("Congratulations!!, Your account is now verified.");
        handleClick({
          vertical: 'bottom',
          horizontal: 'center',
        });
      },
      onError: (err) => {
        setAlert("error");
        setMsg("Something went wrong, please try again.");
        handleClick({
          vertical: 'bottom',
          horizontal: 'center',
        });
        console.error(err);
      }
    }
  );

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <GuestLayout>
      <Head>
        <title>{currentUser.name} - Ujyalo Krishi</title>
      </Head>
      <div className={styles.profile}>
        <div className={styles.userElements}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={5000}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
          >
            <Alert onClose={handleClose} severity={"success"}>
              {msg}
            </Alert>
          </Snackbar>
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