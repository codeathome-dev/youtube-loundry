const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-error');

class NotFound extends CustomAPIError {
  constructor(message) {
    super(message);

    this.status = StatusCodes.NOT_FOUND;
  }
}
module.exports = NotFound;
