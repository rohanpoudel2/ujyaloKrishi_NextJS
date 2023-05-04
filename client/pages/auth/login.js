import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/login.module.scss";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

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
      setErr(error.response.data);
      console.error(error.response.data);
    }
  };

  return (
    <GuestLayout>
      <div className={styles.login}>
        <div className={styles.loginCard}>
          <div className={styles.left}>
            <h1>
              Hello Dear, You can Sign in Here.
            </h1>
            <span>Don't have an account? <Link href={'/auth/register'}>Register Here</Link></span>
          </div>
          <div className={styles.right}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <input type="text" placeholder="Username" name="username" onChange={handleChange} required />
              <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
              {err && <p className={styles.loginError}>{`*${err}`}</p>}
              {success && <p className={styles.loginSuccess}>{`Login Success. Please Wait ${countdown} seconds. Now Redirecting....`}</p>}
              <button type="submit">Login</button>
              <span>Don't have an account? <Link href={'/auth/register'}>Register Here</Link></span>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}

export default Register
