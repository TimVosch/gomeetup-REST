var jwt = require('jsonwebtoken');
var revoked_jwt_model = require('../models/revoked_jwt_model');

module.exports = function (req, res, next) {
  // Find the JWT Token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, req.app.get('JWTSecret'), (err, decoded) => {
      if (err)
        res.status(403).send({ error: true, message: "Failed to authenticate token" });
      else {
        // Check blacklist
        revoked_jwt_model.findOne({ jwt_uuid: decoded.uuid }).then((revokedToken) => {
          // If the token is not empty then we're blacklisted
          if (!!revokedToken) {
            res.status(403).send({ error: true, message: "Token revoked", reason: revokedToken.reason });
            return;
          }
          req.token = decoded;
          next();
        });
      }
    });
  } else {
    res.status(403).send({ error: true, message: "No token provided" });
  }
};