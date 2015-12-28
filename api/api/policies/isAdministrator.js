/**
 * isAdministrator
 *
 * Determines if the authenticated user is an Administrator and should be
 * allowed to perform restricted actions
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
module.exports = function(req, res, next) {
    if (!req.user && !req.user.id) {
        var message = 'Unable to identify User requesting authorization';
        sails.log.info(message);
        return res.forbidden(message);
    }
    if (req.user.id == 1) {
        sails.log.verbose('User is an Administrator');
        next();
    } else {
        var message = 'User is not authorized to perform this function';
        sails.log.info(message);
        return res.forbidden(message);
    }
};
