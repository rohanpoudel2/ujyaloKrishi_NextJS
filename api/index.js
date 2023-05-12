import express from "express";
import env from "dotenv";

const app = express();

env.config();

import authRoutes from "./routes/auth.js";
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answers.js";
import requestRoutes from "./routes/requests.js";
import offerRoutes from "./routes/offers.js";

//middlewares
import cors from "cors";
import cookieParser from "cookie-parser";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(cookieParser());

app.use('/api/auth/', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/offers', offerRoutes);


app.listen(8008, () => {
  console.log("API RUNNING on 8008");
})

