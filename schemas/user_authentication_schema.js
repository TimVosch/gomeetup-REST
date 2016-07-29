var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: {type: String, required: true, unique: true, match: /^[\w]{6,}$/},
  password: {type: String, required: true, match: /^.{6,}$/},
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user_information'}
});