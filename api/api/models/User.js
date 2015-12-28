// api/models/User.js

var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

    /**
     * Creates a Wallet associated with this user
     * Also creates the blockchain wallet address for the Wallet
     * Grants Admin permissions if user is a configured admin
     */
    afterCreate: function(user, callback) {

        // Create Wallet
        sails.log.verbose('User created');
        sails.log.verbose(user);

        BlockchainService.createAddress(function(error, address) {
            if (error) {
                sails.log.error('Unable to create Wallet');
                callback(error);
            } else {
                sails.log.debug('New blockchain address created');
                sails.log.debug(address);

                Wallet.create({
                        user: user.id,
                        email: user.email,
                        address: address
                    })
                    .exec(function(err, wallet) {
                        if (err) {
                            sails.log.error('Error trying to create new Wallet');
                            sails.log.error(err);
                            callback(err);
                        } else {
                            sails.log.debug('New wallet created');
                            sails.log.debug(wallet);
                            callback(null, wallet);
                        }
                    });
            }
        });

        // Create Admin user if required
        var adminUsers = sails.config.permissions.adminEmails;
        if(_(adminUsers).includes(user.email)) {
            
        }
    },
});
