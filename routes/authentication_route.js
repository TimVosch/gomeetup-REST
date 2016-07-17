var express = require('express');
var router = express.Router();
var api = require('../api/api');

var user_authentication_model = require('../models/user_authentication_model');
var user_information_model = require('../models/user_information_model');

/**
 * POST Authenticate a user.
 * This provides a JWT token to use if authenticated correctly.
 */
router.post('/user', api.authentication.authenticate_user);

module.exports = router;