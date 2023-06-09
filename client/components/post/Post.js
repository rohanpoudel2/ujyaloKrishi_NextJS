import styles from "./post.module.scss";
import { useContext, useState } from "react";
import moment from "moment";
import { makeRequest } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/context/AuthContext";
import Answers from "../answers/Answers";
import axios from "axios";

const Post = ({ question }) => {

  const [showComment, setShowComment] = useState(false);
  const [answer, setAnswer] = useState('');

  const { isLoading, error, data } = useQuery(["answers", question.id], () =>
    makeRequest.get("/answers?questionId=" + question.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newAnswer) => {
      return makeRequest.post("/answers", newAnswer);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["answers"]);
      },
    },
  );

  const handleClick = async (e) => {
    e.preventDefault();
    if (answer.length === 0) {
      return "";
    }
    try {
      mutation.mutate({ answer, questionId: question.id });
    } catch (error) {
      console.error(error);
    }
    setAnswer("");
  }

  const { currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:8008/api/questions", {
        withCredentials: true,
        params: {
          id: question.id
        }
      }).then(() => {
        queryClient.invalidateQueries(["questions"]);
      })
    } catch (error) {
      console.error(error);
    }
  }

  const deleteAnswer = async (id) => {
    try {
      await axios.delete("http://localhost:8008/api/answers", {
        withCredentials: true,
        params: {
          id
        }
      }).then(() => {
        queryClient.invalidateQueries(["answers"]);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.post}>
      <span className={styles.askedDate}>
        Asked {moment(question.createdAt).fromNow()} by {question.name} from {question.city}
      </span>
      <div className={styles.question}>
        <h2 className={styles.title}>
          {question.question}
        </h2>
        <p className={styles.description}>
          {question.desc}
        </p>
      </div>
      <div className={styles.btns} data-theme="dark">
        <button className={styles.answersButton} onClick={() => setShowComment(!showComment)}>
          View Answers
        </button>
        {
          question.userId === currentUser.id ? <button onClick={handleDelete} className={styles.deleteButton}><i className="fa-solid fa-xmark"></i> Delete Question
          </button> :
            ""
        }
      </div>

      {
        showComment && (
          error ?
            "Something Went Wrong. Please try again"
            :
            isLoading ?
              "Loading ..."
              :
              <div className={styles.answers}>
                <span className={styles.first_text}>Answer this Question</span>
                <form onSubmit={handleClick} data-theme="dark">
                  <textarea name="answer" placeholder="Your Answer" id="answer" cols="90" rows="2" value={answer} onChange={e => setAnswer(e.target.value)} required></textarea>
                  <button type="submit" >
                    Answer
                  </button>
                </form>
                <ul>
                  {data.map((answer, index) => (
                    <Answers key={index} answer={answer} deleteAnswer={deleteAnswer} />
                  ))}
                </ul>
              </div>)
      }

    </div>
  )
}

export default Post