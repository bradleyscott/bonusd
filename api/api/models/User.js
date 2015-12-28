// api/models/User.js

var Promise = require('bluebird');
var _ = require('lodash');
var _super = require('sails-auth/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

    attributes: {
        isAdministrator: {
            type: 'boolean',
            required: true,
            defaultsTo: false
        },
    },

    /**
     * Creates a Wallet associated with this user
     * Also creates the blockchain wallet address for the Wallet
     * Grants Admin permissions if user is a configured admin
     */
    afterCreate: function(user, callback) {

        // Create Wallet
        sails.log.verbose('User created');
        sails.log.verbose(user);


        var b = Promise.promisifyAll(BlockchainService);
        b.createAddressAsync()
            .then(function(address) {
                sails.log.debug('New blockchain address created');
                sails.log.debug(address);

                return Wallet.create({
                    user: user.id,
                    email: user.email,
                    address: address
                });
            })
            .then(function(wallet) {
                sails.log.debug('New wallet created');
                sails.log.debug(wallet);

                // Set administrator flag
                var admins = sails.config.administrators || [];
                if (_(admins).includes(user.email)) { // If this user's email is in the Admins list
                    sails.log.debug('Users email is listed in the Administrators config');
                    return User.update({
                        id: user.id
                    }, {
                        isAdministrator: true
                    });

                } else callback();
            })
            .then(function(user) {
                sails.log.debug('isAdministrator set to true');
                callback();
            })
            .catch(function(error) {
                sails.log.error('Error occured whilst issuing new Wallet or setting isAdministrator flag');
                sails.log.error(error);
                callback(error);
            });
    },
});
