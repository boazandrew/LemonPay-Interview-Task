const { body } = require("express-validator");

exports.registerValidation = [
  body("email").isEmail().withMessage("Invalid Email address"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be a 8 char long"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Invalid Email address"),
  body("password").notEmpty().withMessage("Password is required"),
];
