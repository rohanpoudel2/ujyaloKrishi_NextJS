import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/login.module.scss";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import LogoSmall from "@/public/logo_small.png";
import LoginBackground from "@/public/images/auth/login.jpeg";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [countdown, setCountdown] = useState(3);

  const router = useRouter();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setSuccess(null);
      await login(inputs);
      setSuccess(true);
      const intervalId = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
        router.push('/');
      }, 3000);
    } catch (error) {
      setSuccess(null);
      setErr(error?.response?.data);
      console.error(error);
    }
  };

  return (
    <GuestLayout>
      <div className={styles.login}>
        <Image
          src={LoginBackground}
          alt="loginBackground"
        />
        <div className={styles.loginCard}>
          <Image
            src={LogoSmall}
            alt="small logo"
          />
          <h3>Log in to Ujyalo Krishi</h3>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} required />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
            <button type="submit">Login</button>
            {err && <p className={styles.loginError}>{`*${err}`}</p>}
            {success && <p className={styles.loginSuccess}>{`Login Success. Please Wait ${countdown} seconds. Now Redirecting....`}</p>}
          </form>
          <span>Not a member of Ujyalo Krishi? <Link href={'/auth/register'}>Register Here</Link></span>
        </div>
      </div>
    </GuestLayout>
  )
}

export default Register
