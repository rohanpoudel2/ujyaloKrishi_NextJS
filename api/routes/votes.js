import Express from "express";
import { getVotes, addVote, deleteVote } from "../controllers/votes.js";

const router = Express.Router();

router.get("/", getVotes);
router.post("/", addVote);
router.delete("/", deleteVote);

export default router;