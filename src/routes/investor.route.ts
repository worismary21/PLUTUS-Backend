// import {createInvestor} from '../controllers/investorController'
import { Router} from 'express';
import { companyAuth } from '../middleware/auth';
import { getInvestor } from '../controllers/investorQueryController';

const router = Router();

router.get("/get", companyAuth, getInvestor);
// router.post('/register/:id', createInvestor);

export default router;

