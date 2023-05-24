import { useContext } from "react"
import styles from "./answer.module.scss"
import moment from "moment"
import { AuthContext } from "@/context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";

const Answers = ({ answer, deleteAnswer }) => {

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["votes", answer.id], () =>
    makeRequest.get("/votes?id=" + answer.id).then((res) => {
      return res.data;
    })
  );

  const mutation = useMutation(
    (newVote) => {
      return makeRequest.post("/votes", newVote);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["votes"]);
        queryClient.invalidateQueries(["answers"]);
      }
    }
  )

  const makeVote = async () => {
    try {
      mutation.mutate({ answerId: answer.id });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li className={styles.abc}>
      <div className={styles.upvote}>
        <i className="fa-solid fa-up-long" style={{ color: "#008037" }} onClick={makeVote}></i>
        {!isLoading && data[0]?.vote_count}
      </div>
      <div className={styles.component}>
        <div className={styles.ans}>
          <div className={styles.user}>
            {answer.name}
          </div>
          <div className={styles.answer}>
            {answer.desc}
          </div>
          <div className={styles.createdAt}>
            {
              moment(answer.answeredAt).fromNow()
            }
          </div>
        </div>
        {
          answer.userId === currentUser.id ? <button onClick={() => deleteAnswer(answer.id)} className={styles.deleteButton}><i className="fa-solid fa-xmark"></i> Delete Answer</button> : ""
        }
      </div>
    </li>
  )
}

export default Answers