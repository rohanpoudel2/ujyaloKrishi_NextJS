import GuestLayout from '@/layouts/GuestLayout'
import styles from '@/styles/volunteers.module.scss'
import Request from '@/components/request/Request'
import { withAuth } from "@/lib/withAuth";
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import FarmerRequest from '@/lib/farmerRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '@/utils/axios';

const Volunteers = () => {

  const [inputs, setInputs] = useState({
    title: "",
    desc: ""
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newRequest) => {
      return makeRequest.post('/requests', newRequest);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["requests"]);
      },
    }
  );

  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate(inputs);
    setInputs({
      title: "",
      desc: ""
    });
  }

  return (
    <>
      <GuestLayout>
        <div className={styles.volunteers}>
          {currentUser?.type !== "farmer" ?
            <>
              <div className={styles.topBar}>
                <h1 className={styles.intro}>
                  Help Farmers in Need ...
                </h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className={styles.requests}>
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
                <Request />
              </div>
            </>
            :
            <>
              <form className={styles.requestForm}>
                <input type="text" name="title" placeholder='Help Request Title' onChange={handleChange} />
                <textarea name="desc" id="desc" cols="30" rows="2" placeholder='Help Request Definition' onChange={handleChange}></textarea>
                <button onClick={handleClick}>
                  <i className="fa-solid fa-hand-holding-hand"></i>
                </button>
              </form>
              <FarmerRequest />
            </>
          }

        </div>
      </GuestLayout>

    </>
  )
}

export default withAuth(Volunteers)