var mongoose = require('mongoose');
var EventSchema = require('../schemas/EventSchema');

module.exports = mongoose.model('event', EventSchema);