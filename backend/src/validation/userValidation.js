import { body, param } from "express-validator";

export const updateUserValidator = [
    body("email").optional().isEmail(),
    body("role").optional().isIn(["Admin", "User", "Organizer", "VenueOwner"])
]

export const updatePreferencesValidator = [
    body("theme").optional().isString(),
    body("sidebarPinned").optional().isBoolean(),
]

export const userIdParam = [
    param("id").isInt()
]