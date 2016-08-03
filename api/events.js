/**
 * Events exist of a location, type etc. They can be created, retrieved, edited, joined, left etc
 */

var mongoose = require('mongoose');
var event_model = mongoose.model('event');
var error = require('debug')('gomeetup:internal_error');
// Exceptions
var InvalidRequestException = require('../exceptions/InvalidRequestException');

/**
 * Verify an id as ObjectId for MongoDB
 * If possible convert it.
 */
function verifyAndConvertId(id, res) {
  if (id === undefined || typeof id == typeof undefined)
    res.status(400).send({ success: false, message: "No id provided" });
  else {
    try {
      return mongoose.Types.ObjectId(id);
    } catch (e) {
      res.status(400).send({ success: false, message: "Provided id is invalid" });
      return false;
    }
  }
}

module.exports = {};

module.exports.get_event = (req, res) => {
  // Respond with specific event if id is specified --> e.g. /events/09a8afee792bc9de091
  if (!!req.params.id) {
    var id = verifyAndConvertId(req.params.id);
    if (!id) {
      res.status(400).send({ error: 'Invalid event id' });
      return;
    }
    event_model.findOne({ _id: id }).then(event => {
      res.send(event);
    }).catch(e => {
      error(e);
      res.status(500).send({ error: e.message, error_type: e.name });
    });
  } else {
    event_model.find().then(events => {
      res.send(events);
    }).catch(e => {
      error(e);
      res.status(500).send({ error: e.message, error_type: e.name });
    });;
  }
};

module.exports.create_event = (req, res) => {
  var new_event = new event_model(req.body);
  new_event.save()
    .then(event => {
      res.send(event);
    }).catch(e => {
      error(e);
      res.status(500).send({ error: e.message, error_type: e.name });
    });
}

module.exports.remove_event = (req, res) => {
  // Convert ID and remove the item
  var id = verifyAndConvertId(req.params.id, res);
  if (!id) {
    res.status(400).send({ error: 'Invalid event id' });
    return;
  }
  event_model.findByIdAndRemove(id).then(event => {
      // Check if an event was removed
      if (!event) {
        throw new InvalidRequestException('No event found with provided id');
      }
      res.send(event);
    }).catch(InvalidRequestException, e => {
      res.status(400).send({ error: e.message });
    }).catch(e => {
      error(e);
      res.status(500).send({ error: e.message, error_type: e.name });
    });
}