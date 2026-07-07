import { body } from "express-validator";

export const employeeValidator = [

body("employeeId")
.notEmpty(),

body("name")
.isLength({ min: 3 }),

body("email")
.isEmail(),

body("mobile")
.matches(/^[6-9]\d{9}$/),

//body("department").notEmpty(),
body("department").isMongoId(),

body("designation")
.notEmpty(),

body("salary")
.isNumeric(),

];