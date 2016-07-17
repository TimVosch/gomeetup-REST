var mongoose = require('mongoose');

// Export the schema
module.exports = new mongoose.Schema({
  type: {type: String, required: true},
  name: {type: String, required: true},
  creator: {type: String, required: true},
});