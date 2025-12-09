import { Router } from "express";
import {
  checkSymptoms,
  getHistory,
} from "../controllers/symptomController.js";

const router = Router();

router.post("/check", checkSymptoms);
router.get("/history", getHistory);

export default router;
