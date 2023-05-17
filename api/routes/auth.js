import Express from "express";
import { register, login, logout, verify, confirm } from "../controllers/auth.js";

const router = Express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify", verify);
router.post("/confirm", confirm);

export default router;