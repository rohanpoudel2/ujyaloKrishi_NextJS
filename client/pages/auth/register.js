import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/signup.module.scss";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginBackground from "@/public/images/auth/login.jpeg";
import LogoSmall from "@/public/logo_small.png";
import Link from "next/link";
import { loginAccess } from "@/lib/loginAccess";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    city: "",
    type: ""
  });

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setSuccess(null);
      setErr(null);
      await axios.post("http://localhost:8008/api/auth/register", inputs);
      setSuccess(true);
    } catch (error) {
      setSuccess(null);
      setErr(error?.response?.data);
      console.error(error);
    }
  }

  return (
    <GuestLayout>
      <div className={styles.register}>
        <Image
          src={LoginBackground}
          alt="loginBackground"
        />
        <div className={styles.registerBox}>
          <Image
            src={LogoSmall}
            alt="small logo"
          />
          <h3>Sign up for Ujyalo Krishi</h3>
          <form onSubmit={handleClick}>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} required />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
            <input type="text" placeholder="Name" name="name" onChange={handleChange} required />
            <input type="text" placeholder="City" name="city" onChange={handleChange} required />
            <select name="type" id="type" onChange={handleChange} required>
              <option value="" selected disabled hidden>Choose here</option>
              <option value="farmer">Farmer</option>
              <option value="volunteer">Volunteer</option>
            </select>
            <button type="submit">Register</button>
            {err && <p className={styles.loginError}>{`*${err}`}</p>}
            {success && <p className={styles.loginSuccess}>{`User Created Successfully`}</p>}
          </form>
          <span className={styles.loginLink}>
            Already Have an Account? <Link href={"/auth/login"}>Login Here</Link>
          </span>
        </div>
      </div>
    </GuestLayout>
  )
}

export default loginAccess(Register)