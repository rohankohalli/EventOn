import express from 'express'
import { createVenue, deleteVenue, getAllVenues, getMyVenues, getVenueById, getVenueEvents, updateVenue } from '../controllers/venueController.js';
import { authenticateToken, requireRole } from '../middleware/authentication.js';
import { createVenueValidation, venueIdParamValidator } from "../validation/venueValidation.js";
import { validate } from '../middleware/validator.js';

const router = express.Router();

router.post("/", authenticateToken, requireRole("Admin", "VenueOwner"), createVenueValidation, validate, createVenue)
router.get("/", getAllVenues)
router.get("/my", authenticateToken, requireRole("Admin", "VenueOwner"), getMyVenues)
router.put("/:id", authenticateToken, requireRole("Admin", "VenueOwner"), venueIdParamValidator, validate, updateVenue)
router.delete("/:id", authenticateToken, requireRole("Admin", "VenueOwner"), venueIdParamValidator, validate, deleteVenue)
router.get("/:id", venueIdParamValidator, validate ,getVenueById)
router.get("/:id/events", venueIdParamValidator, validate, getVenueEvents)

export default router
