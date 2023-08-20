import express from 'express';
import { createCompany, loginCompany } from "../controllers/companyController";
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/create', createCompany);
router.post('/login', loginCompany);


export default router