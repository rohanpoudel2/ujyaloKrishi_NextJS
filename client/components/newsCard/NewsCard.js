import styles from './newscard.module.scss';
import Link from 'next/link';

const NewsCard = ({ data }) => {
  return (
    <Link href={data.link} target='_blank'>
      <div className={styles.newscard}>
        <img src={data.image} alt="newsImage" />
        <h2>{data.title}</h2>
      </div>
    </Link>
  )
}

export default NewsCard