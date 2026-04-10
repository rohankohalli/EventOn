import { body } from "express-validator";

export const registerValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("mobileNo").isMobilePhone("any"),
    body("dateOfBirth").isISO8601()
]

export const loginValidation = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty()
]
