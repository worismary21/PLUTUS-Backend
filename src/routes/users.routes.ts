import {userSignup, userLogin, forgotPassword, resendOTP} from '../controllers/controller'

import { Router} from 'express';
import {db} from '../config/index'

const router = Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.put('/update', forgotPassword);
router.put('resendotp', resendOTP);
router.put('/forgot-password', forgotPassword)

export default router