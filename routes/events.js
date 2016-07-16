var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/**
 * Load mongoose event_model
 */
var event_model = require('../models/event_model.js');

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

/**
 * GET returns all active events
 */
router.get('/', (req, res) => {
  event_model.find().then(events => {
    res.send(events);
  });
});

/**
 * GET returns an event by ID
 */
router.get('/:id', (req, res) => {
  var id = verifyAndConvertId(req.params.id, res);
  if (!id) return;
  event_model.findById(id)
    .then(event => {
      res.send(event);
    })
    .catch(e => {
      res.sendStatus(500);
    });
});


/**
 * POST creates a new event
 */
router.post('/', (req, res) => {
  var event = new event_model(req.body);
  event.save()
    .then(newEvent => {
      res.send(newEvent);
    })
    .catch(e => {
      res.sendStatus(500);
    });
});


/**
 * DELETE removes an event by ID
 */
router.delete('/', (req, res) => {
  // Convert ID and remove the item
  var id = verifyAndConvertId(req.body.id, res);
  if (!id) return;
  event_model.findByIdAndRemove(id)
    .then(event => {
      // Check if an event was removed
      if (event)
        res.send(event);
      else
        res.status(400).send({ success: false, message: "No event found with provided id" })
    })
    .catch(e => {
      res.send(e);
    });
});

module.exports = router;