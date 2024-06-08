const { header, body } = require("express-validator");

exports.signup = [
  body("email", "Please enter valid email id!").notEmpty().isEmail(),
  body(
    "password",
    "Please enter password & make sure it has length between 6 to 16 characters."
  )
    .trim()
    .notEmpty(),
];

exports.login = [
  body("email", "Please enter valid email id!").notEmpty().isEmail(),
  body("password", "Please enter valid password").trim().notEmpty(),
];
