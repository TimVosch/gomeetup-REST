'use strict';

class ForbiddenRequestException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "Forbidden Request";
  }
}
module.exports = ForbiddenRequestException;