import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/signup.module.scss";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginImage from "@/public/images/heroimages/hero.jpeg"
import Link from "next/link";

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
      setErr(error.response.data);
      console.error(error.response.data);
    }
  }

  return (
    <GuestLayout>
      <div className={styles.register}>
        <div className={styles.registerBox}>
          <div className={styles.picture}>
            <Image
              src={LoginImage}
              alt="LoginImage"
            />
          </div>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <input type="text" placeholder="Name" name="name" onChange={handleChange} />
            <input type="text" placeholder="City" name="city" onChange={handleChange} />
            <select name="type" id="type" onChange={handleChange}>
              <option value="" selected disabled hidden>Choose here</option>
              <option value="farmer">Farmer</option>
              <option value="volunteer">Volunteer</option>
            </select>
            {err && err}
            {success && "User Created Successfully"}
            <button onClick={handleClick}>Register</button>
            <span className={styles.loginLink}>
              Already Have an Account? <Link href={"/auth/login"}>Login Here</Link>
            </span>
          </form>
        </div>
      </div>
    </GuestLayout>
  )
}

export default Register