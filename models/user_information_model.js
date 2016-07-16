var mongoose = require('mongoose');
var user_information_scheme = require('../schemas/user_information_scheme');

module.exports = mongoose.model('user_information', user_information_scheme);