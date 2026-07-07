import { body } from "express-validator";

export const attendanceValidator = [

  body("employee")
    .notEmpty()
    .withMessage("Employee is required"),

  body("date")
    .notEmpty()
    .withMessage("Date is required"),

  body("status")
    .notEmpty()
    .withMessage("Status is required"),

];