import express from 'express';
import { adminLogin, allUsers, deleteUser, forgotPassword, loginUser, registerUser, resetPassword } from '../controllers/authController.js';

const router =express.Router();
router.post('/register',registerUser)
router.post('/login', loginUser);
router.post('/admin',adminLogin)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/all-partner',allUsers)
router.delete('/delete/:id', deleteUser);

export default router;