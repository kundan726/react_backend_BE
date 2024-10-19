const express = require('express');
const router = express.Router();
const {signUpController} = require('../../controller/loginController/signUp.controller');
const {loginController} = require('../../controller/loginController/login.controller')
// const {signUpController} = require('../controller/loginController/signUp.controller');
// const {loginController} = require('../controller/loginController/login.controller');
router.post('/signUp',signUpController);
router.post('/login',loginController);

module.exports = router;