var UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
var config = require('./../../config');
var https = require('https');
var waterfall = require('async/waterfall');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var _ = require('lodash');

var Users = {

    create: function (req, res) {

        var user = new UserModel({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        // Attempt to save the user
        user.save(function(err) {
          if (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: 'Failed to create user:'});
          }
          const token = jwt.sign(user, config.secret, {
            expiresIn: '7d'
          });
          res.json({ success: true, message: 'user created', token: token });
          //res.status(201).json({ success: true, message: 'user created' });
        });
    },

    login: function(req, res){


      //  login

      //  if req.headers[x-access-type] == 'local'
      //         proceed the normal procedures
      //   else
       //
      //       if req.headers[x-access-type] not in ['facebook', 'google', ....]
      //         render '403'
      //       end
       //
      //      check if the token is valid
      //      token will be generated from the client side (ionic)
      //       passport.authenticate('auth/' + req.headers[x-access-type], )
      //
      // UserModel.find(profile_id, function(err, user){
      //   if(err)
      //   var u = new UserModel()
      //   u.save
      //
      //   else {
      //     res.render({success: ' successs', token: token})
      //   }
      // })
      //       redirect ({success})
       //
      //   end
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
                //user.devices.push({ device_token: req.body.device_token, date: new Date()});
                //user.save();
                res.json({ success: true, token: token });
              } else {
                res.json({ success: false, message: 'Authentication failed. Passwords did not match.' });
              }
            });
          }
        });
    },

    forgetPassword: function(req, res, next) {
      waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          UserModel.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              return res.json({ success: false, message: 'No account with that email address exists.' });
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
              user: 'yummyt.test@gmail.com',
              pass: 'yummy_tt'
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'yummyt.test@gmail.com',
            subject: 'Loopin Account Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            console.log("email sent!!!");
            done(err, 'done');
          });
        }
      ], function(err) {
        if (err) return next(err);
        res.json({ success: true, message: 'Mail sent!' });
      });
    },

    validatePasswordResetToken :function(req, res) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/forgot');
        }
        res.render('reset', {
          user: req.user
        });
      });
    },

    resetPassword: function(req, res) {
      waterfall([
        function(done) {
          UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
              return res.json({ success: false, message: 'Password reset token is invalid or has expired.' });
              //return res.redirect('back');
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Failed to rset password:'});
              }
              console.log("password: " + user.password);
              console.log("username: " + user.username);
              res.json({ success: true, message: 'password reset!' });
              done(err, user);
            });
          });
        },
        function(user, done) {
          var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
              user: 'yummyt.test@gmail.com',
              pass: 'yummy_tt'
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'yummyt.test@gmail.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
              'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            //req.flash('success', 'Success! Your password has been changed.');
            done(err);
          });
        }
      ], function(err) {
        //res.redirect('/');
        //res.json({ success: true, message: 'Password reset!' });
        return err;
      });
    },
    //If token expires, how to delete device_id
    addNewDevice: function(req, res) {
        UserModel.findOne({
          username: req.body.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            res.status(401).json({ success: false, message: 'User not found.' });
          } else {
              user.devices.push({ device_token: req.body.device_token, date: new Date()});
              user.save();
              res.json({ success: true, message: 'Devide added!' });
          }
        });
    },

    logout: function(req, res) {
        UserModel.findOne({
          username: req.body.username
        }, function (err, user) {
          if (err) res.send(err);
          var index = _.findIndex(user.devices, function(o) { return o.device_token == req.body.device_token; });
          //console.log('index:' + index);
          if(index == -1){
            res.json({ success: true, message: 'Devide not found!' });
          }
          else
          {
            _.remove(user.devices, function(n) {
              return n == index;
            });
            user.save();
            res.json({ success: true, message: 'Devide removed!' });
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
    },

    updateOne: function (req, res) {
        UserModel.findById(req.params.user_id, function (err, item) {
            if (err) res.send(err);

            UserModel.schema.eachPath(function(path) {
                //console.log(path);
                if(req.body[path]) {item[path] = req.body[path];}
            });

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
