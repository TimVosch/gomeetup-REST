var mongoose = require('mongoose');
var revoked_jwts_schema = require('../schemas/revoked_jwt_schema');

module.exports = () => {
  mongoose.model('revoked_jwt', revoked_jwts_schema);
};

/**
 * The revoked_jwts collection revokes usage of specified JWT.
 * Therefore the JWT cannot be refreshed or used anywhere anymore,
 * the user will be greeted with a 403 FORBIDDEN
 * The JWT is specified by `jwt_uuid`.
 * The `expires_at` has to be set in order to remove redundant revokes.
 */