var UserModel = require('../models/UserModel');

var Stats = {

    getStats: function(req, res) {

        UserModel.count({}, function(err, count){
            if (err) res.send(err);
            res.json({numOfUsers: count});
        });

    }

};


module.exports = Stats;