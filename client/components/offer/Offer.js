import styles from "./offer.module.scss";
import { makeRequest } from "@/utils/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const Offer = ({ offer }) => {

  const router = useRouter();

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

  const rejectOffer = () => {
    makeRequest.patch('/offers', {
      offerId: offer?.id,
      status: 0
    }).then(() => {
      queryClient.invalidateQueries(["offers"]);
    }).catch((err) => console.error(err))

    queryClient.invalidateQueries(["offers"]);
  }

  console.log("HELLO", offer);

  return (
    <div className={styles.offer}>
      <span>
        <strong>
          {offer?.username}
        </strong> from {offer?.city} has requested to help you on {offer?.title}
      </span>
      {
        offer?.status === 1 ?
          <>
            <span>Volunteer has been notified</span>
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
