import GuestLayout from "@/layouts/GuestLayout";
import { withAuth } from "@/lib/withAuth";
import styles from "@/styles/weather.module.scss";
import Image from "next/image";
import WeatherImage from "@/public/images/weather/weather.jpeg"
import axios from "axios";
import { useState } from "react";


const Weather = () => {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [tempData, setTempData] = useState();

  const getWeather = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},Nepal&APPID=${process.env.NEXT_PUBLIC_WEATHER_API}&units=metric`);
      setWeatherData(data?.data.weather[0])
      setTempData(data?.data.main)
      console.log(data)
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <GuestLayout>
      <div className={styles.weather}>
        <Image
          src={WeatherImage}
          alt="weatherNepal"
        />
        <form data-theme="dark">
          <div className={styles.info}>
            <h1>Get The Weather</h1>
            <span>Enter a city, and get the weather below!</span>
          </div>
          <input type="text" placeholder="Example: kathmandu" onChange={(e) => setCity(e.target.value)} value={city} />
          <button onClick={getWeather}>Get Weather</button>
          <div className={styles.weatherInfo}>
            {
              (weatherData && tempData) &&
              <>
                <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="weathericon" />
                <span>
                  <br />
                  <strong>
                    Conditions:
                  </strong>
                  {weatherData.main}
                </span>
                <span>
                  <strong>
                    Descriptions:
                  </strong>
                  {weatherData.description}
                </span>
                <span>
                  <strong>
                    Temp:
                  </strong>
                  {tempData?.temp} °C <br />
                </span>
                <span>
                  <strong>
                    Max Temp:
                  </strong>
                  {tempData?.temp_max} °C <br />
                </span>
                <span>
                  <strong>
                    Min Temp:
                  </strong>
                  {tempData?.temp_min} °C <br />
                </span>
                <span>
                  <strong>
                    Feels Like:
                  </strong>
                  {tempData?.feels_like} °C
                </span>
              </>
            }
          </div>
        </form>
      </div>
    </GuestLayout>
  )
}

export default withAuth(Weather)