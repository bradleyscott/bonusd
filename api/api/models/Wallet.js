/**
 * Wallet.js
 *
 * @description :: A store of value associated with a user
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        user: {
            model: 'User',
            required: true
        },
        email: {
            type: 'email',
            unique: true
        },
        address: {
            type: 'string',
            required: true
        },
    }
};
