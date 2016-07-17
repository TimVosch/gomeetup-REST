var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Routes
var authentication_route = require('./authentication_route');
var events_route = require('./events_route');
var permissions_route = require('./permissions_route');

// Load all other routers
router.use('/authentication', authentication_route);
router.use(require('../middleware/jwt_verification')); // Everything after this requires authentication
router.use('/events', events_route);
router.use('/permissions', permissions_route);

module.exports = router;
