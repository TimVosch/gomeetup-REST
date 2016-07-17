var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var api = require('../api/api');

var event_model = require('../models/event_model.js');

router.get('/', api.events.get_event);
router.get('/:id', api.events.get_event);
router.post('/', api.events.create_event);
router.delete('/:id', api.events.remove_event);

module.exports = router;