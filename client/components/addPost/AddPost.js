import styles from "./addpost.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useState } from "react";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AuthContext } from "@/context/AuthContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddPost = () => {

  const [desc, setDesc] = useState('');
  const [question, setQuestion] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newQuestion) => {
      return makeRequest.post("/questions", newQuestion);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["questions"]);
        setShowAlert(true);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ question, desc });
    setQuestion("");
    setDesc("");
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert(false);
  };

  const { currentUser } = React.useContext(AuthContext);

  return (
    <div className={styles.addPost}>
      <span>
        {`What do you want to ask ${currentUser.name}?`}
      </span>
      <form onSubmit={handleClick} data-theme="dark">
        <div className={styles.formElements}>
          <input type="text" placeholder="ENTER YOUR QUESTION TITLE HERE" name="question" onChange={e => setQuestion(e.target.value)} value={question} required />
          <textarea name="description" id="description" cols="30" rows="2" placeholder="ENTER YOUR QUESTION DESCRIPTION" onChange={e => setDesc(e.target.value)} value={desc} required></textarea>
        </div>
        <button type="submit">
          <i class="fa-solid fa-pencil"></i>
          Ask
        </button>
      </form>
      {
        showAlert && (
          <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Question has been asked Successfully
              </Alert>
            </Snackbar>
          </>
        )
      }
    </div>
  )
}

export default AddPost