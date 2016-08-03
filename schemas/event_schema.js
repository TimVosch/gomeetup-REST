var mongoose = require('mongoose');

// Export the schema
module.exports.name = 'event';
module.exports.collection = 'events';
module.exports.schema = new mongoose.Schema({
  type: {type: String, required: true},
  name: {type: String, required: true},
  creator: {type: String, required: true},
});

/**
 * The events collection contains all existing events.
 * An event contains:
 *     - `latitude`
 *     - `longitude`
 *     - `type`
 *     - `name`
 *     - `creator`
 * 
 * * Subject to change
 */