// import {createInvestor} from '../controllers/investorController'
<<<<<<< HEAD
import { Router } from "express";
import { auth, companyAuth } from "../middleware/auth";
import {
  getInvestment,
  getInvestor,
  //   getTotalInvestment,
} from "../controllers/investorController";
=======
import { Router} from 'express';
import { companyAuth } from '../middleware/auth';
import { getInvestor } from '../controllers/company/companyQueryController';
>>>>>>> 2d9ba60c377e3e0f28291474957e2d1c96522863

const router = Router();

router.get("/get", companyAuth, getInvestor);
<<<<<<< HEAD
router.get("/getinvestment/", auth, getInvestment);
// router.get("/gettotalinvestment", auth, getTotalInvestment);

// router.post('/register/:id', createInvestor);
=======
>>>>>>> 2d9ba60c377e3e0f28291474957e2d1c96522863

export default router;
