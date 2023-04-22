import styles from "./addpost.module.scss";

const AddPost = () => {
  return (
    <div className={styles.addPost}>
      <form>
        <div className={styles.formElements}>
          <input type="text" placeholder="ENTER YOUR QUESTION HERE" name="question" />
          <textarea name="description" id="description" cols="30" rows="2" placeholder="Enter your question Description "></textarea>
        </div>
        <button>
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
    </div>
  )
}

export default AddPost