const { authSignIn } = require('../../../services/auth');
const { StatusCodes } = require('http-status-codes');

const signIn = async (req, res, next) => {
  try {
    const result = await authSignIn(req);

    res.status(StatusCodes.OK).json({
      data: { token: result.token, fullname: result.fullname },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signIn,
};
