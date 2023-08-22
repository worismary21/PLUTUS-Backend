import express from 'express';
import { getAllCompanies } from "../controllers/company/companyQueryController";
import { createCompany, deleteCompany } from "../controllers/company/companyMutationController";
import { auth } from '../middleware/auth';
import { isAdmin } from '../utils/auth';

const router = express.Router();

router.post('/create', isAdmin, createCompany);
router.delete('/delete/:id', isAdmin, deleteCompany)
router.get('/get-companies', isAdmin, getAllCompanies)

export default router