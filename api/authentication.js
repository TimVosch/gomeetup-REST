/**
 * api.authentication 
 */

// Requirements
var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var user_information_model = mongoose.model('user_information');
var user_authentication_model = mongoose.model('user_authentication');
var revoked_jwt_model = mongoose.model('revoked_jwt');

module.exports = {};

/**
 * POST authenticates a user and creates a jwt with 100% permissions
 * URL: /api/authentication/user
 * JWT REQUIRED: no
 * PERMISSIONS: none
 * BODY: 
 * {
 *  username: string,
 *  password: string
 * }
 */
module.exports.authenticate_user = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ error: true, message: "User or password missing"});
    return;
  }
  user_authentication_model.findOne({ username: req.body.username }).then((user_auth) => {
    // Check if the user exists and password is correct (this if check is a bit double/redundant)
    if (!user_auth || req.body.password !== user_auth.password) {
      res.status(403).send({ error: true, message: "Username or password invalid" });
      return;
    }

    // Find the correct permissions for this user
    user_information_model.findOne({ _id: user_auth.user_id}).then((user_permissions) => {
      if(!user_permissions) {
        res.status(500).send({ error: true, message: "No user information associated with " + user_auth.user_id});
        return;
      }
      // Create JWT payload
      var payload = {
        uuid: uuid.v4(),
        user_id: user_auth.id,
        permissions: user_permissions.permissions
      };
      // Sign the token with the payload
      var token = jwt.sign(payload, req.app.get('JWTSecret'), {
        expiresIn: req.app.get('JWTExpiration')
      });
      res.send({token});
    })
  });
};

/**
 * POST revokes a jwt
 * URL: /api/authentication/jwt/revoke/:jwt_uuid
 * JWT REQUIRED: yes
 * PERMISSIONS: 'jwt:revoke'
 * BODY: 
 * {
 *  reason: string, optional
 * }
 */
module.exports.jwt_revoke = (req, res) => {
  var revoked_jwt = new revoked_jwt_model({
    jwt_uuid: req.params.jwt_uuid,
    reason: req.body.reason,
    expires_at: Date.now() + req.app.get('JWTExpiration') // HAS to be expired after this time
  });
  revoked_jwt.save().then(result => {
    res.sendStatus(200);
  }).catch(err => {
    res.status(400).send({ error: true, message: err });
  });
};