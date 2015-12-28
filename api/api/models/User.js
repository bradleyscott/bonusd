/**
 * User.js
 * @description :: Describes a user for authentication purposes
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = User = {

    /**
     * Creates a Wallet associated with this user
     * Also creates the blockchain wallet address for the Wallet
     */
    afterCreate: function(user, callback) {
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
    },
};
