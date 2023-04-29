import Express from "express";
import { getRequests, addRequest, deleteRequest, getAllRequests } from "../controllers/requests.js";

const router = Express.Router();

router.get("/", getRequests);
router.get("/all", getAllRequests)
router.post("/", addRequest);
router.delete("/", deleteRequest);

export default router