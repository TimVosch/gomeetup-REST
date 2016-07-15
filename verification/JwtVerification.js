var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Find the JWT Token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, req.app.get('JWTSecret'), (err, decoded) => {
      if (err)
        res.status(403).send({success: false, message: "Failed to authenticate token"});
      else {
        req.jwt = {
          token,
          payload: decoded
        };
        next();
      }
    });
  } else {
    res.status(403).send({success: false, message: "No token provided"});
  }
};