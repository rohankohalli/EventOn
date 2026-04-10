import { body, param } from "express-validator";

export const createReservationValidator = [
    body("eventId").isInt({ min: 1 }).withMessage("Invalid eventId"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
]

export const cancelReservationValidator = [
    param("id").isInt({ min: 1 }).withMessage("Invalid reservation id"),
    body("cancelQuantity").optional().isInt({ min: 1 }).withMessage("cancelQuantity must be >= 1"),
]
