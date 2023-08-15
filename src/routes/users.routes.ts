import {userSignup, loginUser, forgotPassword, createAdmin, verifyChangePasswordEmail, verifyChangePasswordOTP, verifyChangePassword, verifyUser, resendOTP} from '../controllers/controller'
import { Router} from 'express';
import {db} from '../config/index'
import { auth } from '../middleware/auth';
import { createCompany } from '../controllers/companyCntrl';
import { isAdmin } from '../controllers/utils/auth';

const router = Router();

router.post('/signup', userSignup);
router.put('/update',auth, forgotPassword);
router.put('/resendotp/:token',auth, resendOTP);
router.post('/login', loginUser);
router.post('/adminSignup', createAdmin)
router.put('/forgot-password', forgotPassword)
router.post('/company',isAdmin,auth, createCompany);
router.put('/verify-user',auth, verifyUser)
router.put('/change-password-email',auth, verifyChangePasswordEmail)
router.put('/change-password-otp/:id',auth, verifyChangePasswordOTP)
router.put('/change-password/:id',auth, verifyChangePassword)


export default router
