var mongoose = require('mongoose');

module.exports.name = 'revoked_jwt';
module.exports.collection = 'revoked_jwts';
module.exports.schema = new mongoose.Schema({
  jwt_uuid: { type: String, required: true, unique: true },
  reason: { type: String, required: false },
  expires_at: { type: Date, required: true, expires: 1 }
});

/**
 * The revoked_jwts collection revokes usage of specified JWT.
 * Therefore the JWT cannot be refreshed or used anywhere anymore,
 * the user will be greeted with a 403 FORBIDDEN
 * The JWT is specified by `jwt_uuid`.
 * The `expires_at` has to be set in order to remove redundant revokes.
 */