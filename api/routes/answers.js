import Express from "express";
import { getAnswers, addAnswer } from "../controllers/answers.js";

const router = Express.Router();

router.get("/", getAnswers);
router.post("/", addAnswer);

export default router;