var express = require('express');
var router = express.Router();
var api = require('../api/api');

/**
 * POST Authenticate a user.
 * This provides a JWT token to use if authenticated correctly.
 */
router.post('/user', api.authentication.authenticate_user);

module.exports = router;