import express from 'express'
import { approveEvent, cancelEventApproval, createEvent, deleteEvent, getAllEvents, getEventById, getMyEvents, rejectEvent, 
    updateEvent } from '../controllers/eventController.js';
import { authenticateToken, requireRole } from '../middleware/authentication.js';
import { createEventValidation, eventIdParamValidator } from '../validation/eventValidation.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

router.get("/", getAllEvents)
router.post("/", authenticateToken, requireRole("Admin", "Organizer"), createEventValidation, validate, createEvent)
router.get("/my", authenticateToken, getMyEvents)
router.get('/:id', eventIdParamValidator, validate, getEventById)
router.put('/:id', authenticateToken, requireRole("Admin", "Organizer"), updateEvent)
router.delete('/:id', authenticateToken, requireRole("Admin", "Organizer"), deleteEvent)

router.put("/:id/approve", authenticateToken, requireRole("Admin"), approveEvent)
router.put("/:id/reject", authenticateToken, requireRole("Admin"), rejectEvent)
router.put("/:id/approval-cancel", authenticateToken, requireRole("Admin"), cancelEventApproval)

export default router
