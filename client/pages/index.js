import GuestLayout from '@/layouts/GuestLayout'
import styles from '@/styles/Home.module.scss'
import Hero from '@/components/hero/Hero'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import Tool from '@/components/tools/Tool'
import ToolsList from '@/utils/tools'
import { withAuth } from '@/lib/withAuth'

const Index = () => {

  return (
    <>
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={true}
        modules={[Autoplay, Pagination]}
        className={styles.mySwiper}
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
      </Swiper>
      <GuestLayout>
        <h1 className={styles.mainHeading}>
          Our Tools
        </h1>
        <p className={styles.mainDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quis aperiam recusandae odit, blanditiis ratione ipsum officia, earum vel iusto, consequatur voluptatem quae rem reiciendis a esse praesentium exercitationem! Placeat.
        </p>
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