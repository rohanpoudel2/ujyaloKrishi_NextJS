import styles from "./post.module.scss";
import { useState } from "react";
import moment from "moment";
import { makeRequest } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    try {
      mutation.mutate({ answer, questionId: question.id });
    } catch (error) {
      console.error(error);
    }
    setAnswer("");
  }

  console.log(data)

  console.log("question id" + question.id)

  return (
    <div className={styles.post}>
      <span className={styles.askedDate}>
        Asked At: {moment(question.createdAt).fromNow()}
      </span>
      <div className={styles.question}>
        <h2 className={styles.title}>
          {question.question}
        </h2>
        <p className={styles.description}>
          {question.desc}
        </p>
      </div>
      <div className={styles.info}>
        <span>Asked By</span>
        <span>{question.name}</span>
        <span>{question.city}</span>
      </div>
      <button className={styles.answersButton} onClick={() => setShowComment(!showComment)}>
        View Answers
      </button>
      {
        showComment && (
          error ?
            "Something Went Wrong. Please try again"
            :
            isLoading ?
              "Loading ..."
              :
              <div className={styles.answers}>
                <form>
                  <textarea name="answer" placeholder="Answer this Question" id="answer" cols="90" rows="2" value={answer} onChange={e => setAnswer(e.target.value)}></textarea>
                  <button type="submit" onClick={handleClick}>
                    Answer
                  </button>
                </form>
                <ul>
                  {data.map((answer) => (
                    <li key={answer.id}>
                      <div className={styles.user}>
                        {answer.name}
                      </div>
                      <div className={styles.answer}>
                        {answer.desc}
                      </div>
                      <div className={styles.createdAt}>
                        {answer.answeredAt}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>)
      }

    </div>
  )
}

export default Post