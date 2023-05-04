import Express from "express";
import { getQuestions, addQuestion, deleteQuestion } from "../controllers/questions.js";

const router = Express.Router();

router.get('/', getQuestions);
router.post('/', addQuestion);
router.delete('/', deleteQuestion);

export default router