import styles from "./post.module.scss";
import { useState } from "react";

const Post = () => {

  const [showComment, setShowComment] = useState(false);

  return (
    <div className={styles.post}>
      <div className={styles.question}>
        <h2 className={styles.title}>
          How to Plant Tomato in Winter Season ?
        </h2>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className={styles.info}>
        <span>Asked By</span>
        <span>Rohan Poudel</span>
        <span>Syangja, Putalibazar</span>
      </div>
      <button className={styles.answersButton} onClick={() => setShowComment(!showComment)}>
        View Answers
      </button>
      {
        showComment && (
          <div className={styles.answers}>
            <ul>
              <li>
                <div className={styles.user}>
                  Gohan Poudel
                </div>
                <div className={styles.answer}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </li>
            </ul>
          </div>
        )
      }

    </div>
  )
}

export default Post