const { body, validationResult } = require('express-validator');

module.exports = {
  signInValidation: [
    body('username').notEmpty().withMessage('Username must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 to 20 characters'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).send({ message: 'error', error: error.array() });
      }
      next();
    },
  ],
};
