import express from "express"
import { authenticateToken } from "../middleware/authentication.js"
import getHomeStats from "../controllers/homeStatsController.js"

const router = express.Router()

router.get('/stats', authenticateToken, getHomeStats)

export default router
