var rpc = require('json-rpc2');

/**
 * Blockchain Service
 * 
 * This service calls the Multi-chain JSON RPC API to perform functions
 * against the blockchain. 
 */
var client = rpc.Client.$create(
    sails.config.multichain.port,
    sails.config.multichain.host,
    sails.config.multichain.username,
    sails.config.multichain.password
);

module.exports = {

    /**
     * Retrieves info about the blockchain that is accessible via API. 
     * This is useful to check connectivity and service availability
     */
    getInfo: function(callback) {
        client.call('getinfo', [], function(err, result) {
            if (err) {
                sails.log.error(err);
                callback(err);
            } else callback(null, result);
        });
    },

    /**
     * Retrieves all addresses associated with this BLockchain node
     */
    getAddresses: function(callback) {
        client.call('getaddresses', [], function(err, result) {
            if (err) {
                sails.log.warn(err);
                callback(err);
            } else callback(null, result);
        });
    },

    /**
     * Get the asset balances associated with a wallet
     * @param wallet
     */
    getBalances: function(wallet, callback) {
        if (!wallet) {
            var error = 'A valid wallet address is required';
            sails.log.error(error);
            callback(error);
        }

        client.call('getaddressbalances', [], function(err, result) {
            if (err) {
                sails.log.error(err);
                callback(err);
            } else callback(null, result);
        });
    },

    /**
     * Creates an asset in a provided quantity, issued from a provided wallet
     * @param wallet    The wallet to issue the asset to
     * @param name      Name of the asset to issue
     * @param quantity  The number of units of the asset to create
     */
    createAsset: function(wallet, name, quantity, callback) {
        if (!wallet || !name || !quantity) {
            var error = 'A valid wallet address, asset name and quantity is required';
            sails.log.error(error);
            callback(error);
            return;
        }

        client.call('issue', [wallet, name, quantity], function(err, result) {
            if (err) {
                sails.log.error(err);
                callback(err);
            } else callback(null, result);
        });
    },

    /**
     * Creates a new address associated with this node of the blockchain
     */
    createAddress: function(callback) {
        client.call('getnewaddress', [], function(err, result) {
            if (err) {
                sails.log.warn(err);
                callback(err);
            } else callback(null, result);
        });
    },

    /**
     * Send asset from one address to another
     * @param from      The address who is sending 
     * @param to        The address receiving the asset
     * @param asset     The asset to send
     * @param quantity  The units to send
     */
    sendAsset: function(from, to, asset, quantity, callback) {
        if (!from || !to || !asset || !quantity) {
            var error = 'A valid from address, to address, asset name and quantity is required';
            sails.log.error(error);
            callback(error);
        } else {
            client.call('sendassetfrom', [from, to, asset, quantity], function(err, result) {
                if (err) {
                    sails.log.warn(err);
                    callback(err);
                } else callback(null, result);
            });
        }
    },
};
