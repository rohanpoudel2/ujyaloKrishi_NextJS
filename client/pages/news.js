import NewsCard from "@/components/newsCard/NewsCard";
import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/news.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { withAuth } from "@/lib/withAuth";
import Head from "next/head";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    setLoading(true);
    const cachedData = localStorage.getItem("newsData");
    const isFresh =
      cachedData &&
      JSON.parse(cachedData).timestamp + 60 * 60 * 1000 > Date.now();

    if (isFresh) {
      console.log("Serving from cache...");
      setNews(JSON.parse(cachedData).data);
    } else {
      try {
        const response = await axios.get("http://localhost:3000/api/news");
        const newsData = response.data;
        setNews(newsData);

        localStorage.setItem(
          "newsData",
          JSON.stringify({ data: newsData, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <GuestLayout>
        <Head>
          <title>News - Ujyalo Krishi</title>
        </Head>
        <div className={styles.news}>
          {
            loading ?
              <span>Loading... Please wait...</span>
              :
              <>
                <div className={styles.topbar}>
                  <h1>
                    Maintain an ongoing awareness of developments in the agricultural
                    sector of Nepal
                  </h1>
                </div>
                <div className={styles.newsCards}>
                  {news?.map((news, index) => (
                    <NewsCard key={index} data={news} />
                  ))}
                </div>
              </>
          }
        </div>
      </GuestLayout>
    </>
  );
};

export default withAuth(News);
