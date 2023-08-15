import express from 'express';
import { createCompany, deleteCompany, getAllCompanies } from "../controllers/companyController";
import { loginCompany } from "../controllers/companyController";
import { auth } from '../middleware/auth';
import { isAdmin } from '../controllers/utils/auth';

const router = express.Router();

router.post('/create', isAdmin, createCompany);
router.delete('/delete/:id', isAdmin, deleteCompany)
router.get('/get-companies', isAdmin, getAllCompanies)
router.post('/login', loginCompany);


export default router