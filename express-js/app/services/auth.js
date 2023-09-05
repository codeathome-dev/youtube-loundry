const { User } = require('../db/models');
const { UnauthorizedError } = require('../errors');
const { createJWT, createTokenUser } = require('../utils');

const authSignIn = async (req) => {
  const { username, password } = req.body;
  const result = await User.findOne({ where: { username } });

  if (!result) {
    throw new UnauthorizedError('Email or Password is incorrect');
  }

  const isPasswordCorrect = await result.comparePassword(
    password,
    result.password
  );

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Email or Password is incorrect');
  }

  const token = createJWT({ user: createTokenUser(result) });

  return { token, fullname: result.fullname };
};

module.exports = { authSignIn };
