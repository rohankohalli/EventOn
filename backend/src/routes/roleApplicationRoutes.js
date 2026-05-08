import express from "express";
import { authenticateToken, requireRole } from "../middleware/authentication.js";
import {
    applyForRole,
    getAllApplications,
    getMyApplication,
    approveApplication,
    rejectApplication
} from "../controllers/roleApplicationController.js";

const router = express.Router();

router.post("/", authenticateToken, applyForRole);
router.get("/me", authenticateToken, getMyApplication);
router.get("/", authenticateToken, requireRole("Admin"), getAllApplications);
router.put("/:id/approve", authenticateToken, requireRole("Admin"), approveApplication);
router.put("/:id/reject", authenticateToken, requireRole("Admin"), rejectApplication);

export default router;
