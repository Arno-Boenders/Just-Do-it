import { body } from "express-validator";

export default [
  body("firstname")
    .notEmpty()
    .withMessage("First name is required")
    .bail()
    .isLength({ max: 255 })
    .withMessage("First name can only have a maximum of 255 characters"),
  body("lastname")
    .notEmpty()
    .withMessage("Last name is required")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Last name can only have a maximum of 255 characters"),
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
  // .bail()
  // .isStrongPassword()
  // .withMessage("Wachtwoord moet minstens 8 tekens lang zijn en minstens 1 letter, 1 cijfer en 1 speciaal karakter bevatten"),
];
