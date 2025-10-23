import { Router } from "express";
import { testCall } from "../controllers/twilioController";
const router = Router();
router.get("/call", testCall);
export default router;
