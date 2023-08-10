import express from 'express';
import { getAllTransactions, getUserDetails, getAllExpenses, getAllIncome} from "../controllers/transactions";
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/getAllTransactions', auth, getAllTransactions);
router.get('/getUserDetails', auth, getUserDetails);
router.get('/getAllExpenses', auth, getAllExpenses);
router.get('/getAllIncome', auth, getAllIncome)




export default router
