const express = require("express");
const router = express.Router();
const {
  signUpController,
} = require("../../controller/loginController/signUp.controller");
const {
  loginController,
} = require("../../controller/loginController/login.controller");
const {
  resetPasswordController,
} = require("../../controller/loginController/resetPassword.controller");
const {
  verifyOtpController,
} = require("../../controller/loginController/otp.controller");
const {
  authValidationFunction,
  signUpValidationSchema,
  loginSchema,
  resetPasswordSchema,
  otpSchema,
  forgotPasswordSchema
} = require("../../validation/authValidation");
const { forgotPasswordController } = require("../../controller/loginController/forgotPassword.controller")
router.post(
  "/signUp",
  authValidationFunction(signUpValidationSchema),
  signUpController
);
router.post("/login", authValidationFunction(loginSchema), loginController);
router.post(
  "/resetPassword",
  authValidationFunction(resetPasswordSchema),
  resetPasswordController
);
router.post(
    "/forgotPassword",
    authValidationFunction(forgotPasswordSchema),
    forgotPasswordController
  );
router.post(
  "/verifyOtp",
  authValidationFunction(otpSchema),
  verifyOtpController
);
router.post(
  "/resendOtp",
  authValidationFunction(resetPasswordSchema),
  resetPasswordController
);

module.exports = router;
