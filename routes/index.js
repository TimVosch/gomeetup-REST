var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Routes
var Authentication = require('./Auth');
var Events = require('./Events');

// Load all other routers
router.use('/auth', Authentication);
router.use(require('../verification/JwtVerification'));
router.use('/events', Events);

module.exports = router;
