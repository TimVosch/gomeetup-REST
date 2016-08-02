'use strict';

class UnauthorizedRequestException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "Unauthorized Request";
  }
}
module.exports = UnauthorizedRequestException;