var mongoose = require('mongoose');
var revoked_jwts_schema = require('../schemas/revoked_jwt_schema');

module.exports = mongoose.model('revoked_jwts', revoked_jwts_schema);