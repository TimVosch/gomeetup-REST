var mongoose = require('mongoose');
var revoked_jwts_schema = require('../schemas/revoked_jwt_schema');

module.exports = mongoose.model('revoked_jwts', revoked_jwts_schema);

/**
 * The revoked_jwts collection revokes usage of specified JWT.
 * The JWT is specified by `jwt_uuid`.
 * The `expires_at` has to be set in order to remove redundant revokes.
 */