var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  user_id: {type: mongoose.Schema.Types.ObjectId, required: true}
});