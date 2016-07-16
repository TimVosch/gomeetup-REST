var mongoose = require('mongoose');
var event_schema = require('../schemas/event_schema');

module.exports = mongoose.model('event', event_schema);