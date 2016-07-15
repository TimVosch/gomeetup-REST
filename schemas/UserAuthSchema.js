var mongoose = require('mongoose');

var UserAuthSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});