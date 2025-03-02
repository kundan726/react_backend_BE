const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/authRoutes');
const productRoutes = require('./product/productRoutes');

router.use('/auth',authRoutes);
router.use('/products',productRoutes);

module.exports = router;