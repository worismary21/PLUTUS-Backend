import express from 'express';
import { createCompany, deleteCompany, getAllCompanies } from "../controllers/companyController";
import { loginCompany } from "../controllers/companyController";
import { auth } from '../middleware/auth';
import { isAdmin } from '../controllers/utils/auth';

const router = express.Router();

router.post('/create', isAdmin, createCompany);
router.delete('/delete/id', deleteCompany)
router.get('/get-companies', getAllCompanies)
router.post('/login', loginCompany);


export default router