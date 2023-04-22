import express from "express";
const app = express();

import authRoutes from "./routes/auth.js";
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answers.js";

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


app.listen(8008, () => {
  console.log("API RUNNING on 8008");
})

