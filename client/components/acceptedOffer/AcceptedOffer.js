import styles from "./acceptedOffers.module.scss";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const AcceptedOffer = ({ data }) => {

  const [showContact, setShowContact] = useState(false);

  const queryClient = useQueryClient();

  const rejectOffer = async () => {
    try {
      await axios.delete("http://localhost:8008/api/offers", {
        withCredentials: true,
        params: {
          id: data.id
        }
      }).then(() => {
        queryClient.invalidateQueries(["acceptedOffers"]);
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.accepted}>
      <div className={styles.left}>
        <span>Congratulations!!, Your offer to help on <span style={{ fontWeight: "bold" }}>{data.title}</span> has been accepted. Please contact <span style={{ fontWeight: "bold" }}>{data.name}</span> to discuss further plans.</span>
        <button onClick={() => setShowContact(!showContact)}>
          View {data.name}'s Contact Details
        </button>
        {showContact &&
          <>
            <div className={styles.contactDetails}>
              <span>Name: {data.name}</span>
              <span>Email: {data.email}</span>
            </div>
          </>
        }
      </div>
      {/* <div className={styles.right}>
        <button onClick={() => rejectOffer()}>
          ❌
        </button>
      </div> */}
    </div>
  )
}

export default AcceptedOffer