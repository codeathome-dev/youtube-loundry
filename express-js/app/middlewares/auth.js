const { UnauthenticatedError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Authentication invalid');
    }

    const payload = isTokenValid(token);

    // Attach the user and his permissions to the req object
    req.user = {
      id: payload.user.id,
      role: payload.user.role,
      fullname: payload.user.fullname,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateUser };
