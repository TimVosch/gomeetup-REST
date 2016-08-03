var mongoose = require('mongoose');

module.exports.models = [
  'event_model',
  'revoked_jwt_model',
  'user_authentication_model',
  'user_information_model'
];

module.exports.load = () => {
  for (var key in module.exports.models) {
    var element = module.exports.models[key];
    var model = require('./' + element);
    mongoose.model(model.name, model.schema, model.collection);
  }
}