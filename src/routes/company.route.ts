import express from 'express';
import { createCompany } from "../controllers/companyController";
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/create', createCompany);




export default router