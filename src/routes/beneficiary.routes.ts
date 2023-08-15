import express from 'express';
import { createBeneficiaries, deleteBeneficiary, getBeneficiaries } from "../controllers/beneficiary";
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/get', auth, getBeneficiaries);
router.post('/create', auth, createBeneficiaries);
router.delete('/delete', auth, deleteBeneficiary);



export default router
