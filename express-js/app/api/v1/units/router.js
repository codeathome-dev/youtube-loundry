const router = require('express').Router();
const { getAll, create, update, find, destroy } = require('./controller');
const {
  unitCreateAndUpdateValidation,
  unitFindValidation,
} = require('./validation');

const { authenticateUser } = require('../../../middlewares/auth');

router.use(authenticateUser);
router.get('/', getAll);
router.get('/:id', unitFindValidation, find);
router.post('/', unitCreateAndUpdateValidation, create);
router.put('/:id', unitFindValidation, unitCreateAndUpdateValidation, update);
router.delete('/:id', unitFindValidation, destroy);

module.exports = router;
