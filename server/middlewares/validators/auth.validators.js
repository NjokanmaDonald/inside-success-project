const { body } = require("express-validator");

const validateRegistrationData = [
  body("firstName")
    .isLength({ min: 1 })
    .withMessage("First name field cannot be empty"),
  body("lastName")
    .isLength({ min: 1 })
    .withMessage("Last name field cannot be empty"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password cannot be less than 6 characters"),
];

const validateLoginData = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at leat 6 characters"),
];

module.exports = { validateRegistrationData, validateLoginData };
