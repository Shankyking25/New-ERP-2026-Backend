// import { body } from "express-validator";

// export const createDepartmentValidation = [

//   body("name")
//     .notEmpty()
//     .withMessage("Department name required"),

//   body("code")
//     .notEmpty()
//     .withMessage("Department code required"),

// ];

import { body } from "express-validator";

export const createDepartmentValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Department code is required"),

  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Invalid status"),
];