import { body, param } from "express-validator";

export const createEventValidation = [
    body("title").notEmpty(),
    body("description").optional().isString(),
    body("startDate").isISO8601(),
    body("endDate").isISO8601(),
    body("startTime").matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("startTime must be HH:mm"),
    body("endTime").matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("endTime must be HH:mm"),
    body("capacity").isInt({min:1}).withMessage("Capacity must be more than 1")
]

export const eventIdParamValidator = [
    param("id").isInt({ min: 1 }).withMessage("Invalid event id"),
]
