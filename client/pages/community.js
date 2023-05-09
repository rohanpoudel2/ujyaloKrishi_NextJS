import styles from "@/styles/community.module.scss"
import GuestLayout from "@/layouts/GuestLayout";
import Post from "@/components/post/Post";
import AddPost from "@/components/addPost/AddPost";
import { withAuth } from "@/lib/withAuth";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Community = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    } else if (currentUser.type !== "farmer") {
      router.push("/");
    } else {
      setIsLoadingUser(false);
    }
  }, [currentUser]);

  const { isLoading, error, data } = useQuery(['questions'], () =>
    makeRequest.get('/questions').then((res) => {
      return res.data;
    })
  );

  console.log(data)

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <GuestLayout>
      <div className={styles.community}>
        <AddPost />
        <h3 className={styles.title}>
          Recent Questions
        </h3>
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

export default withAuth(Community);
