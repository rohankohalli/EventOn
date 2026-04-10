import { body, param } from "express-validator";

export const createVenueValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("location").notEmpty("Location is required"),
    body("capacity").isInt({min:1}).withMessage("Capacity must be atleast 1"),
    body("pricePerHour").isFloat({ min: 0 }).withMessage("pricePerHour must be >= 0")
]

export const venueIdParamValidator = [
    param("id").isInt({ min: 1 }).withMessage("Invalid venue id")
]
