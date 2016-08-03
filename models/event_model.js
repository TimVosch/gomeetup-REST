var mongoose = require('mongoose');

// Export the schema
module.exports.name = 'event_meta';
module.exports.collection = 'event_metas';
module.exports.schema = new mongoose.Schema({
  type: {type: String, enum: [ 'meetup', 'event' ], required: true},
  name: {type: String, required: true},
  creator: {type: String, required: true},
  location: {
    type: [Number],
    index: '2dsphere'
  }
});

/**
 * The events collection contains all existing events.
 * An event contains:
 *     - `type`
 *     - `name`
 *     - `creator`
 *     - `location`: 
 *        - `longitude`
 *        - `latitude`
 */