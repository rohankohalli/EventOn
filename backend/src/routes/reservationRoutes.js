import express from 'express'
import { authenticateToken, requireRole } from '../middleware/authentication.js';
import { cancelReservation, createReservation, deleteReservation, getAllReservations, getEventReservations, getMyReservations, getReservationById } from '../controllers/reservationController.js'

const router = express.Router();

router.post("/", authenticateToken, createReservation)
router.get("/all", authenticateToken, requireRole("Admin"), getAllReservations)
router.get("/my", authenticateToken, getMyReservations)
router.put("/:id/cancel", authenticateToken, cancelReservation)
router.get("/event/:eventId", authenticateToken, getEventReservations)
router.get("/:id", authenticateToken, getReservationById);
router.delete("/:id", authenticateToken, requireRole("Admin"), deleteReservation);

export default router
