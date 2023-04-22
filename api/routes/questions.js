import Express from "express";
import { getQuestions, addQuestion } from "../controllers/questions.js";

const router = Express.Router();

router.get('/', getQuestions);
router.post('/', addQuestion);

export default router