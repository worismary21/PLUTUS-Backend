import {userSignup, userLogin, forgotPassword} from '../controllers/controller'

import { Router} from 'express';
import {database} from '../config/index'

const router = Router();

router.get('/signup', userSignup);
router.post('/login', userLogin);
router.put('/update', forgotPassword)

export default router