const {
  AppError
} = require('../middleware/errorHandler');

class OrderController {
  // Get all orders
  async getAllOrders(req, res, next) {
    try {
      // In a real app, this would fetch from a database
      const orders = [{
          id: 1,
          status: 'pending',
          total: 299.97
        },
        {
          id: 2,
          status: 'completed',
          total: 149.99
        }
      ];

      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      next(new AppError(500, 'Error fetching orders'));
    }
  }

  // Create an order
  async createOrder(req, res, next) {
    try {
      const {
        items,
        total
      } = req.body;

      if (!items || !total) {
        throw new AppError(400, 'Items and total are required');
      }

      // In a real app, this would save to a database
      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          items,
          total
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
