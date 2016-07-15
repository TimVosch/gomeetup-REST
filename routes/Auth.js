var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var UserAuthModel = require('../models/UserAuthModel');

/**
 * POST Authenticate a user.
 * This provides a JWT token to use if authenticated correctly.
 */
router.post('/', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ success: false, message: "Username or password missing" });
    return;
  }
  UserAuthModel.findOne({ username: req.body.username }).then((userAuth) => {
    // Check if the user exists
    if (!userAuth || req.body.password !== req.body.password) {
      res.status(403).send({ success: false, message: "Username or password invalid" });
      return;
    }
    // Check if the password is correct
    var token = jwt.sign({ username: userAuth.username}, req.app.get('JWTSecret'), {
      expiresIn: 60*60*24 // expires in 1 day
    });

    res.send({ success: true, token});
  });
});

module.exports = router;