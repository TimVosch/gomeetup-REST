var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Routes
var Authentication = require('./Auth');
var Events = require('./Events');
var Permissions = require('./Permissions');

// Load all other routers
router.use('/auth', Authentication);
router.use(require('../verification/JwtVerification')); // Everything after this requires authentication
router.use('/events', Events);
router.use('/permissions', Permissions);

module.exports = router;
