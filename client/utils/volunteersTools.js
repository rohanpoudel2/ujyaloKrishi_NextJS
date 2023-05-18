import Volunteers from "@/public/images/tools/Help_Farmers.jpg"
import Plant from '@/public/images/tools/Plant.jpg'
import Market from '@/public/images/tools/Market.jpeg'
import News from '@/public/images/tools/News.jpeg'
import Weather from '@/public/images/tools/Weather.jpeg'

const ToolsList = [
  {
    name: "Plant Disease Detection",
    photo: Plant,
    link: "/plant"
  },
  {
    name: "Help Requests",
    photo: Volunteers,
    link: "/volunteers"
  },
  {
    name: "Marker Price",
    photo: Market,
    link: "/market"
  },
  {
    name: "News",
    photo: News,
    link: "/news"
  },
  {
    name: "Weather",
    photo: Weather,
    link: "/weather"
  },

];

export default ToolsList;