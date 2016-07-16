var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Routes
var Authentication = require('./Authentication');
var Events = require('./Events');
var Permissions = require('./Permissions');

// Load all other routers
router.use('/authentication', Authentication);
router.use(require('../verification/JwtVerification')); // Everything after this requires authentication
router.use('/events', Events);
router.use('/permissions', Permissions);

module.exports = router;
