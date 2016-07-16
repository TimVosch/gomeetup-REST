var mongoose = require('mongoose');

/**
 * This document contains the permissions for a certain user.
 * The user is identified by his/her ObjectId.
 * The permissions is an array of strings
 */
module.exports = mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
  permissions: {type: [String], required: true},
});