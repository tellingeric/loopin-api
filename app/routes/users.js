var UserModel = require('../models/UserModel');

var Users = {
    getAll: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) res.send(err);
            res.json(users);
        });

    },

    create: function (req, res) {
        var user = new UserModel();
        user.username = req.body.username;
        user.password = "111";
        user.email = "test@hotmail.com";

        user.save(function (err) {
            if (err) res.send(err);
            res.json({message: "user created"});
        });

    },

    remove: function (req, res) {
        UserModel.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) res.send(err);
            res.json({message: "user deleted"})
        });
    }

};

module.exports = Users;
