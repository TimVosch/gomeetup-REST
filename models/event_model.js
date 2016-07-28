var mongoose = require('mongoose');
var event_schema = require('../schemas/event_schema');

module.exports = () => {
  mongoose.model('event', event_schema);
};

/**
 * The events collection contains all existing events.
 * An event contains:
 *     - `latitude`
 *     - `longitude`
 *     - `type`
 *     - `name`
 * 
 * * Subject to change
 */