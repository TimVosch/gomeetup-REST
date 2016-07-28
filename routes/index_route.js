var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var require_jwt = require('../middleware/jwt_verification');
// Routes
var authentication_route = require('./authentication_route');
var events_route = require('./events_route');
var permissions_route = require('./permissions_route');

// Load all other routers
router.use('/authentication', authentication_route);
router.use('/events', require_jwt, events_route);
router.use('/permissions', require_jwt, permissions_route);

module.exports = router;
