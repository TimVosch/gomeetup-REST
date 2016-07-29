var express = require('express');
var router = express.Router();
var api = require('../api/api');
var check_permissions = require('../middleware/check_permissions')('jwt');

/**
 * This will revoke a jwt and put the JWT UUID in the revoked_jwts database
 */
router.delete('/:jwt_uuid', check_permissions('revoke'), api.authentication.jwt_revoke);

module.exports = router;