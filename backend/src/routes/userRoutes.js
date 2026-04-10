import express from 'express'
import { deleteUser, getAllUsers, getUserById, updatePreferences, updateUser } from '../controllers/userController.js'
import { authenticateToken, requireRole } from '../middleware/authentication.js';
import { updatePreferencesValidator, userIdParam } from '../validation/userValidation.js';
import { validate } from '../middleware/validator.js';

const router = express.Router()

router.get("/", authenticateToken, requireRole("Admin"), getAllUsers)
router.get("/:id", authenticateToken, requireRole("Admin"), userIdParam, validate, getUserById)
router.put("/:id", authenticateToken, userIdParam, updatePreferencesValidator, validate, updateUser)
router.delete("/:id", authenticateToken, requireRole("Admin"), userIdParam, validate, deleteUser)
router.patch("/preferences", authenticateToken, updatePreferencesValidator, validate, updatePreferences)

export default router