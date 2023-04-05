import NewsCard from '@/components/newsCard/NewsCard';
import GuestLayout from '@/layouts/GuestLayout';
import styles from '@/styles/news.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

const News = () => {

  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, [])

  const getNews = async () => {
    const NewsData = await axios.get('http://localhost:3000/api/news');
    setNews(NewsData.data);
  }

  return (
    <GuestLayout>
      <div className={styles.news}>
        <div className={styles.topbar}>
          <h1>Maintain an ongoing awareness of developments in the agricultural sector of Nepal</h1>
        </div>
        <div className={styles.newsCards}>
          {news?.map((news, index) =>
          (
            <NewsCard key={index} data={news} />
          )
          )}
        </div>
      </div>
    </GuestLayout>
  )
}

export default News

