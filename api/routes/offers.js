import Express from "express";
import { getOffers, makeOffer, deleteOffer, responseOffer, getOfferStatus } from "../controllers/offers.js";

const router = Express.Router();

router.get("/", getOffers);
router.get("/status", getOfferStatus)
router.post("/", makeOffer);
router.patch("/", responseOffer);
router.delete("/", deleteOffer);

export default router;