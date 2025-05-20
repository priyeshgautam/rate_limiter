const express = require('express');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

const router = express.Router();

// Mount routes
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
