var mongoose = require('mongoose');

module.exports = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});