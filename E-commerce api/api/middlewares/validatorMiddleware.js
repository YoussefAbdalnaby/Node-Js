const { validationResult } = require("express-validator");

validatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  next(); // Proceed to the next middleware or route handler
};

module.exports = validatorMiddleware;
