import express from 'express';
import { getAllCompanies } from "../controllers/company/companyQueryController";
import { loginCompany, updateCompanyProfile, createCompanyImage } from "../controllers/company/companyMutationController";
import { isAdmin } from '../utils/auth';
import { upload } from '../middleware/uploadImage';
import { createCompany, deleteCompany } from "../controllers/company/companyMutationController";
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/create', isAdmin, createCompany);
router.delete('/delete/:id', isAdmin, deleteCompany)
router.get('/get-companies', isAdmin, getAllCompanies)
router.post('/login', loginCompany);
router.put('/updateProfile', updateCompanyProfile);

router.put('/profileImage', upload.single('image'), createCompanyImage)

export default router