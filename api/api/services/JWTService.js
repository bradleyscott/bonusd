var jwt = require('jsonwebtoken');


module.exports = {
  /**
   * Create a token based on the passed user
   * @param user
   */
  createToken: function(user)
  {
    return jwt.sign({
        user: user.toJSON()
      },
      sails.config.jwt.secret,
      {
        algorithm: sails.config.jwt.algorithm,
        expiresIn: sails.config.jwt.expiresIn,
        issuer: sails.config.jwt.issuer,
        audience: sails.config.jwt.audience
      }
    );
  }, 

  /**
   * Validates a token and retrieves the payload of it
   * @param token
   * @param callback
   */
  verify: function(token, callback) {
    jwt.verify(
      token, // The token to be verified
      sails.config.jwt.secret, // Same token we used to sign
      {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      function(error, payload) {
        if(error) { 
          sails.log.warn(error);
          callback(error); 
        }
        else callback(null, payload);
      });
    },
};