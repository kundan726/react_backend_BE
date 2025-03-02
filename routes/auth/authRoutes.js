const express = require('express');
const router = express.Router();
const {signUpController} = require('../../controller/loginController/signUp.controller');
const {loginController} = require('../../controller/loginController/login.controller');
const { resetPasswordController } = require('../../controller/loginController/resetPassword.controller')
const { verifyOtpController, resendOtpController } = require('../../controller/loginController/otp.controller')
router.post('/signUp',signUpController);
router.post('/login',loginController);
router.post('/resetPassword', resetPasswordController);
router.post('/verifyOtp', verifyOtpController);
router.post('/resendOtp', resetPasswordController);


module.exports = router;