import Express from "express";
import { getRequests, addRequest, deleteRequest } from "../controllers/requests.js";

const router = Express.Router();

router.get("/", getRequests);
router.post("/", addRequest);
router.delete("/", deleteRequest);

export default router