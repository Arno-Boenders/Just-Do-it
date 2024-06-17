import { body } from "express-validator";

export default [
  body("email")
    .notEmpty()
    .withMessage("E-mail is required")
    .bail()
    .isLength({ max: 255 })
    .withMessage("E-mail can only have a maximum of 255 characters")
    .bail()
    .isEmail()
    .withMessage("E-mail is not valid"),
  body("password").notEmpty().withMessage("Password is required"),
];
