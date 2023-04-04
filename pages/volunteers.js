import GuestLayout from '@/layouts/GuestLayout'
import styles from '@/styles/volunteers.module.scss'
import Request from '@/components/request/Request'

const Volunteers = () => {
  return (
    <GuestLayout>
      <div className={styles.volunteers}>
        <div className={styles.topBar}>
          <h1 className={styles.intro}>
            Help Farmers in Need ...
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className={styles.requests}>
          <Request />
          <Request />
          <Request />
          <Request />
          <Request />
          <Request />
        </div>
      </div>
    </GuestLayout>
  )
}

export default Volunteers