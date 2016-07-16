var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var user_authentication_model = require('../models/user_authentication_model');
var user_permissions_model = require('../models/user_permissions_model');

/**
 * POST Authenticate a user.
 * This provides a JWT token to use if authenticated correctly.
 */
router.post('/user', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ success: false, message: "Username or password missing" });
    return;
  }
  user_authentication_model.findOne({ username: req.body.username }).then((userAuth) => {
    // Check if the user exists and password is correct (this if check is a bit double/redundant)
    if (!userAuth || req.body.password !== req.body.password) {
      res.status(403).send({ success: false, message: "Username or password invalid" });
      return;
    }

    // Find the correct permissions for this user
    user_permissions_model.findOne({ userId: userAuth.id}).then((userPermission) => {
      // Sign the token with the permissions embedded
      var token = jwt.sign({ username: userAuth.username, permissions: userPermission.permissions}, req.app.get('JWTSecret'), {
        expiresIn: req.app.get('JWTExpiration') 
      });
      res.send({ success: true, token});
    })
  });
});


module.exports = router;