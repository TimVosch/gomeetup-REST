var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Schemas
var EventModel = require('../models/EventModel.js');

// Verify parameters (should this be a new module?)
function verifyAndConvertId(id, res) {
  if (id === undefined || typeof id == typeof undefined)
    res.status(400).send({ success: false, message: "No `id` provided" });
  else {
    try {
      return mongoose.Types.ObjectId(id);
    } catch (e) {
      res.status(400).send({ success: false, message: "Provided `id` is invalid" });
      return false;
    }
  }
}

// GET users listing.
router.get('/events', (req, res) => {
  EventModel.find().then(events => {
    res.send(events);
  });
});

router.get('/events/:id', (req, res) => {
  var id = verifyAndConvertId(req.params.id, res);
  if (!id) return;
  EventModel.findById(id)
    .then(event => {
      res.send(event);
    })
    .catch(e => {
      res.sendStatus(500);
    });
});


// Add new event
router.post('/events', (req, res) => {
  var event = new EventModel(req.body);
  event.save()
    .then(newEvent => {
      res.send(newEvent);
    })
    .catch(e => {
      res.sendStatus(500);
    });
});


// Delete an event
router.delete('/events', (req, res) => {
  // Convert ID and remove the item
  var id = verifyAndConvertId(req.body.id, res);
  if (!id) return;
  EventModel.findByIdAndRemove(id)
    .then(event => {
      // Check if an event was removed
      if (event)
        res.send(event);
      else
        res.status(400).send({ success: false, message: "No event found with provided `id`" })
    })
    .catch(e => {
      res.send(e);
    });
});

module.exports = router;