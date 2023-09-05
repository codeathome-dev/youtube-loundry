const { signIn } = require('./controller');
const { signInValidation } = require('./validation');

const router = require('express').Router();

router.post('/sign-in', signInValidation, signIn);

module.exports = router;
