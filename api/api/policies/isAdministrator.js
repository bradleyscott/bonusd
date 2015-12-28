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
    } else {
        User.findOne({
                id: req.user.id
            })
            .then(function(user) {
                if (user.isAdministrator) {
                    sails.log.verbose('User is an Administrator');
                    next();
                } else {
                    var message = 'User is not authorized to perform this function';
                    sails.log.info(message);
                    return res.forbidden(message);
                }
            })
            .catch(function(error) {
                sails.log.error('Error occured trying to retrieve User to check authorization');
                sails.log.error(error);
                return res.forbidden(error);
            });
    }
};
