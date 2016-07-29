var express = require('express');
var router = express.Router();
var api = require('../api/api');

/**
 * This provides a JWT token to use if authenticated correctly.
 */
router.post('/user', api.authentication.authenticate_user);

/**
 * This will create a new user account
 */
router.put('/user', api.authentication.create_user);

/**
 * jwt subroute, required jwt_verification
 */
router.use('/jwt', require('../middleware/jwt_verification'), require('./authentication_jwt_route'));

module.exports = router;