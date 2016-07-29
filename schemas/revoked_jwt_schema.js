var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  jwt_uuid: { type: String, required: true, unique: true },
  reason: { type: String, required: false },
  expires_at: { type: Date, required: true, expires: 1 }
});