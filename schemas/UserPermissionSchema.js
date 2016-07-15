var mongoose = require('mongoose');

module.exports = mongoose.Schema({
  userId: {type: ObjectId, required: true},
  permissions: {type: Array, required: true},
});