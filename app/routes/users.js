var UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
var config = require('./../../config');
var https = require('https');

var Users = {

    create: function (req, res) {

        console.log(req.body);
        if(!req.body.account_type && (!req.body.email || !req.body.password)){
          res.status(400).json({ success: false, message: 'Please enter email and password.' });
        }
        var user = new UserModel({
          username: req.body.username,
          email: req.body.email
        });
        if(!req.body.account_type){
            user.password = req.body.password
        } else {
            user.account_type = req.body.account_type;
        }
        if(req.body.type){
          user.type = req.body.type;
        }
        //user.sessions.deviceid = req.body.deviceid;
        //user.sessions.date = new Date();
        user.devices.push({ device_token: req.body.device_token, date: new Date()});

        // Attempt to save the user
        user.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: 'Failed to create user:'});
          }
          res.status(201).json({ success: true, message: 'user created' });
        });
    },

    login: function(req, res){
        UserModel.findOne({
          username: req.body.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
          } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
              if (isMatch && !err) {
                // Create token if the password matched and no error was thrown
                const token = jwt.sign(user, config.secret, {
                  expiresIn: '7d'
                });

                //add an entry in user sessions.
                user.devices.push({ device_token: req.body.device_token, date: new Date()});
                user.save();

                res.status(200).json({ success: true, token: token });

                //
                // res.format({
                //   json: function(){
                //     res.status(200).json({ success: true, token: token });
                //   },
                //
                //   html: function(){
                //     res.render('index.ejs');
                //   }
                //
                // })

              } else {
                res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
              }
            });
          }
        });
    },

    //If token expires, how to delete device_id
    addnewdevice: function(req, res) {
        UserModel.findOne({
          username: req.body.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            res.status(401).json({ success: false, message: 'User not found.' });
          } else {
              user.devices.push({ device_token: req.body.device_token, date: new Date()});
              user.save();
          }
        });
    },

    logout: function(req, res) {
        UserModel.find(function (err, users) {
            if (err) res.send(err);
            res.json(users);
        });
    },

    getUser: function(req, res) {
      res.send(req.decoded._doc);
    },

    getAll: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) res.send(err);
            res.json(users);
        });

    },

    remove: function (req, res) {
        UserModel.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) res.send(err);
            res.json({message: "user deleted"})
        });
    },

    updateOne: function (req, res) {
        UserModel.findById(req.params.user_id, function (err, item) {
            if (err) res.send(err);

            for (prop in req.body) {
                item[prop] = req.body[prop];
            }

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "user updated"});
            });

        });
    }

    /*
    ,pushNotify: function (req, res) {

        UserModel.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.status(401).json({ success: false, message: 'Username not found!' });
            } else {
                user.sessions.forEach(function(session){
                    var token = session.deviceid;
                    var postData =
                    {
                        "tokens": [token],
                        "profile": "loopin_dev",
                        "notification": {
                        "message": req.body.message || "Loopin demo push!"
                    }
                    };

                    var options = {
                        host: 'api.ionic.io',
                        path: '/push/notifications',
                        headers: {'Content-Type': 'application/json', 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3Y2VmZWQxOS00MGJhLTQ3ZmMtOGFjOS1mMTFhZGZhOGY5MWIifQ.VkfMQcKrhPoUcSSBWBwh4kbhfMufYeseNacMV4FGZv0'},
                        method: 'POST',
                        body: JSON.stringify(postData)

                    };

                    var callback = function(response) {
                        var str = '';
                        response.on('data', function (chunk) {
                            str += chunk;
                        });

                        response.on('end', function () {
                            console.log(str);
                        });
                    };

                    var req = https.request(options, callback);
                    req.end();
                });
            }
        });

        UserModel.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) res.send(err);
            res.json({message: "user deleted"})
        });
    }
     */
};

module.exports = Users;
