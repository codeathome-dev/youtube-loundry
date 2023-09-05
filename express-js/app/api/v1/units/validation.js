const { body, param, validationResult } = require('express-validator');
const { Unit } = require('../../../db/models');

module.exports = {
  unitFindValidation: [
    param('id')
      .notEmpty()
      .withMessage('param id is required')
      .bail()
      .isNumeric()
      .withMessage('id must be an integer')
      .bail()
      .custom(async (value, { req }) => {
        const checking = await Unit.findOne({ where: { id: value } });
        if (checking === null) {
          return Promise.reject();
        }
      })
      .withMessage('param id not found'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).send({ message: 'error', error: error.array() });
      }
      next();
    },
  ],
  unitCreateAndUpdateValidation: [
    body('code').notEmpty().withMessage('Please enter your code'),
    body('name').notEmpty().withMessage('Please enter your address'),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).send({ message: 'error', error: error.array() });
      }
      next();
    },
  ],
};
