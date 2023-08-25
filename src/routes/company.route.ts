import express from 'express';
import { getAllCompanies, getCompanyInfo  } from "../controllers/company/companyQueryController";
import { loginCompany, updateCompanyProfile, createCompanyImage } from "../controllers/company/companyMutationController";
import { isAdmin } from '../utils/auth';
import { upload } from '../middleware/uploadImage';
import { createCompany, deleteCompany } from "../controllers/company/companyMutationController";
import { auth, companyAuth } from '../middleware/auth';

const router = express.Router();

router.post('/create', isAdmin, createCompany);
router.delete('/delete/:id', isAdmin, deleteCompany)
router.get('/get-companies', isAdmin, getAllCompanies)
router.post('/login', loginCompany);
router.put('/updateProfile', updateCompanyProfile);
router.get('/getCompanyInfo', getCompanyInfo )

router.put('/profileImage', companyAuth, upload.single('image'), createCompanyImage)

export default router