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
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      setSuccess(null);
      setErr(error.data);
      console.error(error.data);
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
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa fugit libero blanditiis architecto dolorum! Veritatis magni culpa blanditiis tempora quidem, ut praesentium aliquid necessitatibus corporis quasi, est ea sequi officia?
            </p>
            <span>Don't have an account? <Link href={'/auth/register'}>Register Here</Link></span>
          </div>
          <div className={styles.right}>
            <h1>Login</h1>
            <form>
              <input type="text" placeholder="Username" name="username" onChange={handleChange} />
              <input type="password" placeholder="Password" name="password" onChange={handleChange} />
              {err && err}
              {success && "Login Success. Please Wait 3 seconds. Now Redirecting...."}
              <button onClick={handleLogin}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}

export default Register