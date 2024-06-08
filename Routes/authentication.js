const express = require("express");
const router = express.Router();
const { authentication: authValidator } = require("../Middleware/Validators");
const Authentication = require("../Middleware/authentication").authentication;

//CONTROLLERS
const AuthController = new (require("../Controller/authentication"))();

//ROUTES
router
  .route("/signup")
  .post(authValidator.signup, Authentication, AuthController.signUp);

router
  .route("/login")
  .post(authValidator.login, Authentication, AuthController.logIn);

module.exports = router;
