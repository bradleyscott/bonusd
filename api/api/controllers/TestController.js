var rpc = require('json-rpc2');

module.exports = {
    hi: function(req, res) {
        return res.send("Hi there!");
    },
    bye: function(req, res) {
        return res.redirect("http://www.sayonara.com");
    },
    getInfo: function(req, res) {

        BlockchainService.getInfo(function(err, result) {
            if (err) return res.serverError(err);
            else return res.ok(result);
        });
    },
    getAddresses: function(req, res) {

        BlockchainService.getAddresses(function(err, result) {
            if (err) return res.serverError(err);
            else return res.ok(result);
        });
    },
    test: function(req, res) {

        BlockchainService.createAsset('19pc2a1EyEUs5ittQdiRLA4qTCE88TuKepskYA', 'test', 1000, function(err, result) {
            if (err) return res.serverError(err);
            else return res.ok(result);
        });
    },
};
