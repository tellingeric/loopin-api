var UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

var Users = {

    create: function (req, res) {

        console.log(req.body);
        if(!req.body.email || !req.body.password) {
          res.status(400).json({ success: false, message: 'Please enter email and password.' });
        } else {
          var user = new UserModel({
            email: req.body.email,
            password: req.body.password
          });

          // Attempt to save the user
          user.save(function(err) {
            if (err) {
              console.log(err);
              return res.status(400).json({ success: false, message: 'Failed to create user.'});
            }
            res.status(201).json({ success: true, message: 'user created' });
          });
        }
    },

    auth: function(req, res){
        UserModel.findOne({
          email: req.body.email
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
                  expiresIn: 60*60*24 // in seconds
                });
                res.status(200).json({ success: true, token: 'JWT ' + token });
              } else {
                res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
              }
            });
          }
        });
    },

    logout: function (req, res) {
        req.logout();
        req.session.destroy();
        res.redirect('/');
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

};

module.exports = Users;
