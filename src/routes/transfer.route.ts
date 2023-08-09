import express from "express";
import { transferToBeneficiary } from "../controllers/transferControllers";
import { auth } from "../middleware/auth";
import {
  trackFailedTransaction,
  trackSuccessfulTransaction,
} from "../controllers/userss";
const router = express.Router();

router.post("/transactions", auth, transferToBeneficiary);

router.get("/successfultransactions", auth, trackSuccessfulTransaction);
router.get("/failedtransactions", auth, trackFailedTransaction);

export default router;
