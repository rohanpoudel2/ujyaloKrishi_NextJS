import styles from "./acceptedOffers.module.scss";
import { useState } from "react";

const AcceptedOffer = ({ data }) => {

  const [showContact, setShowContact] = useState(false);

  return (
    <div className={styles.accepted}>
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
  )
}

export default AcceptedOffer