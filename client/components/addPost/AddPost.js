import styles from "./addpost.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useState } from "react";

const AddPost = () => {

  const [desc, setDesc] = useState('');
  const [question, setQuestion] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newQuestion) => {
      return makeRequest.post("/questions", newQuestion);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["questions"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ question, desc });
    setQuestion("");
    setDesc("");
  }

  return (
    <div className={styles.addPost}>
      <form>
        <div className={styles.formElements}>
          <input type="text" placeholder="ENTER YOUR QUESTION HERE" name="question" onChange={e => setQuestion(e.target.value)} value={question} />
          <textarea name="description" id="description" cols="30" rows="2" placeholder="Enter your question Description" onChange={e => setDesc(e.target.value)} value={desc}></textarea>
        </div>
        <button onClick={handleClick}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
    </div>
  )
}

export default AddPost