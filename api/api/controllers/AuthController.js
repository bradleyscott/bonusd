// api/controllers/AuthController.js

var _ = require('lodash');
var _super = require('sails-auth/api/controllers/AuthController');

_.merge(exports, _super);
_.merge(exports, {

    /**
     * Create a third-party authentication endpoint
     *
     * @param {Object} req
     * @param {Object} res
     */
    provider: function(req, res) {
        passport.endpoint(req, res);
    },

    /**
     * Create a authentication callback endpoint
     *
     * This endpoint handles everything related to creating and verifying Pass-
     * ports and users, both locally and from third-aprty providers.
     *
     * Passport exposes a login() function on req (also aliased as logIn()) that
     * can be used to establish a login session. When the login operation
     * completes, user will be assigned to req.user.
     *
     * For more information on logging in users in Passport.js, check out:
     * http://passportjs.org/guide/login/
     *
     * @param {Object} req
     * @param {Object} res
     */
    callback: function(req, res) {

        passport.callback(req, res, function callback(error, user) {
            req.login(user, function callback(error) {
                if (error) {
                    sails.log.error('User authentication failed');
                    sails.log.error(error);

                    res.unauthorized(error);
                } else {
                    var token = JWTService.createToken(user);
                    var response = {
                        user: user,
                        access_token: token,
                    };

                    res.json(response);
                }
            });
        });
    },

    /**
     * Disconnect a passport from a user
     *
     * @param {Object} req
     * @param {Object} res
     */
    disconnect: function(req, res) {
        passport.disconnect(req, res);
    }
});
