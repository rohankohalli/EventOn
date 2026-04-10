import express from 'express'
import { confirmPasswordReset, login, logout, refreshAccessToken, register, requestPasswordReset, user } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authentication.js';
import { loginValidation, registerValidation } from '../validation/authValidation.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

router.post('/register', registerValidation, validate, register)
router.post('/login', loginValidation, validate, login)
router.post('/logout', authenticateToken, logout)
router.post('/refresh', refreshAccessToken)
router.get('/me', authenticateToken, user)
router.post("/pass-reset-req", requestPasswordReset)
router.post("/pass-reset", confirmPasswordReset)

export default router
