const express = require('express');
const productController = require('../controllers/productController');
const validateRequest = require('../middleware/validateRequest');
const productSchema = require('../schemas/productSchema');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.post('/',
  validateRequest(productSchema.create),
  productController.createProduct
);

module.exports = router;
