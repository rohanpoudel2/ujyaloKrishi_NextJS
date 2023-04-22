import Express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = Express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;