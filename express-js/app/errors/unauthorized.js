const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-error');

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.FORBIDDEN;
  }
}
module.exports = Unauthorized;
