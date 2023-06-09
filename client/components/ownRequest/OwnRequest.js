import moment from "moment";
import styles from "./ownrequest.module.scss";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const OwnRequest = ({ request }) => {

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:8008/api/requests", {
        withCredentials: true,
        params: {
          id: request.id
        }
      }).then(() => {
        queryClient.invalidateQueries(["requests"]);
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.ownRequest}>
      <div className={styles.status}>
        Expires {moment(request.expiresAt).fromNow()}
      </div>
      <div className={styles.title}>
        {request.title}
      </div>
      <div className={styles.desc}>
        <p>
          {request.desc}
        </p>
      </div>
      <button onClick={handleDelete}>
        <i className="fa-solid fa-trash"></i> Delete
      </button>
    </div>
  )
}

export default OwnRequest