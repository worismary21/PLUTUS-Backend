import express from 'express';
import { transferToBeneficiary, transferToInvestmentCompany, transferToSavingsWallet} from "../controllers/transferControllers";
import {trackSuccessfulTransaction, trackFailedTransaction} from '../controllers/userss'
import { auth } from '../middleware/auth';
const router = express.Router();

router.post('/transactions', auth, transferToBeneficiary);
router.put('/savings', auth, transferToSavingsWallet);
router.post('/investment', auth, transferToInvestmentCompany)
router.get("/successfultransactions", auth, trackSuccessfulTransaction);
router.get("/failedtransactions", auth, trackFailedTransaction);


export default router




