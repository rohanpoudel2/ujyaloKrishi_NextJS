import Express from "express";
import { getAnswers, addAnswer, deleteAnswer } from "../controllers/answers.js";

const router = Express.Router();

router.get("/", getAnswers);
router.post("/", addAnswer);
router.delete('/', deleteAnswer);

export default router;