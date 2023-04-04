import styles from './signup.module.scss';
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from 'next/image';
import Farmer from '@/public/images/auth/Farmer.png'

const Signup = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className={styles.top}>
        <Image
          src={Farmer}
          alt="FarmerIcon"
          width={200}
          height={200}
        />
        <span>Hello Dear,
          {showLogin ? "Login Here" : "SignUp Here"}</span>
      </div>
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} className={styles.form}>
        {
          showLogin ?
            <>
              <input {...register("email", { required: true })} type='email' placeholder='Email' />
              {errors.email && <span className={styles.formError}>*Your Email is required</span>}
              <input {...register("password", { required: true }, { min: 8 })} type='password' placeholder='Password' />
              {errors.password && <span className={styles.formError}>*Password is required</span>}
              <span className={styles.loginLink}>
                Don't have an Account ? <span onClick={() => setShowLogin(false)} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>SignUp</span>
              </span>
            </>
            :
            <>
              <input {...register("name", { required: true })} type='text' placeholder='Name' />
              {errors.name && <span className={styles.formError}>*Your Name is required</span>}
              <input {...register("email", { required: true })} type='email' placeholder='Email' />
              {errors.email && <span className={styles.formError}>*Your Email is required</span>}
              <input {...register("phone", { required: true })} type='number' placeholder='Phone Number' />
              {errors.phone && <span className={styles.formError}>*Your Phone is required</span>}
              <input {...register("password", { required: true }, { min: 8 })} type='password' placeholder='Password' />
              {errors.password && <span className={styles.formError}>*Password is required</span>}
              <span className={styles.loginLink}>
                Already Have an Account <span onClick={() => setShowLogin(true)} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Login</span>
              </span>
            </>
        }
        <p>{data}</p>
        <button type='submit'>
          {showLogin ? "Login" : "SignUp"}
        </button>
      </form>
    </>

  )
}

export default Signup