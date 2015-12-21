
module.exports = function (req, res, next) {
  var token;

  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.unauthorized('Format is Authorization: Bearer [token]');
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.unauthorized('No Authorization header was found');
  }

  JWTService.verify(token, function (err, token) {
    if (err) return res.unauthorized('Invalid Token');
    if(!token.user.id) return res.unauthorized('User authentication failed');

    User.findOne({ id: token.user.id }).then(function(user){
      if(!user) return res.unauthorized('User authentication failed');
      req.user = user;
      next();
    });
  });
};