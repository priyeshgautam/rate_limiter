const Joi = require('joi');

const orderSchema = {
  create: Joi.object({
    items: Joi.array().items(
      Joi.object({
        productId: Joi.number().required(),
        quantity: Joi.number().required().min(1)
      })
    ).required().min(1),
    total: Joi.number().required().min(0)
  })
};

module.exports = orderSchema;
