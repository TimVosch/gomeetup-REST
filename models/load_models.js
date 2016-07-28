module.exports.models = [
  "event_model",
  "revoked_jwt_model",
  "user_authentication_model",
  "user_information_model"
];

module.exports.load = () => {
  for (var key in module.exports.models) {
    if (module.exports.models.hasOwnProperty(key)) {
      var element = module.exports.models[key];
      require('./' + element)(); // Load the model file
    }
  }
};