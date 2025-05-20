const Joi = require('joi');

const productSchema = {
  create: Joi.object({
    name: Joi.string().required().min(3),
    price: Joi.number().required().min(0)
  })
};

module.exports = productSchema;
