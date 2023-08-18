// import {createInvestor} from '../controllers/investorController'
import { Router } from "express";
import { auth, companyAuth } from "../middleware/auth";
import {
  getInvestment,
  getInvestor,
  //   getTotalInvestment,
} from "../controllers/investorController";

const router = Router();

router.get("/get", companyAuth, getInvestor);
router.get("/getinvestment/", auth, getInvestment);
// router.get("/gettotalinvestment", auth, getTotalInvestment);

// router.post('/register/:id', createInvestor);

export default router;
