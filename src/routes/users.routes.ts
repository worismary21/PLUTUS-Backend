import {userSignup, userLogin, forgotPassword, createAdmin, verifyUser} from '../controllers/controller'

import { Router} from 'express';
import {db} from '../config/index'
import { auth } from '../middleware/auth';

const router = Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/adminSignup', createAdmin)
router.put('/forgot-password', forgotPassword)
router.put('/verify-user',auth, verifyUser)

export default router