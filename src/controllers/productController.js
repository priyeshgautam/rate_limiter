const { AppError } = require('../middleware/errorHandler');

class ProductController {
  // Get all products
  async getAllProducts(req, res, next) {
    try {
      // In a real app, this would fetch from a database
      const products = [
        { id: 1, name: 'Product 1', price: 99.99 },
        { id: 2, name: 'Product 2', price: 149.99 }
      ];

      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      next(new AppError(500, 'Error fetching products'));
    }
  }

  // Create a product
  async createProduct(req, res, next) {
    try {
      const { name, price } = req.body;

      if (!name || !price) {
        throw new AppError(400, 'Name and price are required');
      }

      // In a real app, this would save to a database
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: { name, price }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController(); 
