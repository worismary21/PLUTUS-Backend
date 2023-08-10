import express from 'express';
import { transferToBeneficiary, transferToInvestmentCompany, transferToSavingsWallet} from "../controllers/transferControllers";
import { auth } from '../middleware/auth';
const router = express.Router();

router.post('/transactions', auth, transferToBeneficiary);
router.put('/savings', auth, transferToSavingsWallet);
router.post('/investment', auth, transferToInvestmentCompany)




export default router


