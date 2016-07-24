var UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
var config = require('./../../config');


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
              //console.log(err);
              return res.status(400).json({ success: false, message: 'Failed to create user.'});
            }
            res.status(201).json({ success: true, message: 'user created' });
          });
        }
    },

    login: function(req, res){
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

    auth: function(req, res, next) {

      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token']; // decode token
      if (token) {
        
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) { 
          if (err) {
              return res.status(403).send({ 
                    success: false,
                    message: 'Failed to authenticate token.'
                  });
          } else {
            
            // if everything is good, save to request for use in other routes 
            req.decoded = decoded;
            //res.status(200).json({ 
            //        success: true,
            //        message: 'Token authenticated successfully!'
            //      });
            next();
          }
        });
      } else {
        
        // if there is no token
        // return an HTTP response of 403 (access forbidden) and an error message 
        return res.status(403).send({
          success: false,
          message: 'No token provided.'
        });
      }
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
