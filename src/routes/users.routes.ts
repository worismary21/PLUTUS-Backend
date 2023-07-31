import {userSignup, userLogin, forgotPassword, createAdmin} from '../controllers/controller'

import { Router} from 'express';
import {db} from '../config/index'

const router = Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/adminSignup', createAdmin)
router.put('/forgot-password', forgotPassword)

export default router