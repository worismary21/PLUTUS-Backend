import {userSignup, userLogin, forgotPassword, verifyChangePasswordEmail, verifyChangePasswordOTP, verifyChangePassword} from '../controllers/controller'

import { Router} from 'express';
import {db} from '../config/index'

const router = Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.put('/forgot-password', forgotPassword)
router.put('/change-password-email', verifyChangePasswordEmail)
router.put('/change-password-otp/:id', verifyChangePasswordOTP)
router.put('/change-password/:id', verifyChangePassword)

export default router