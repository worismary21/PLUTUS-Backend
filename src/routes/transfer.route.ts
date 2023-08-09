import express from 'express';
import { transferToBeneficiary} from "../controllers/transferControllers";
import { auth } from '../middleware/auth';
const router = express.Router();

router.post('/transactions', auth, transferToBeneficiary);



export default router


