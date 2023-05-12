import GuestLayout from '@/layouts/GuestLayout'
import styles from '@/styles/Home.module.scss'
import Tool from '@/components/tools/Tool'
import ToolsList from '@/utils/tools'
import { withAuth } from '@/lib/withAuth'

const Index = () => {

  return (
    <>
      <GuestLayout>
        <div className={styles.welcomeText}>
          <h2>Welcome to Ujyalo Krishi</h2>
          <span>Look around and explore various tools that are available.</span>
        </div>
        <div className={styles.tools}>
          {ToolsList.map((tool, index) => {
            return <Tool tool={tool} key={index} />
          })}
        </div>
      </GuestLayout>
    </>
  )
}

export default withAuth(Index)