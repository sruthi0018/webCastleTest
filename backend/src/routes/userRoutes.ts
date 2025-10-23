import { Router } from "express";
import { getMe, savePhone } from "../controllers/userController";
import { requireAuth } from "../middleware/authMiddleware";
const router = Router();
router.get("/me", requireAuth, getMe);
router.post("/phone", requireAuth, savePhone);
export default router;
