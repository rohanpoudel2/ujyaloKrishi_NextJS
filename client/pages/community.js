import styles from "@/styles/community.module.scss"
import GuestLayout from "@/layouts/GuestLayout";
import Post from "@/components/post/Post";
import AddPost from "@/components/addPost/AddPost";

const Community = () => {

  return (
    <GuestLayout>
      <div className={styles.community}>
        <AddPost />
        <Post />
      </div>
    </GuestLayout>
  )
}

export default Community