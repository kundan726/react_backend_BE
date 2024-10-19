const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/authRoutes');
const productRoutes = require('./product/productRoutes');
// const {signUpController} = require('../controller/loginController/signUp.controller');
// const {loginController} = require('../controller/loginController/login.controller');
// router.post('/signUp',signUpController);
// router.post('/login',loginController);

router.use('/auth',authRoutes);
router.use('/products',productRoutes)
module.exports = router;