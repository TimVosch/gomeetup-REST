/**
 * This is middleware that can be used in routes.
 * It checks if the user has the specified permissions,
 * otherwise it sends 403 FORBIDDEN
 * 
 * Permissions are given in sets for example:
 *  - We need to have permissions ('UPDATE') or ('CREATE' AND 'DELETE')
 * Ofcourse if the jwt can CREATE and DELETE we might as well give them access to a PUT request
 * 
 * The route would look like this:
 *  router.put('events/:id', check_permissions('update', ['create', 'delete']), update_logic...)
 * 
 * Argument #1 --> 'update'
 * Argument #2 --> ['create', 'delete']
 * 
 * we refer to these as sets. So we've set #1 and set #2.
 * One of the sets must be fully fulfilled to grant access.
 */

check_permission_set = (required, permitted) => {
  if (typeof required === typeof '') {
    required = [required];
  }
  for (var x = 0; x < required.length; x++) {
    var required_action = required[x];
    if (permitted.indexOf(required_action) == -1) {
      return false;
    }
  }
  return true;
};

module.exports = (sub_route) => {
  return function() {
    // retrieve arguments as array
    var arguments_required = [];
    for (var i = 0; i < arguments.length; i++) {
        arguments_required.push(arguments[i]);
    }
    return (req, res, next) => {
      if (!req.token) {
        // Apparently there was no JWT necessary for this route. (probably missing jwt_verification)
        res.status(500).send({ error: true, message: "The request ended in a fatal error" });
        return;
      }
      if (!req.token.permissions) {
        // Given JWT has no permissions...
        res.status(403).send({ error: true, message: "The token is unauthorized for this action"});
        return;
      }
      // Find the sub_route and check actions
      var jwt_permitted_actions = req.token.permissions[sub_route];
      if (!jwt_permitted_actions) {
        // Given JWT has no permissions for this subroute
        res.status(403).send({ error: true, message: "The token is unauthorized for this action"});
        return;
      }
      // Jwt permission list has asteriks, JWT has access to all actions here.
      if (jwt_permitted_actions.indexOf('*') != -1) {
        next();
        return;
      }
      // Check if a set is fulfilled then continue: next()
      for (var x = 0; x < arguments_required.length; x++) {
        var required_action_set = arguments_required[x];
        if (check_permission_set(required_action_set, jwt_permitted_actions)) {
          next();
          return;
        }
      }
      // If not one set is fulfilled then forbid access
      res.status(403).send({ error: true, message: "The token is unauthorized for this action"});
    }
  }
};