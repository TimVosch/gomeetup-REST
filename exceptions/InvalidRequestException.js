'use strict';

class InvalidRequestException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "Invalid Request";
  }
}
module.exports = InvalidRequestException;