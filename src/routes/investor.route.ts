import {createInvestor} from '../controllers/investorController'
import { Router} from 'express';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register/:id', createInvestor);


export default router;

