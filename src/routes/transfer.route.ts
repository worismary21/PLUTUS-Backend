import express from 'express';
import { transferToBeneficiary, transferToInvestmentCompany, transferToSavingsWallet} from "../controllers/all_transfers/transferController";
import {trackSuccessfulTransaction, trackFailedTransaction} from '../controllers/admin/adminQueryController'
// import { DeleteTransactions } from '../controllers/admin/adminMutationController'
import { auth } from '../middleware/auth';
const router = express.Router();

router.post('/transactions', auth, transferToBeneficiary);
router.put('/savings', auth, transferToSavingsWallet);
router.post('/investment', auth, transferToInvestmentCompany)
router.get("/successfultransactions", auth, trackSuccessfulTransaction);
router.get("/failedtransactions", auth, trackFailedTransaction);

// router.delete('/delete/:id', auth, DeleteTransactions)

export default router




