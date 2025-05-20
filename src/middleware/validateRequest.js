const { AppError } = require('./errorHandler');

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(400, error.details[0].message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateRequest; 
