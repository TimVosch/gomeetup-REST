var mongoose = require('mongoose');

/**
 * This document contains the permissions for a certain user.
 * The user is identified by his/her ObjectId.
 * The permissions is built as follow:
{
  "events": ["read", "create", "update"],
  "tokens": ["create"]
}
 */
module.exports = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true, match: /^([\w\.-]+(?=@))\@([\w\.-]+(?=\.))\.(\w+)$/},
  permissions: {type: Object, required: true},
});