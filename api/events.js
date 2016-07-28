/**
 * Events exist of a location, type etc. They can be created, retrieved, edited, joined, left etc
 */

var mongoose = require('mongoose');
var event_model = mongoose.model('event');


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
      res.status(400).send({ error: true, message: "Invalid event id" });
      return;
    }
    event_model.findOne({ _id: id }).then(event => {
      res.send(event);
      return;
    });
  } else {
    event_model.find().then(events => {
      res.send(events);
      return;
    });
  }
};

module.exports.create_event = (req, res) => {
  var new_event = new event_model(req.body);
  new_event.save()
    .then(event => {
      res.send(event);
    })
    .catch(e => {
      res.sendStatus(500);
    });
}

module.exports.remove_event = (req, res) => {
  // Convert ID and remove the item
  var id = verifyAndConvertId(req.params.id, res);
  if (!id) {
    res.status(400).send({ error: true, message: "Invalid event id" });
    return;
  }
  event_model.findByIdAndRemove(id)
    .then(event => {
      // Check if an event was removed
      if (event)
        res.send(event);
      else
        res.status(400).send({ error: true, message: "No event found with provided id" })
    })
    .catch(e => {
      res.status(500).send(e);
    });
}