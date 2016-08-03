var mongoose = require('mongoose');
var event_meta_model = mongoose.model('event_meta');
var error = require('debug')('gomeetup:internal_error');
var debug = require('debug')('gomeetup:events');

/**
 * GET gets nearby events
 * URL: /api/events/:lon/:lat/:distance?
 * JWT REQUIRED: yes
 * PERMISSIONS: 'events:nearby'
 * BODY: none
 */
module.exports.get_nearby_events = (req, res) => {
  var decimal_regex = /^\d+\.{0,1}\d*$/;
  var distance = 3000;
  if (req.params.distance && decimal_regex.test(req.params.distance)) {
    distance = parseInt(req.params.distance);
  }
  if (!decimal_regex.test(req.params.longitude) || !decimal_regex.test(req.params.latitude)) {
    return res.status(400).send({ message: 'Invalid longitude or latitude' });
  }

  event_meta_model.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [
            parseFloat(req.params.longitude),
            parseFloat(req.params.latitude)
          ]
        },
        $maxDistance: distance,
        $minDistance: 0
      }
    }
  })
  .then( events => {
    res.status(200).send({events});
  })
  .catch( e => {
    error(e);
    res.status(500).send({ error: e.message, error_type: e.name });
  });
};