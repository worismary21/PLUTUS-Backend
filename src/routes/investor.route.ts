// import {createInvestor} from '../controllers/investorController'
import { Router} from 'express';
import { companyAuth } from '../middleware/auth';
import { getInvestor } from '../controllers/company/companyQueryController';

const router = Router();

router.get("/get", companyAuth, getInvestor);

export default router;

