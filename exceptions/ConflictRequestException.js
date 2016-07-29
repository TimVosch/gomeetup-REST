'use strict';

class ConflictRequestException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "Conflicting Request";
  }
}
module.exports = ConflictRequestException;