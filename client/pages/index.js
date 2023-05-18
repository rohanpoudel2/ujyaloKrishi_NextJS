import GuestLayout from '@/layouts/GuestLayout'
import styles from '@/styles/Home.module.scss'
import Tool from '@/components/tools/Tool'
import farmersTools from '@/utils/farmersTools'
import volunteersTools from "@/utils/volunteersTools"

import { withAuth } from '@/lib/withAuth'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'

const Index = () => {

  const [tools, setTools] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?.type === "farmer") setTools(farmersTools);
    else setTools(volunteersTools);
  }, [])

  return (
    <>
      <GuestLayout>
        <div className={styles.welcomeText}>
          <h2>Welcome to Ujyalo Krishi</h2>
          <span>Look around and explore various tools that are available.</span>
        </div>
        <div className={styles.tools}>
          {tools.map((tool, index) => {
            return <Tool tool={tool} key={index} />
          })}
        </div>
      </GuestLayout>
    </>
  )
}

export default withAuth(Index)