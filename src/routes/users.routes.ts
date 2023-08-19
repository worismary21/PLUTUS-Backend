import {userSignup, loginUser, createAdmin, verifyChangePasswordEmail, verifyChangePasswordOTP, verifyChangePassword, resendOTP, updateUserProfile, createUserImage} from '../controllers/client/clientMutationController'
import { Router} from 'express';
import {db} from '../config/index'
import { auth } from '../middleware/auth';
import { createCompany } from '../controllers/company/companyQueryController';
import { isAdmin } from '../utils/auth';
import { getUsersByAdmin } from "../controllers/admin/adminQueryController";
import { getAllUsersByAdmin } from '../controllers/admin/adminQueryController';
import { deleteUserByAdmin} from '../controllers/admin/adminQueryController';
import { getUsersBalance, getUsersInfo } from "../controllers/client/clientQueryController";
import { upload } from '../middleware/uploadImage';

const router = Router();

router.post('/signup', userSignup);
// router.put('/update', forgotPassword);
router.put('/resendotp/:token', resendOTP);
router.post('/login', loginUser);
router.post('/adminSignup', createAdmin)
// router.put('/forgot-password', forgotPassword)
// router.put('/verify-user',auth, verifyUser)
router.put('/change-password-email', verifyChangePasswordEmail)
router.put('/change-password-otp/:id', verifyChangePasswordOTP)
router.put('/change-password/:id', verifyChangePassword);
router.put('/updateaccount', updateUserProfile);
router.put('/profileimage', upload.single('image'), createUserImage)
router.post("/company", isAdmin, createCompany);
router.get("/get", getUsersByAdmin);
router.get("/getAllUsersByAdmin", isAdmin, getAllUsersByAdmin)
router.delete("/deleteUser/:id",isAdmin, deleteUserByAdmin)

router.get("/balance", auth, getUsersBalance);

router.get("/info", auth, getUsersInfo);

export default router;
