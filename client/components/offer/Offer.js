import styles from "./offer.module.scss";
import { makeRequest } from "@/utils/axios";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Offer = ({ offer }) => {

  const queryClient = useQueryClient();

  const acceptOffer = () => {
    makeRequest.patch('/offers', {
      offerId: offer?.id,
      status: 1
    }).then(
      () => {
        queryClient.invalidateQueries(["offers"]);
      }
    ).catch((err) => console.error(err))

  }

  const rejectOffer = async () => {
    try {
      await axios.delete("http://localhost:8008/api/offers", {
        withCredentials: true,
        params: {
          id: offer.id
        }
      }).then(() => {
        queryClient.invalidateQueries(["offers"]);
      })
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className={styles.offer}>
      <span>
        {
          offer?.status === 1 ?
            <>
              Accepted Request for {offer.title}
            </>
            :
            <>
              <strong>
                {offer?.name}
              </strong> from {offer?.city} has requested to help you on {offer?.title}
            </>
        }
      </span>
      {
        offer?.status === 1 ?
          <>
            <br />
            <span className={styles.accepted}>{offer?.name} has been Notified 👌</span>
          </>
          :
          <div className={styles.buttons}>
            <button onClick={acceptOffer}>
              Accept
            </button>
            <button onClick={rejectOffer}>
              Reject
            </button>
          </div>
      }

    </div>
  )
}

export default Offer
