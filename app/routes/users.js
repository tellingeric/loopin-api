var UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
var config = require('./../../config');
var https = require('https');

var Users = {

    create: function (req, res) {

        console.log(req.body);
        var user = new UserModel();
        switch(req.body.account_type) {

            case "local":
                user.local.username = req.body.username;
                user.local.password = req.body.password;
                user.email = req.body.password;
                break;
            case "facebook":
                user.facebook.id = req.body.id;
                user.facebook.username = req.body.username;
                user.facebook.displayname = req.body.displayname;
                user.facebook.token = req.body.token;
                user.facebook.email = req.body.email;
                break;
            case "google":
                user.google.id = req.body.id;
                user.google.username = req.body.username;
                user.google.displayname = req.body.displayname;
                user.google.token = req.body.token;
                user.facebook.email = req.body.email;
                break;
            case "wechat":
                user.wechat.id = req.body.id;
                user.wechat.username = req.body.username;
                user.wechat.displayname = req.body.displayname;
                user.wechat.token = req.body.token;
                break;
        }
        user.devices.push({ device_token: req.body.device_token, date: new Date()});

        // Attempt to save the user
        user.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: 'Failed to create user:'});
          }
          res.status(201).json({ success: true, message: 'user created' });
        });
/*        
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
*/
    },
    
    login: function(req, res){

        if login_type == local
        else if thirdparty
            

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
                  expiresIn: '24h' // in seconds
                });

                res.status(200).json({ success: true, token: token });

              } else {
                res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
              }
            });
          }
        });
    },

    linkAccount: function(req, res){
        
    },

    unLinkAccount: function(req, res){
        
    },

    //If token expires, how to delete device_id
    addNewDevice: function(req, res) {
        UserModel.findOne({
          username: req.body.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            console.log("username" + req.body.username);
            res.status(401).json({ success: false, message: 'User not found.' });
          } else {
              user.devices.push({ device_token: req.body.device_token, date: new Date()});
              user.save();
              res.status(200).json({ success: true, message: 'token added' });
          }
        });
    },

    logout: function(req, res) {
        UserModel.findOne({
          username: req.body.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            res.status(401).json({ success: false, message: 'User not found.' });
          } else {
            var idx = user.devices.indexOf(req.body.device_token);
            if (idx !== -1) {
                // remove it from the array.
                user.devices.splice(idx, 1);
                // save the doc
                user.save(function(error) {
                    if (error) {
                        console.log(error);
                        res.send(null, 500);
                    } else {
                        // send the records
                        res.status(200).json({ success: true, message: 'token added' });
                    }
                });
                // stop here, otherwise 404
                //return;
            } else {
              res.status(401).json({ success: false, message: 'Failed to delete token.' });
            }

              //user.devices.pull({ device_token: req.body.device_token });
              //user.devices.push({ device_token: req.body.device_token, date: new Date()});
              //user.save();
              //res.status(200).json({ success: true, message: 'token deleted' });
          }
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
