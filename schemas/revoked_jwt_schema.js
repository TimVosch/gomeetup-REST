var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  jwt_uuid: {type: String, required: true},
  expires_at: {type: Number, required: true}
});