import styles from "@/styles/community.module.scss"
import GuestLayout from "@/layouts/GuestLayout";
import Post from "@/components/post/Post";
import AddPost from "@/components/addPost/AddPost";
import { withAuth } from "@/lib/withAuth";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";

const Community = () => {

  const { isLoading, error, data } = useQuery(['questions'], () =>
    makeRequest.get('/questions').then((res) => {
      return res.data;
    })
  );

  console.log(data)

  return (
    <GuestLayout>
      <div className={styles.community}>
        <AddPost />
        <div className={styles.posts}>
          {
            error ? "OOPS!!! Something Went Wrong."
              :
              (isLoading ? "Loading..."
                :
                data.map((question) => (
                  <Post key={question.id} question={question} />
                ))
              )
          }
        </div>
      </div>
    </GuestLayout>
  )
}

export default withAuth(Community)