var Promise = require('bluebird');
/**
 * Distribution Service
 * 
 * This service contains helper methods to prepare distributions of assets to users
 */
var DistributionService = {};

/** 
 * Creates more of the restricted asset and distributes it to receivers
 * @param issuer    The wallet who currently holds the asset
 * @param receivers The Wallets to distribute the asset to
 * @param amount  Amount to distribute to each user
 */
DistributionService.createAndDistributeBonus = function(issuer, receivers, amount, callback) {

    DistributionService.createBonus(issuer, receivers, amount, function(err1, transactionId) {
        if (err1) callback(err1);
        else {
            DistributionService.distributeBonus(issuer, receiers, amount, function(err2) {
                if (err2) callback(err2);
                else callback();
            });
        }
    });
};

/** 
 * Creates more of the restricted asset to subsequently distribute 
 * @param issuer    The wallet who currently holds the asset
 * @param receivers The Wallets to distribute the asset to
 * @param amount  Amount to distribute to each user
 */
DistributionService.createBonus = function(issuer, receivers, amount, callback) {
    if (!issuer || !issuer.address || !receivers || !amount) {
        var error = 'A valid issuer, amount and receivers are required';
        sails.log.error(error);
        callback(error);
    } else {
        var totalAmount = amount * receivers.length;

        var b = Promise.promisifyAll(BlockchainService);
        b.createAssetAsync(
                issuer.address,
                'restricted',
                totalAmount
            )
            .then(function(transactionId) {
                sails.log.debug('More restricted assets have been created');
                sails.log.debug(transactionId);
            })
            .catch(function(error) {
                sails.log.error('Problem creating restricted assets');
                sails.log.error(error);
            });
    }
};

/**
 * Distributes a restricted asset amongst the provided users
 * @param issuer    The wallet who currently holds the asset
 * @param receivers The Wallets to distribute the asset to
 * @param amount  Amount to distribute to each user
 */
DistributionService.distributeBonus = function(issuer, receivers, amount, callback) {
    if (!issuer || !issuer.address || !receivers || !amount) {
        var error = 'A valid issuer, amount and receivers are required';
        sails.log.error(error);
        callback(error);
    } else {
        var b = Promise.promisifyAll(BlockchainService);

        async.each(receivers, function(receiver, cb) {
                b.sendAssetAsync(issuer.address, user.address, 'restricted', amount)
                    .then(function(transactionId) {
                        sails.log.debug('Distribution asset transfer created');
                        sails.log.debug(transactionId);
                        cb();
                    })
                    .catch(function(error) {
                        sails.log.error('Problem creating Distribution asset transfer');
                        sails.log.error(error);
                        cb(error);
                    });
            },
            function(error) {
                if (error) {
                    sails.log.error('Error completing restricted asset distribution');
                    sails.log.error(error);
                    callback(error);
                } else {
                    sails.log.debug('Distribution completed');
                    callback();
                }
            });
    }
};

module.exports = DistributionService;
