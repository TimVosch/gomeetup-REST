var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Routes
var authentication = require('./authentication');
var events = require('./events');
var permissions = require('./permissions');

// Load all other routers
router.use('/authentication', authentication);
router.use(require('../verification/jwt_verification')); // Everything after this requires authentication
router.use('/events', events);
router.use('/permissions', permissions);

module.exports = router;
